document.addEventListener("DOMContentLoaded", () => {
  const portfolioEntry = document.querySelector(".portfolio-entry");

  if (!portfolioEntry) return;

  portfolioEntry.addEventListener("mousemove", (event) => {
    const rect = portfolioEntry.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    portfolioEntry.style.setProperty("--mx", `${x}px`);
    portfolioEntry.style.setProperty("--my", `${y}px`);
  });
});