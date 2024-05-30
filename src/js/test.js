const input = document.querySelector('.co-work-user');
const form = document.querySelector('.co-work-form-wrap');
form.addEventListener('submit', handleSubmit);

const textarea = document.querySelector('.co-work-message');

const messageBtn = document.querySelector('.co-work-btn');

// Полю для введення електронної пошти слід додати мінімальну валідацію
// введених даних  за допомогою  атрибуту
// pattern="^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$".

function handleSubmit(event) {
  event.preventDefault();
  const elements = event.target.elements;

  const patter = '^w+(.w+)?@[a-zA-Z_]+?.[a-zA-Z]{2,3}$';

  const inputEl = {
    email: elements.username.value,
    message: elements.feedback.value,
  };
  console.log(inputEl);

  const error = document.createElement('div');
  error.className = 'error';
  error.style.color = 'red';

  if (!inputEl.email || !inputEl.message) {
    error.innerHTML = 'Cannot be blank';
  }
}

// function submitTextArea(event) {
//   event.preventDefault();
//   for (let i = 0; i < textarea.length; i++) {
//     if (!textarea[i].value) {
//       console.log('field is blank', textarea[i]);
//     }
//   }
// }
