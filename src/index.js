import "./index.css";
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
  document.addEventListener('keydown', closeByEsc); // Добавляем слушатель
}
function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEsc); // Удаляем слушатель
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





const saveButton = profileFormElement.querySelector('.popup__button');

function toggleSaveButton() {
  if (nameInput.validity.valid && jobInput.validity.valid) {
      saveButton.removeAttribute('disabled');
  } else {
      saveButton.setAttribute('disabled', 'true');
  }
}

function validateInput(input) {
    const errorElement = document.querySelector(`.popup__error_type_${input.name}`);
    if (!input.validity.valid) {
        if (input.validity.valueMissing) {
            errorElement.textContent = 'Вы пропустили это поле';
        } else if (input.validity.tooShort) {
            errorElement.textContent = `Минимальное количество символов: ${input.minLength}. Сейчас введено: ${input.value.length}.`;
        } else {
            errorElement.textContent = '';
        }
    } else {
        errorElement.textContent = '';
    }
    
    toggleSaveButton();
}

nameInput.addEventListener('input', () => {
    validateInput(nameInput);
});

jobInput.addEventListener('input', () => {
    validateInput(jobInput);
});


const placeNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const linkInput = cardFormElement.querySelector('.popup__input_type_url');
const saveCardButton = cardFormElement.querySelector('.popup__button');

function toggleCardSaveButton() {
  if (placeNameInput.validity.valid && linkInput.validity.valid) {
      saveCardButton.removeAttribute('disabled');
  } else {
      saveCardButton.setAttribute('disabled', 'true');
  }
}

function validateCardInput(input) {
  const errorElement = document.querySelector(`.popup__error_type_${input.name}`);
  
  if (!input.validity.valid) {
      if (input.validity.valueMissing) {
          errorElement.textContent = 'Вы пропустили это поле';
      } else if (input.name === 'link' && input.validity.typeMismatch) {
          errorElement.textContent = 'Введите адрес сайта';
      } else if (input.validity.tooShort) {
          errorElement.textContent = `Минимальное количество символов: ${input.minLength}. Сейчас введено: ${input.value.length}.`;
      } else {
          errorElement.textContent = '';
      }
  } else {
      errorElement.textContent = '';
  }
  
  toggleCardSaveButton();
}


placeNameInput.addEventListener('input', () => {
  validateCardInput(placeNameInput);
});

linkInput.addEventListener('input', () => {
    validateCardInput(linkInput);
});


const popups = document.querySelectorAll('.popup');

popups.forEach(popup => {
    popup.addEventListener('click', (event) => {
        if (event.target === popup) {
            closeModal(popup);
        }
    });
});

function closeByEsc(evt) {
  if (evt.key === "Escape") {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) {
          closeModal(openedPopup);
      }
  }
}

