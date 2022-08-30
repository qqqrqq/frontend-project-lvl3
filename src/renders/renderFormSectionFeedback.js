const renderFormSectionFeedback = (isValid, messageError) => {
  const input = document.querySelector('#url-input');
  const errorItem = document.querySelector('.feedback');
  input.value = '';
  input.focus();
  errorItem.textContent = messageError;

  isValid ? input.classList.remove('is-invalid') : input.classList.add('is-invalid');
  isValid ? errorItem.classList.add('text-success') : errorItem.classList.add('text-danger');
};

export default renderFormSectionFeedback;
