var _ = require('lodash');

const FORM_FEEDBACK_LOKAL_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

let formObj = {
  email: '',
  textarea: '',
};

refs.form.addEventListener(
  'input',
  _.throttle(e => {
    onFormStateInput(e);
  }, 500)
);

refs.form.addEventListener('submit', onClearLocalSubmit);

function onFormStateInput(e) {
  const formCurrentTarget = e.target;
  if (formCurrentTarget === refs.input) {
    formObj.email = formCurrentTarget.value;
    localStorage.setItem(FORM_FEEDBACK_LOKAL_KEY, JSON.stringify(formObj));
  } else if (formCurrentTarget === refs.textarea) {
    formObj.textarea = formCurrentTarget.value;
    localStorage.setItem(FORM_FEEDBACK_LOKAL_KEY, JSON.stringify(formObj));
  }
}

function autoComplite() {
  const readLocal = localStorage.getItem(FORM_FEEDBACK_LOKAL_KEY);
  const newobj = JSON.parse(readLocal);

  if (!newobj) {
    return;
  }
  refs.input.value = newobj.email;
  refs.textarea.textContent = newobj.textarea;
  formObj.email = newobj.email;
  formObj.textarea = newobj.textarea;
}

if (!refs.input.value || !refs.textarea.value) {
  autoComplite();
}

function onClearLocalSubmit(e) {
  e.preventDefault();
  if (formObj.email !== '' && formObj.textarea !== '') {
    console.log(formObj);
    localStorage.removeItem(FORM_FEEDBACK_LOKAL_KEY);
    formObj.email = '';
    formObj.textarea = '';
    refs.input.value = '';
    refs.textarea.textContent = '';
  }
}
