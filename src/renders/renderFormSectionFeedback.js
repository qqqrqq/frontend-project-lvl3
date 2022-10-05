const renderFormSectionFeedback = (isValid, messageError) => {
  const input = document.querySelector('#url-input');
  const errorItem = document.querySelector('.feedback');
  input.value = '';
  input.focus();
  errorItem.textContent = messageError;
  if (isValid) {
    input.classList.remove('is-invalid');
    errorItem.classList.add('text-success');
    errorItem.classList.remove('text-danger');
  } else {
    input.classList.add('is-invalid');
    errorItem.classList.add('text-danger');
    errorItem.classList.remove('text-success');
  }
};

export default renderFormSectionFeedback;
