var _ = require('lodash');

const FORM_FEEDBACK_LOKAL_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

const formObj = {};

refs.input.addEventListener(
  'input',
  _.throttle(e => {
    onFormStateInput(e);
  }, 500)
);
refs.textarea.addEventListener(
  'input',
  _.throttle(e => {
    console.log(e.target.value);
    onFormStateTextarea(e);
  }, 500)
);
refs.form.addEventListener('submit', onClearLocalSubmit);

function onFormStateInput(e) {
  const formCurrentTarget = e.target;

  (formObj.email = formCurrentTarget.value), addLockal(formObj);
}
function onFormStateTextarea(e) {
  const formCurrentTarget = e.target;

  (formObj.message = formCurrentTarget.value), addLockal(formObj);
}

function addLockal(obj) {
  localStorage.setItem(FORM_FEEDBACK_LOKAL_KEY, JSON.stringify(obj));
}

function autoComplite() {
  const readLocal = localStorage.getItem(FORM_FEEDBACK_LOKAL_KEY);
  const newObj = JSON.parse(readLocal);

  if (!newObj) {
    return;
  }
  refs.input.value = newObj.email;
  refs.textarea.textContent = newObj.message;
}

if (!refs.input.value || !refs.textarea.value) {
  autoComplite();
}

function onClearLocalSubmit(e) {
  e.preventDefault();
  console.log(formObj);
  localStorage.removeItem(FORM_FEEDBACK_LOKAL_KEY);
}
