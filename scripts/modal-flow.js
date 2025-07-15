// Модальное окно для отображения контента

// Получаем существующее модальное окно
let modalOverlay = document.getElementById('modalOverlay');
let modalContent = modalOverlay ? modalOverlay.querySelector('.modal-content') : null;

console.log('Модальное окно найдено:', !!modalOverlay);
console.log('Контент модального окна найден:', !!modalContent);

if (!modalOverlay || !modalContent) {
  console.error('Модальное окно не найдено в HTML!');
} else {
  // Добавляем стили к существующему модальному окну
  modalOverlay.style.display = 'none';
  modalOverlay.style.position = 'fixed';
  modalOverlay.style.top = '0';
  modalOverlay.style.left = '0';
  modalOverlay.style.width = '100%';
  modalOverlay.style.height = '100%';
  modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
  modalOverlay.style.justifyContent = 'center';
  modalOverlay.style.alignItems = 'center';
  modalOverlay.style.zIndex = '9999';
  
  // Добавляем стили к контенту
  modalContent.style.background = '#fff';
  modalContent.style.padding = '30px';
  modalContent.style.borderRadius = '16px';
  modalContent.style.maxWidth = '800px';
  modalContent.style.width = '100%';
  modalContent.style.position = 'relative';
  modalContent.style.maxHeight = '90vh';
  modalContent.style.overflow = 'auto';
  
  console.log('Стили модального окна применены');
}

function openModal({type, src, title, description}) {
  console.log('Открываем модальное окно:', {type, src, title, description});
  if (!modalOverlay || !modalContent) {
    console.error('Модальное окно не найдено!');
    return;
  }
  
  modalContent.innerHTML = '';
  modalContent.innerHTML = '<button class="modal-close" style="position:absolute;top:15px;right:15px;background:none;border:none;font-size:24px;color:#666;cursor:pointer;z-index:10000;">&times;</button>';
  
  if (type === 'youtube') {
    modalContent.innerHTML += `
      <h2 style="margin-bottom:20px;font-size:1.8rem;font-weight:800;text-align:center;">${title}</h2>
      <div style="position:relative;display:flex;justify-content:center;align-items:center;min-height:450px;width:100%;">
        <iframe width="800" height="450" src="${src}" title="YouTube video" frameborder="0" allowfullscreen style="max-width:100%;max-height:60vh;background:#000;border-radius:8px;"></iframe>
      </div>
    `;
  } else if (type === 'iframe') {
    const openInNewTabText = window.location.pathname.includes('index.kz.html')
      ? 'Жаңа терезеде'
      : 'В новой вкладке';
    // Мультиязычный текст ошибки
    const lang = document.documentElement.lang;
    let iframeErrorText = '';
    if (lang === 'kk') {
      iframeErrorText = `Құжатты жүктеу мүмкін болмады.<br>Мүмкін, файл жоқ немесе сайт ендіруге тыйым салған.<br><b>assets/pdf/</b> қалтасында файл бар екенін және атауы сәйкес екенін тексеріңіз.`;
    } else {
      iframeErrorText = `Не удалось загрузить документ.<br>Возможно, файл отсутствует или сайт запретил встраивание.<br>Проверьте, что файл есть в папке <b>assets/pdf/</b> и имя совпадает.`;
    }
    modalContent.innerHTML += `
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:4px;">
        <button onclick="window.open('${src}','_blank')" class="cyber-button" style="font-size:1rem;padding:2px 8px;min-width:unset;line-height:1;display:flex;align-items:center;gap:4px;">
          <span style='font-size:1.2em;line-height:1;display:inline-block;transform:translateY(1px);'>🔗</span>
          <span>${openInNewTabText}</span>
        </button>
        <button class="modal-close" onclick="closeModal()" style="font-size:2rem;line-height:1;background:none;border:none;">&times;</button>
      </div>
      <h2 style="margin-bottom:16px;font-size:2rem;font-weight:800;">${title}</h2>
      <div style="position:relative;">
        <iframe id="modalIframe" src="${src}" width="100%" height="600px" style="border:none;min-height:400px;background:#fff;"></iframe>
        <div id="iframeError" style="display:none;text-align:center;padding:30px;">
          <p style="color:#c00;font-size:1.1rem;">${iframeErrorText}</p>
          <button onclick="window.open('${src}','_blank')" class="cyber-button" style="margin-top:16px;">${openInNewTabText}</button>
        </div>
      </div>
    `;
    setTimeout(() => {
      const iframe = document.getElementById('modalIframe');
      if (iframe) {
        iframe.onerror = function() {
          document.getElementById('iframeError').style.display = 'block';
          iframe.style.display = 'none';
        };
        // CSP fallback: если не загрузился за 2 сек — показываем ошибку
        setTimeout(() => {
          try {
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            if (!doc || doc.body.innerHTML === '' || doc.body.innerHTML.includes('errordocument') || doc.body.innerText.includes('404')) {
              document.getElementById('iframeError').style.display = 'block';
              iframe.style.display = 'none';
            }
          } catch (e) {
            document.getElementById('iframeError').style.display = 'block';
            iframe.style.display = 'none';
          }
        }, 2000);
      }
    }, 100);
  } else if (type === 'idea') {
    modalContent.innerHTML += `
      <div style="text-align:center;padding:40px;">
        <h2 style="margin-bottom:20px;font-size:2rem;font-weight:800;color:#333;">${title}</h2>
        <p style="margin-bottom:30px;font-size:1.2rem;color:#666;">${description}</p>
        <button id="ideaDoneBtn" class="cyber-button primary" style="font-size:1.2rem;padding:15px 40px;">Придумал!</button>
      </div>
    `;
    const doneBtn = modalContent.querySelector('#ideaDoneBtn');
    if (doneBtn) {
      doneBtn.onclick = () => {
        closeModal();
        unlockStep(5);
      };
    }
  }
  
  modalOverlay.style.display = 'flex';
  const closeBtn = modalContent.querySelector('.modal-close');
  if (closeBtn) closeBtn.onclick = closeModal;
  modalOverlay.onclick = (e) => { if (e.target === modalOverlay) closeModal(); };
  const handleEscape = (e) => { if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', handleEscape); } };
  document.addEventListener('keydown', handleEscape);
}

function closeModal() {
  console.log('Закрываем модальное окно');
  if (modalOverlay) {
    modalOverlay.style.display = 'none';
    // Удаляем обработчик клика вне модального окна
    modalOverlay.onclick = null;
  }
}

// Состояние кнопок второго шага
const step2State = {
    casesViewed: false,
    researchViewed: false
};

function updateStepStatus(stepNumber, isCompleted) {
    const step = document.querySelector(`.step-card[data-step="${stepNumber}"]`);
    if (!step) return;
    
    const status = step.querySelector('.step-status');
    if (!status) return;
    
    if (isCompleted) {
        step.classList.add('completed');
        status.textContent = STEP_STATUS.completed;
    } else {
        step.classList.remove('completed');
        if (window.location.pathname.includes('index.kz.html')) {
          status.textContent = STEP_STATUS.inProgress;
        } else {
          status.textContent = STEP_STATUS.inProgress;
        }
    }
}

function checkStep2Completion() {
    if (step2State.casesViewed && step2State.researchViewed) {
        updateStepStatus(2, true);
    }
}

// Делаем функции глобально доступными
window.openModal = openModal;
window.closeModal = closeModal;

console.log('modal-flow.js загружен, функции доступны глобально');
