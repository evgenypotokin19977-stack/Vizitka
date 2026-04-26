document.addEventListener("DOMContentLoaded", function () {
  const siteHeader = document.getElementById("siteHeader");
  const themeButtons = document.querySelectorAll(".theme-btn");
  const body = document.body;

  const THEME_STORAGE_KEY = "jex1k-theme";
  const DEFAULT_THEME = "theme-default";

  function handleHeaderState() {
    if (!siteHeader) return;

    if (window.scrollY > 20) {
      siteHeader.classList.add("is-scrolled");
    } else {
      siteHeader.classList.remove("is-scrolled");
    }
  }

  function applyTheme(themeName) {
    body.classList.remove("theme-default", "theme-violet", "theme-blue");
    body.classList.add(themeName);

    themeButtons.forEach((button) => {
      const isActive = button.dataset.theme === themeName;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function saveTheme(themeName) {
    localStorage.setItem(THEME_STORAGE_KEY, themeName);
  }

  function loadTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return savedTheme || DEFAULT_THEME;
  }

  themeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const selectedTheme = button.dataset.theme;
      applyTheme(selectedTheme);
      saveTheme(selectedTheme);
    });
  });

  applyTheme(loadTheme());
  handleHeaderState();
  window.addEventListener("scroll", handleHeaderState);
});

// ===== SECRET EXPRESS ACCESS =====
let logoClicks = 0;
let clickTimer = null;

const brandLogo = document.querySelector('.brand');

if (brandLogo) {
  brandLogo.addEventListener('click', () => {
    logoClicks++;

    clearTimeout(clickTimer);

    clickTimer = setTimeout(() => {
      logoClicks = 0;
    }, 2000);

    if (logoClicks >= 5) {
      localStorage.setItem('express_access', 'granted');

      // редирект
      window.location.href = 'assets/core/x1/temp_v2.html';
    }
  });
}