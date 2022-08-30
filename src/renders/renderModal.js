const renderModal = (topic) => {
  const { title, link, description } = topic[0];

  const modalTitle = document.querySelector('.modal-title');
  modalTitle.textContent = title;

  const modalBody = document.querySelector('.modal-body');
  modalBody.textContent = description;

  const btnCheck = document.querySelector('[data-check]');

  btnCheck.setAttribute('href', link);
};

export default renderModal;
