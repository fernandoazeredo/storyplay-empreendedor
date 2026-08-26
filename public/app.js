const pageBody = document.body;
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

const savedTheme = localStorage.getItem('storyplay-theme');
if (savedTheme === 'dark') {
  pageBody.classList.add('dark');
}

if (themeToggle) {
  themeToggle.addEventListener('click', function () {
    pageBody.classList.toggle('dark');
    const currentTheme = pageBody.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('storyplay-theme', currentTheme);
  });
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', function () {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.textContent = isOpen ? '✕' : '☰';
  });
}

document.querySelectorAll('#mainNav a').forEach(function (link) {
  link.addEventListener('click', function () {
    if (mainNav) {
      mainNav.classList.remove('open');
    }
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
    }
  });
});
