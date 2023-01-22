const ADDRESSES = [
  {
    city: "Canandaigua, NY",
    phone: "+1	585	393 0001",
    office: "151 Charlotte Street",
  },
  {
    city: "New York City",
    phone: "+1	212	456 0002",
    office: "9 East 91st Street",
  },
  { city: "Yonkers, NY", phone: "+1	914	678 0003", office: "511 Warburton Ave" },
  {
    city: "Sherrill, NY",
    phone: "+1	315	908 0004",
    office: "14 WEST Noyes BLVD",
  },
];

window.onload = () => {
  // services
  addServicesHandler();

  // prices
  addPricesHandler();

  // contacts
  addContactsHandler();

  // burger-menu
  addBurgerMenuHandler();
};

// services
const addServicesHandler = () => {
  const btnServicePanel = document.querySelector("#btnServicePanel");
  const cards = document.querySelector("#cards");
  let listCards = [];
  if (cards) {
    listCards = Array.from(cards.querySelectorAll(".card")).map((card) => ({
      card,
      service: card.dataset.service,
    }));
  }
  const listServices = [];

  const setBlur = () => {
    const selectedServices = [];
    listServices.forEach(({ selected, service }) => {
      if (selected) selectedServices.push(service);
    });

    if (selectedServices.length === 0) {
      listCards.forEach(({ card }) => card.classList.remove("card-blur"));
    } else {
      listCards.forEach(({ card, service }) => {
        if (selectedServices.includes(service)) {
          card.classList.remove("card-blur");
        } else {
          card.classList.add("card-blur");
        }
      });
    }
  };

  const toggleService = (event) => {
    const currentBtn = event.currentTarget;

    let currentService;
    let selected = 0;

    listServices.forEach((el) => {
      if (el.btn === currentBtn) currentService = el;
      selected += el.selected ? 1 : 0;
    });

    if (selected > 1 && !currentService.selected) return;

    currentBtn.classList.toggle("btn-active");
    currentService.selected = !currentService.selected;

    setBlur();
  };

  if (btnServicePanel) {
    const listBtn = btnServicePanel.querySelectorAll(".btn");

    if (listBtn.length > 0)
      listBtn.forEach((btn) => {
        btn.addEventListener("click", toggleService);
        listServices.push({ btn, selected: false, service: btn.textContent });
      });
  }
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

// contacts
const addContactsHandler = () => {
  const selectCity = document.querySelector("#selectCity");
  const select = selectCity.querySelector(".select");
  const options = selectCity.querySelector(".select__list-options");
  const title = selectCity.querySelector(".select__title");
  const cityCard = document.querySelector("#cityCard");
  const contacts = document.querySelector("#contacts");
  const image = contacts.querySelector(".contacts__image");

  const toggleSelect = (event) => {
    if (title && title.textContent === "City") {
      select.classList.toggle("select-active");

      const iconArrow = select.querySelector(".icon-arrow");
      if (iconArrow) iconArrow.classList.toggle("icon-arrow-accent");
    }

    if (title && title.textContent !== "City") {
      const icon = select.querySelector(".arrow");
      if (icon) icon.classList.toggle("arrow-closed");
    }

    const icon = select.querySelector(".arrow");
    if (icon) icon.classList.toggle("arrow-open");

    if (options) options.classList.toggle("select__list-options-open");
  };

  const selectCityOption = (event) => {
    const selected = event.currentTarget;
    const index = +selected.dataset.cityIndex;

    const selectedCity = ADDRESSES[index];

    const city = cityCard.querySelector("#city");
    if (city) city.textContent = selectedCity.city;

    const phone = cityCard.querySelector("#phone");
    if (phone) phone.textContent = selectedCity.phone;

    const office = cityCard.querySelector("#office");
    if (office) office.textContent = selectedCity.office;

    const callButton = cityCard.querySelector("#callButton");
    if (callButton)
      callButton.href = `tel:${selectedCity.phone.replaceAll(" ", "")}`;

    if (title) title.textContent = selectedCity.city;

    cityCard.classList.add("contacts__city-card-show");
    if (image) image.classList.add("contacts__image-hidden");

    toggleSelect(event);
  };

  if (select && options) {
    select.addEventListener("click", toggleSelect);

    const listOptions = options.querySelectorAll(".select__option");
    if (listOptions.length > 0)
      listOptions.forEach((el) =>
        el.addEventListener("click", selectCityOption)
      );
  }
};

// burger-menu
const addBurgerMenuHandler = () => {
  const header = document.querySelector("#header");
  const burgerToggler = document.querySelector("#burgerToggler");
  const navigation = document.querySelector("#navigation").cloneNode(1);
  const popup = document.querySelector("#popup");
  const blackout = document.querySelector("#blackout");

  if (popup && navigation) popup.append(navigation);

  const toggleBurgerMenu = (event) => {
    if (popup) popup.classList.toggle("popup-open");
    if (blackout) blackout.classList.toggle("blackout__active");
    document.body.classList.toggle("lock");
    event.stopPropagation();
  };

  const closeBurgerMenu = (event) => {
    if (popup) popup.classList.remove("popup-open");
    if (blackout) blackout.classList.remove("blackout__active");
    document.body.classList.remove("lock");
  };

  if (burgerToggler) {
    burgerToggler.addEventListener("click", toggleBurgerMenu);

    if (blackout) blackout.addEventListener("click", closeBurgerMenu);

    const menuLinks = navigation.querySelectorAll(".menu__link");
    if (menuLinks.length > 0)
      menuLinks.forEach((el) => el.addEventListener("click", closeBurgerMenu));
  }

  if (header) {
    header.addEventListener("click", closeBurgerMenu);
  }
};
