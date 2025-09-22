const initialCards = [ 
    { 
      name: "Архыз", 
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg", 
    }, 
    { 
      name: "Челябинская область", 
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg", 
    }, 
    { 
      name: "Иваново", 
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg", 
    }, 
    { 
      name: "Камчатка", 
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg", 
    }, 
    { 
      name: "Холмогорский район", 
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg", 
    }, 
    { 
      name: "Байкал", 
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg", 
    } 
  ];
function createCard(cardData) {
    const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });
    deleteButton.addEventListener('click', () => {
      cardElement.remove();
    });
    cardImage.addEventListener('click', () => {
        const popupImage = imagePopup.querySelector('.popup__image');
        const popupCaption = imagePopup.querySelector('.popup__caption');
        popupImage.src = cardData.link;
        popupImage.alt = cardData.name;
        popupCaption.textContent = cardData.name;
        openModal(imagePopup);
      });
    return cardElement;
  }
  function renderCards() {
    const placesList = document.querySelector('.places__list');
    initialCards.forEach(cardData => {
      const cardElement = createCard(cardData);
      placesList.append(cardElement);
    });
  }
renderCards();


const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const cardFormElement = cardPopup.querySelector('.popup__form');
const placesList = document.querySelector('.places__list');
const imagePopup = document.querySelector('.popup_type_image');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');
function openModal(popup) {
  popup.classList.add('popup_is-opened');
}
function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
editProfileButton.addEventListener('click', () => {
  openModal(profilePopup);
});
addCardButton.addEventListener('click', () => {
  openModal(cardPopup);
});
const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup');
    closeModal(popup);
  });
});
function openProfilePopup() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent; 
    openModal(profilePopup);
  }
editProfileButton.addEventListener('click', openProfilePopup);
const closeProfileButton = profilePopup.querySelector('.popup__close');
closeProfileButton.addEventListener('click', () => {
    closeModal(profilePopup);
});
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    const name = nameInput.value;
    const job = jobInput.value;
    profileTitle.textContent = name;
    profileDescription.textContent = job;
    closeModal(profilePopup);
  }
profileFormElement.addEventListener('submit', handleProfileFormSubmit);




function openCardPopup() {
    cardFormElement.reset();
    openModal(cardPopup);
}
addCardButton.addEventListener('click', openCardPopup);
const closeCardButton = cardPopup.querySelector('.popup__close');
closeCardButton.addEventListener('click', () => {
    closeModal(cardPopup);
});
function handleCardFormSubmit(evt) {
    evt.preventDefault(); 
    const placeName = cardFormElement.querySelector('.popup__input_type_card-name').value;
    const placeLink = cardFormElement.querySelector('.popup__input_type_url').value;
    const newCardData = {
      name: placeName,
      link: placeLink
    };
    const newCardElement = createCard(newCardData);
    placesList.prepend(newCardElement);
    closeModal(cardPopup);
  }
cardFormElement.addEventListener('submit', handleCardFormSubmit);