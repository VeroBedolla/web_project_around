import { Card } from "./Card.js";
import { PopupWithForm } from "./PopupWithForms.js";
import { PopupWithImage } from "./PopupWithImages.js";
import { Section } from "./Section.js";
import { UserInfo } from "./UserInf.js";
import { FormValidator } from "./FormValidator.js";
// Variables para modificar el perfil
const popupProfile = document.querySelector("#popup-profile");
const profileButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileHobbie = document.querySelector(".profile__hobbie");
const inputName = document.querySelector("#input-name");
const inputHobbie = document.querySelector("#input-hobbie");
const formProfile = document.querySelector("#form-profile");
const closeButton = document.querySelector(".form__close-button-profile");
// Variables para agregar tarjetas (cards)
const cardContainer = document.querySelector(".main__container");
const popupAddCard = document.querySelector("#popup-add-card");
const formAddCard = document.querySelector("#form-addCard");
const addButton = document.querySelector(".profile__add-button");
const inputCardName = document.querySelector("#input-card-name");
const inputLink = document.querySelector("#input-card-link");
const closeAddCardButton = document.querySelector(
  ".form__close-button-addCard"
);
const createButton = document.querySelector(".form__submit");
const popupCardImage = document.querySelector("#popup-show-card");
const popupCardClose = document.querySelector(".popup__close-card");
// Tarjetas iniciales
const initialCards = [
  {
    name: "Bellas Artes",
    link: "./images/bellasartes.jpg",
  },
  {
    name: "Piramide del Sol",
    link: "./images/sol.jpg",
  },
  {
    name: "Isla Mujeres",
    link: "./images/isla.jpg",
  },
  {
    name: "Huamantla",
    link: "./images/huamantla.jpg",
  },
  {
    name: "Guadalajara",
    link: "./images/guadalajara.png",
  },
  {
    name: "Nevado de Toluca",
    link: "./images/toluca.jpg",
  },
];

const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const profilePopup = new PopupWithForm("#popup-profile", (data) => {
  userInfo.setUserInfo({ name: data.name, hobbie: data.hobbie });
  profilePopup.close();
});
const addCardPopup = new PopupWithForm("#popup-add-card", (data) => {
  const newCard = createCard(data.link, data.name);
  cardContainer.prepend(newCard);
  addCardPopup.close();
});
const showCardPopup = new PopupWithImage("#popup-show-card", () => {});
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  hobbieSelector: ".profile__hobbie",
});

const profileFormValidator = new FormValidator(config, formProfile);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, formAddCard);
addCardFormValidator.enableValidation();

// Función para agregar una tarjeta (card)
function createCard(link, name) {
  const card = new Card(name, link, "#template__card", (link, name) => {
    showCardPopup.open();
    popupCardImage.querySelector(".popup__photo-link").src = link;
    popupCardImage.querySelector(".popup__photo-link").alt = name;
    popupCardImage.querySelector(".popup__photo-name").textContent = name;
  });
  return card.generateCard();
}

// Añadir las tarjetas iniciales al contenedor
const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = createCard(item.link, item.name);
      cardContainer.prepend(newCard);
    },
  },
  ".main__container"
);
section.renderItems();

// Evento para abrir el popup de editar perfil
profileButton.addEventListener("click", function () {
  const data = userInfo.getUserInfo();
  inputName.value = data.name;
  inputHobbie.value = data.hobbie;
  profilePopup.open();
});

// Función para cerrar todos los popups
function closeAnyPopup() {
  profilePopup.close(); // Cierra el popup de perfil
  addCardPopup.close(); // Cierra el popup de agregar tarjeta
  showCardPopup.close(); // Cierra el popup de mostrar tarjeta
}

// Usar en lugar de los listeners directos
closeButton.addEventListener("click", closeAnyPopup);
closeAddCardButton.addEventListener("click", closeAnyPopup);
popupCardClose.addEventListener("click", closeAnyPopup);

// Evento para manejar el envío del formulario de perfil
formProfile.addEventListener("submit", function (evt) {
  evt.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
  profileName.textContent = inputName.value; // Actualiza el nombre del perfil
  profileHobbie.textContent = inputHobbie.value; // Actualiza el hobbie del perfil
  profilePopup.close(); // Cierra el popup después de actualizar el perfil
});

// Evento para abrir el popup de agregar tarjeta
addButton.addEventListener("click", function () {
  addCardPopup.open();
});

// Evento para manejar el envío del formulario de agregar tarjeta
formAddCard.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const name = inputCardName.value;
  const link = inputLink.value;

  if (name && link) {
    const newCard = createCard(link, name);
    cardContainer.prepend(newCard); // Añade la nueva tarjeta al contenedor

    inputCardName.value = ""; // Resetea el campo de nombre
    inputLink.value = ""; // Resetea el campo de enlace

    addCardPopup.close(); // Cierra el popup después de agregar la tarjeta
  }
});

//Cerrar los form presionando en el overlay
popupAddCard
  .querySelector(".popup__overlay")
  .addEventListener("click", function () {
    addCardPopup.close();
  });

popupProfile
  .querySelector(".popup__overlay")
  .addEventListener("click", function () {
    profilePopup.close();
  });

popupCardImage
  .querySelector(".popup__overlay")
  .addEventListener("click", function () {
    showCardPopup.close();
  });
