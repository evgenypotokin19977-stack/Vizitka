document.addEventListener("DOMContentLoaded", () => {
  const modalButtons = document.querySelectorAll(".hub-category-btn");
  const modals = document.querySelectorAll(".hub-modal");

  function openModal(modalId) {
    const modal = document.getElementById(modalId);

    if (!modal) return;

    modal.classList.add("is-open");
    document.body.classList.add("modal-open");
  }

  function closeModal(modal) {
    modal.classList.remove("is-open");

    if (!document.querySelector(".hub-modal.is-open")) {
      document.body.classList.remove("modal-open");
    }
  }

  modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openModal(button.dataset.modal);
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target.hasAttribute("data-close")) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    modals.forEach((modal) => {
      if (modal.classList.contains("is-open")) {
        closeModal(modal);
      }
    });
  });
});

