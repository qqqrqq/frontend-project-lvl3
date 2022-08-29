const handlerBtnsOpenModal = (watcherContent) => {
  Array.from(document.querySelectorAll('.btn-outline-primary')).forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currendId = e.target.dataset.id;
      const { topics } = watcherContent;
      const currentTopic = topics.filter(({ childrenId }) => childrenId === currendId);
      watcherContent.uiState.activeModalTopic = currentTopic;
    });
  });
};

export default handlerBtnsOpenModal;
