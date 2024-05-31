const formEl = {
  input: document.querySelector('.co-work-user'),
  form: document.querySelector('.co-work-form'),
  textarea: document.querySelector('.co-work-message'),
  messageBtn: document.querySelector('.co-work-btn'),
};

// Check if email is valid
const emailPattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

function isEmailValid(value) {
  return emailPattern.test(value);
}

// Add event listener for form submission
formEl.form.addEventListener('submit', handleSubmit);

// function showError(field, errText) {
//   field.classList.add('co-work-user');
//   const error = document.createElement('span');
//   field.after(error);
// }

document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('username');
  const errorMessage = document.getElementById('username-error');

  input.addEventListener('blur', function () {
    if (input.value.trim() === '') {
      input.classList.add('invalid');
      errorMessage.style.display = 'block';
    } else {
      input.classList.remove('invalid');
      errorMessage.style.display = 'none';
    }
  });
});

function handleSubmit(event) {
  event.preventDefault();

  const inputEmail = formEl.input.value;
  const inputMessage = formEl.textarea.value;

  // Validate email
  if (!isEmailValid(inputEmail)) {
    showError(``);
    return;
  }

  const BASE_URL = 'https://portfolio-js.b.goit.study/api-docs/';

  fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    section: JSON.stringify({
      email: inputEmail.value,
      message: inputMessage.value,
    }),
  })
    .then(response => {
      if (response.ok) {
        console.log('Message sent successfully!');
        formEl.form.reset(); // Clear form
      } else {
        throw new Error('Failed to send message.');
      }
    })
    .catch(error => {
      console.log(error.message);
    });
}

// Handle input change
formEl.input.addEventListener('input', handleUpdate);
formEl.textarea.addEventListener('input', handleUpdate);

function handleUpdate(event) {
  console.log(event.currentTarget.value);
}
