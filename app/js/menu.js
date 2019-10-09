const MainMenuBtn = document.querySelector('.pages-header__togle');
const MainMenuList = document.querySelector('.main-nav');

MainMenuList.classList.remove("main-nav--no-js");

MainMenuBtn.addEventListener('click', (e) => {
  e.preventDefault();
  MainMenuList.classList.toggle("main-nav--open");
  MainMenuBtn.classList.toggle("pages-header__togle--opened");
});
