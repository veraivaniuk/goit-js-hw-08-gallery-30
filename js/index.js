import gallery from './gallery-items.js';
//1.Создание и рендер разметки по массиву данных и предоставленному шаблону.
/*<li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li>*/

const originalOfGallary = gallery.map((image)=>{image.original})

const ulGalleryEl = document.querySelector('.js-gallery');
const lightboxEl = document.querySelector('.js-lightbox');
const lightboxImgEl = document.querySelector('.lightbox__image');
const btnCloseLightboxEl = document.querySelector('button[data-action= "close-lightbox"]');
const lightboxOverlayEl = document.querySelector(".lightbox__overlay")

const renderMarkup = gallery.forEach((image) => {
  const liGallery = document.createElement('li');
  liGallery.classList.add('gallery__item');

  const aGallery = document.createElement('a');
  aGallery.classList.add('gallery__link');
  aGallery.setAttribute('href', '#');
  //console.log(liGallery);

  const imgGallery = document.createElement('img');
  imgGallery.classList.add('gallery__image');
  imgGallery.setAttribute('src', `${image.preview}`);
  imgGallery.dataset.source = `${image.original}`;
  imgGallery.setAttribute('alt', `${image.description}`);
  //console.dir(imgGallery);
  aGallery.append(imgGallery);
  liGallery.append(aGallery);
  ulGalleryEl.append(liGallery);
})

//2.Реализация делегирования на галерее ul.js-gallery и получение url 
//большого изображения.
const callbackOpenLightbox = (evt) => {
  if (evt.target.nodeName !== "IMG") {
    return
  }
  //3.Открытие модального окна по клику на элементе галереи.
  lightboxEl.classList.add('is-open');
  //4.Подмена значения атрибута src элемента img.lightbox__image.
  lightboxImgEl.attributes.src.value = evt.target.dataset.source;

  //console.log(modalImgEl.attributes.src.value);
  //console.log(evt.target.dataset.source);
};

const callbackCloseLightbox = (evt) => {
  //console.log(evt)
  // - Закрытие модального окна по нажатию клавиши `ESC`.
  if (evt.keyCode == 27) {
    lightboxEl.classList.remove('is-open');
    lightboxImgEl.attributes.src.value = "";
  }
  //6.Очистка значения атрибута src элемента img.lightbox__image. 
//Это необходимо для того, чтобы при следующем открытии модального окна, 
//пока грузится изображение, мы не видели предыдущее.
    if (evt.target.nodeName === "BUTTON" || evt.target.classList.contains('lightbox__overlay')) {
    lightboxEl.classList.remove('is-open');
    lightboxImgEl.attributes.src.value = "";
  }
};

const callbackPagination = evt => {
  console.log(evt.target.parentNode.parentNode.previousSibling.firstChild.childNodes[0].dataset.source);
  console.log(lightboxImgEl.attributes.src.value )

  if (evt.keyCode == 37) {
       lightboxImgEl.attributes.src.value = evt.target.parentNode.parentNode.previousSibling.firstChild.childNodes[0].dataset.source
    }
  //if (e.keyCode == '39') {
       // right arrow
    //}
  console.log(evt);
}

ulGalleryEl.addEventListener('click', callbackOpenLightbox);
//- Закрытие модального окна по нажатию клавиши `ESC`.
ulGalleryEl.addEventListener('keydown', callbackCloseLightbox);
//5.Закрытие модального окна по клику на кнопку 
//button[data - action= "close-lightbox"].
btnCloseLightboxEl.addEventListener('click', callbackCloseLightbox);
// - Закрытие модального окна по клику на `div.lightbox__overlay`.
lightboxOverlayEl.addEventListener('click', callbackCloseLightbox);

lightboxEl.addEventListener('keydown', callbackPagination)






// - Пролистывание изображений галереи в открытом модальном окне клавишами "влево"
//   и "вправо".

