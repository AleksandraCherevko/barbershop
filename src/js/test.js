const formEl = {
  input: document.querySelector('.co-work-user'),
  form: document.querySelector('.co-work-form'),
  textarea: document.querySelector('.co-work-message'),
  messageBtn: document.querySelector('.co-work-btn'),
  modalContainer: document.querySelector('.modal-container'),
};

formEl.form.addEventListener('submit', handleSubmit);

const emailPattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

// Функция для валидации email
export function isEmailValid(value) {
  const isValid = emailPattern.test(value);
  const container = formEl.input.parentNode;
  const errorMessage = container.querySelector('.error-message');

  if (!isValid) {
    formEl.input.classList.add('invalid');
    if (!errorMessage) {
      showError(container, 'Please enter a valid email address.');
    }
  } else {
    formEl.input.classList.remove('invalid');
    if (errorMessage) {
      errorMessage.remove();
    }
  }

  return isValid;
}

// Функция для создания разметки модального окна
export function createModal({ title, message }) {
  return `
    <div id="myModal" class="modal">
      <div class="modal-content">
        <button class="modal-closeBtn">X</button>
        <h3 class="modal-title-a">${title}</h3>
        <p class="modal-message">${message}</p>
      </div>
    </div>`;
}

// Обработчик отправки формы
export function handleSubmit(event) {
  event.preventDefault();
  formEl.modalContainer.innerHTML = '';
  const inputEmail = formEl.input.value;
  const inputMessage = formEl.textarea.value;

  if (!isEmailValid(inputEmail)) {
    formEl.input.classList.add('invalid');
    return;
  }

  const BASE_URL = 'https://portfolio-js.b.goit.study/api-docs/';
  fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: inputEmail,
      message: inputMessage,
    }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        formEl.form.reset();
        const modalHTML = createModal({
          title: 'Thank you for your interest in cooperation!',
          message:
            'The manager will contact you shortly to discuss further details and opportunities for cooperation. Please stay in touch.',
        });
        formEl.modalContainer.insertAdjacentHTML('beforeend', modalHTML);
        document.querySelector('#myModal').classList.add('show');
        modalCloseEvList();
      } else {
        throw new Error('Server response was not successful');
      }
    })
    .catch(error => {
      console.error(error);
      const modalHTML = createModal({
        title: 'Error',
        message: 'There was an error sending your message. Please try again.',
      });
      formEl.modalContainer.insertAdjacentHTML('beforeend', modalHTML);
      document.querySelector('#myModal').classList.add('show');
      modalCloseEvList();
    });
}

// Функция для добавления обработчика события закрытия модального окна
function modalCloseEvList() {
  const closeBtn = document.querySelector('.modal-closeBtn');
  closeBtn.addEventListener('click', closeModal);
}

// Функция для закрытия модального окна
function closeModal() {
  const modal = document.querySelector('#myModal');
  modal.classList.remove('show');
  modal.remove();
}

// Функция для отображения сообщения об ошибке
function showError(container, errorMessage) {
  const errorElem = container.querySelector('.error-message');
  if (errorElem) {
    errorElem.textContent = errorMessage;
  } else {
    const msgElem = document.createElement('span');
    msgElem.className = 'error-message';
    msgElem.textContent = errorMessage;
    container.appendChild(msgElem);
  }
}
