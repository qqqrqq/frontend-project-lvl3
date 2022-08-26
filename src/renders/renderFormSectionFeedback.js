const renderFormSectionFeedback = (isValid) => {
  const input = document.querySelector('#url-input');

  return isValid ? input.classList.remove('is-invalid') : input.classList.add('is-invalid');
};

export default renderFormSectionFeedback;
