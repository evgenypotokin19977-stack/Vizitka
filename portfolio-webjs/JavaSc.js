document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".web-case-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("is-hovered");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("is-hovered");
    });
  });
});