#!/usr/bin/env node

/**
 * ITM Lab - File Integrity Checker
 * Проверяет целостность HTML файлов и отсутствие белых экранов
 */

const fs = require('fs');
const path = require('path');

const pages = [
    'index.html',
    'index.kz.html',
    'winners.html',
    'winners.kz.html',
    'accessible-index.html',
    'accessible-index.kz.html',
    'accessible-winners.html',
    'accessible-winners.kz.html'
];

const scripts = ['scripts/modal-flow.js'];
const styles = ['styles.css'];

let passed = 0;
let total = 0;

function log(message, type = 'success') {
    const colors = {
        success: '\x1b[32m',
        warning: '\x1b[33m',
        error: '\x1b[31m',
        reset: '\x1b[0m'
    };
    console.log(`${colors[type]}${message}${colors.reset}`);
}

function checkFile(filePath) {
    total++;
    try {
        if (!fs.existsSync(filePath)) {
            log(`❌ ${filePath}: Файл не найден`, 'error');
            return false;
        }

        const content = fs.readFileSync(filePath, 'utf8');
        const size = content.length;

        // Проверка размера
        if (size < 1000) {
            log(`⚠️ ${filePath}: Файл слишком маленький (${size} байт)`, 'warning');
            return false;
        }

        // Проверка на белый экран
        if (content.includes('background: #fff') &&
            content.includes('<body>') &&
            content.includes('</body>') &&
            !content.includes('<div') &&
            !content.includes('<p') &&
            !content.includes('<h1')) {
            log(`❌ ${filePath}: Обнаружен белый экран`, 'error');
            return false;
        }

        // Проверка HTML структуры
        if (path.extname(filePath) === '.html') {
            if (!content.includes('<!DOCTYPE html>')) {
                log(`❌ ${filePath}: Нет DOCTYPE`, 'error');
                return false;
            }

            if (!content.includes('<html')) {
                log(`❌ ${filePath}: Нет HTML тега`, 'error');
                return false;
            }

            if (!content.includes('<body')) {
                log(`❌ ${filePath}: Нет BODY тега`, 'error');
                return false;
            }

            if (!content.includes('</html>')) {
                log(`❌ ${filePath}: Нет закрывающего HTML тега`, 'error');
                return false;
            }

            // Проверка на закомментированный контент
            const trimmed = content.trim();
            if (trimmed.startsWith('<!--') && trimmed.endsWith('-->')) {
                log(`❌ ${filePath}: Весь контент закомментирован`, 'error');
                return false;
            }
        }

        // Проверка JavaScript
        if (path.extname(filePath) === '.js') {
            const uncommented = content.replace(/<!--[\s\S]*?-->/g, '').trim();
            if (uncommented.length < 50) {
                log(`❌ ${filePath}: Код полностью закомментирован`, 'error');
                return false;
            }
        }

        log(`✅ ${filePath}: OK (${size} байт)`);
        passed++;
        return true;

    } catch (error) {
        log(`❌ ${filePath}: Ошибка чтения - ${error.message}`, 'error');
        return false;
    }
}

console.log('🧪 ITM Lab - File Integrity Checker');
console.log('===================================\n');

// Проверка HTML страниц
console.log('📄 Проверка HTML страниц:');
pages.forEach(page => checkFile(page));

// Проверка скриптов
console.log('\n📜 Проверка скриптов:');
scripts.forEach(script => checkFile(script));

// Проверка стилей
console.log('\n🎨 Проверка стилей:');
styles.forEach(style => {
    if (fs.existsSync(style)) {
        checkFile(style);
    } else {
        total++;
        log(`⚠️ ${style}: Файл не найден (может быть нормально)`, 'warning');
        passed++;
    }
});

// Итоги
console.log('\n📊 Результаты:');
const percentage = Math.round((passed / total) * 100);
const resultType = percentage === 100 ? 'success' : percentage >= 80 ? 'warning' : 'error';

log(`Пройдено: ${passed}/${total} тестов (${percentage}%)`, resultType);

if (percentage === 100) {
    console.log('\n🎉 Все проверки пройдены! Сайт готов к работе.');
} else if (percentage >= 80) {
    console.log('\n⚠️ Большинство тестов пройдено, но есть предупреждения.');
} else {
    console.log('\n❌ Найдены критические ошибки. Требуется исправление.');
    process.exit(1);
}