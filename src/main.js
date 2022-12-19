window.onload = function () {
  // prices
  addPricesHandler();

  // burger-menu
  addBurgerMenuHandler();
};

// prices
const addPricesHandler = () => {
  const priceItems = document.querySelectorAll(".price-item");

  const togglePriceItem = (event) => {
    const target = event.target;
    if (target.tagName === "BUTTON" || target.tagName === "A") return;

    const priceItem = event.currentTarget;

    if (priceItem) {
      priceItem.classList.toggle("price-item-open");

      const dropdown = priceItem.querySelector(".price-item__dropdown");
      if (dropdown) dropdown.classList.toggle("dropdown-open");

      const iconArrow = priceItem.querySelector(".icon-arrow");
      if (iconArrow) iconArrow.classList.toggle("icon-arrow-accent");

      const icon = priceItem.querySelector(".arrow");
      if (icon) icon.classList.toggle("arrow-open");
    }

    if (priceItems.length > 0)
      priceItems.forEach((currentItem) => {
        if (priceItem !== currentItem) {
          currentItem.classList.remove("price-item-open");

          const dropdown = currentItem.querySelector(".price-item__dropdown");
          if (dropdown) dropdown.classList.remove("dropdown-open");

          const iconArrow = currentItem.querySelector(".icon-arrow");
          if (iconArrow) iconArrow.classList.remove("icon-arrow-accent");

          const icon = currentItem.querySelector(".arrow");
          if (icon) icon.classList.remove("arrow-open");
        }
      });
  };

  if (priceItems.length > 0)
    priceItems.forEach((el) => el.addEventListener("click", togglePriceItem));
};

// burger-menu
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
