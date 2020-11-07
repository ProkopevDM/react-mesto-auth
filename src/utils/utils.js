//Определяем нужные элементы внутри класса profile
const profile = document.querySelector('.profile');
const changeAvatarButton = profile.querySelector('.profile__button-change-avatar');
const editButton = profile.querySelector('.profile__button-edit');
const profileName = profile.querySelector('.profile__name');
const profession = profile.querySelector('.profile__profession');
const addButton = profile.querySelector('.profile__button-add');

//Определяем нужные элементы внутри класса elements
const elements = document.querySelector('.elements');
const elementsTemplate = document.querySelector('.element-template').content;

//Определяем нужные элементы для попапа редактирования аватара
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const avatarFormElement = popupEditAvatar.querySelector('.popup__form');
const avatarChangeSubmit = popupEditAvatar.querySelector('.popup__form-button_type_save-avatar');

//Определяем нужные элементы для попапа редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const saveButton = popupEditProfile.querySelector('.popup__form-button_type_save');
const editProfileCloseButton = popupEditProfile.querySelector('.popup__button-close');
const editFormElement = popupEditProfile.querySelector('.popup__form');
const inputName = editFormElement.querySelector('.popup__input_field_name');
const inputProfession = editFormElement.querySelector('.popup__input_field_profession');

//Определяем нужные элементы для попапа добавления элеманта
const popupAddElement = document.querySelector('.popup_type_add-element');
const createButton = popupAddElement.querySelector('.popup__form-button_type_create');
const addElementCloseButton = popupAddElement.querySelector('.popup__button-close');
const addFormElement = popupAddElement.querySelector('.popup__form');
const inputPlace = addFormElement.querySelector('.popup__input_type_place');
const inputUrl = addFormElement.querySelector('.popup__input_type_url');

//Определяем нужные элементы для попапа увеличения картинки
const popupPhotoFullscreen = document.querySelector('.popup_type_photo-fullscreen');
const openPopupPhotoFullscreen = popupPhotoFullscreen.querySelector('.popup__photo-fullscreen');
const photoFullscreenTitle = popupPhotoFullscreen.querySelector('.popup__photo-fullscreen-title');
const photoFullscreenCloseButton = popupPhotoFullscreen.querySelector('.popup__button-close');

//Определяем нужные элементы для попапа удаления карточки
const popupDeleteCard = document.querySelector('.popup_type_delete-card');
const approveButton = popupDeleteCard.querySelector('.popup__form-button_type_approve');
const popupDeleteCardCloseButton = popupDeleteCard.querySelector('.popup__button-close');

const object = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	inputErrorClass: 'popup__input_invalid',
	submitButtonSelector: '.popup__form-button',
	inactiveButtonClass: 'popup__form-button_disabled',
	errorClass: 'popup__span-error',
};

export {
	changeAvatarButton,
	editButton,
	addButton,
	elements,
	popupEditAvatar,
	avatarFormElement,
	avatarChangeSubmit,
	popupEditProfile,
	inputName,
	inputProfession,
	popupAddElement,
	addFormElement,
	openPopupPhotoFullscreen,
	photoFullscreenTitle,
	object,
	createButton,
	saveButton
}