# ITM LAB - Онлайн-хакатон

Веб-приложение для проведения онлайн-хакатонов с интерактивным терминалом и современным интерфейсом.

## Структура проекта

```
itmlab/
├── index.html              # Главная страница приложения
├── styles.css              # Основные стили
├── script.js               # Основной JavaScript файл
├── itmlab.code-workspace   # Конфигурация VS Code
├── assets/                 # Ресурсы проекта
│   ├── icons/             # Иконки и SVG файлы
│   │   ├── chevron.svg
│   │   ├── threads.svg
│   │   └── light-theme.css
│   ├── img/               # Изображения
│   │   ├── gerb.png
│   │   ├── iteachme.png
│   │   ├── threads.png
│   │   └── tiktok.png
│   ├── social/            # Социальные сети
│   │   ├── facebook.svg
│   │   ├── instagram.svg
│   │   └── telegram.svg
│   └── pdf/               # PDF документы
├── scripts/               # JavaScript модули
│   ├── modal-flow.js      # Логика модальных окон
│   ├── splash-typing.js   # Анимация печати на сплеше
│   ├── terminal-controls.js # Управление терминалом
│   ├── terminal-typing.js # Анимация печати в терминале
│   ├── terminal.js        # Основная логика терминала
│   └── test-button.js     # Тестовые функции
├── styles/                # Дополнительные стили
│   └── terminal-styles.css # Стили для терминала
└── .vscode/               # Настройки VS Code
```

## Основные файлы

- **index.html** - Главная страница с полным интерфейсом приложения
- **styles.css** - Основные стили (74KB, 3402 строки)
- **script.js** - Основная логика приложения (88KB, 2241 строка)
- **styles/terminal-styles.css** - Специальные стили для терминала

## JavaScript модули

- **modal-flow.js** - Управление модальными окнами
- **splash-typing.js** - Анимация печати на стартовом экране
- **terminal-controls.js** - Управление терминалом
- **terminal-typing.js** - Анимация печати в терминале
- **terminal.js** - Основная логика терминала
- **test-button.js** - Тестовые функции и кнопки

## Запуск

Откройте `index.html` в браузере для запуска приложения.

## Технологии

- HTML5
- CSS3 (с анимациями и градиентами)
- Vanilla JavaScript (ES6+)
- SVG иконки
- Современный адаптивный дизайн 