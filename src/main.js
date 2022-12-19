window.onload = function () {
  console.log("go!");

  // burger-menu
  addBurgerMenuHandler();
};

const addBurgerMenuHandler = () => {
  const burgerToggler = document.querySelector("#burgerToggler");
  const navigation = document.querySelector("#navigation");
  const btnClose = document.querySelector("#btnClose");
  const blackout = document.querySelector("#blackout");

  const openBurgerMenu = (event) => {
    if (navigation) navigation.classList.add("header__menu-open");
    if (blackout) blackout.classList.add("blackout__active");
    document.body.classList.add("lock");
  };

  const closeBurgerMenu = (event) => {
    if (navigation.classList.contains("header__menu-open"))
      navigation.classList.remove("header__menu-open");
    if (blackout.classList.contains("blackout__active"))
      blackout.classList.remove("blackout__active");
    if (document.body.classList.contains("lock"))
      document.body.classList.remove("lock");
  };

  if (burgerToggler) {
    burgerToggler.addEventListener("click", openBurgerMenu);

    if (blackout) blackout.addEventListener("click", closeBurgerMenu);

    const menuLinks = document.querySelectorAll(".menu__link");
    if (menuLinks.length > 0)
      menuLinks.forEach((el) => el.addEventListener("click", closeBurgerMenu));
  }

  if (btnClose) {
    btnClose.addEventListener("click", closeBurgerMenu);
  }
};
