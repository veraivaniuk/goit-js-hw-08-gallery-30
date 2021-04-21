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

const ulGalleryEl = document.querySelector('.js-gallery');
const lightboxEl = document.querySelector('.js-lightbox');
const lightboxImgEl = document.querySelector('.lightbox__image');
const btnCloseLightboxEl = document.querySelector('button[data-action= "close-lightbox"]');
const lightboxOverlayEl = document.querySelector(".lightbox__overlay");
let activImgIndex = null;

const markup = gallery.map((image, index) => {
  const liGallery = document.createElement('li');
  liGallery.classList.add('gallery__item');

  const aGallery = document.createElement('a');
  aGallery.classList.add('gallery__link');
  aGallery.setAttribute('href', image.original);

  const imgGallery = document.createElement('img');
  imgGallery.classList.add('gallery__image');
  imgGallery.setAttribute('src', image.preview);
  imgGallery.dataset.source = image.original;
  imgGallery.dataset.index = index;
  imgGallery.setAttribute('alt', image.description);
  aGallery.append(imgGallery);
  liGallery.append(aGallery);
  return liGallery
});


ulGalleryEl.append(...markup);

//2.Реализация делегирования на галерее ul.js-gallery и получение url 
//большого изображения.
const callbackOpenLightbox = (evt) => {
  evt.preventDefault();
  activImgIndex = +evt.target.dataset.index;
  console.log(activImgIndex);
//console.log(activImgIndex);
  if (evt.target.nodeName !== "IMG") {
    return 
  }
//3.Открытие модального окна по клику на элементе галереи.
  lightboxEl.classList.add('is-open');

//4.Подмена значения атрибута src, alt элемента img.lightbox__image.
  const dataSource = evt.target.dataset.source;
  lightboxImgEl.src = dataSource;

  const altValue = evt.target.attributes.alt.value;
  lightboxImgEl.alt = altValue;
  return activImgIndex;
};


const callbackCloseLightbox = (evt) => {
  evt.preventDefault();
  // - Закрытие модального окна по нажатию клавиши `ESC`.
  if (evt.keyCode == 27) {
    lightboxEl.classList.remove('is-open');
    lightboxImgEl.src = "";
    lightboxImgEl.alt = "";
  };
//6.Очистка значения атрибута src элемента img.lightbox__image. 
//Это необходимо для того, чтобы при следующем открытии модального окна, 
//пока грузится изображение, мы не видели предыдущее.
    if (evt.target.nodeName === "BUTTON" || evt.target.classList.contains('lightbox__overlay')) {
    lightboxEl.classList.remove('is-open');
    lightboxImgEl.src = "";
    lightboxImgEl.alt = "";
  }
};

const callbackСarousel = evt => {
  //console.log(activImgIndex);
  if (evt.key === "ArrowRight" && activImgIndex < gallery.length-1 ) {
    activImgIndex +=1;
    lightboxImgEl.src = gallery[activImgIndex].original;
    lightboxImgEl.alt = gallery[activImgIndex].description;
    console.log(activImgIndex);
    return;
  }
  if (evt.key === "ArrowRight" && activImgIndex === gallery.length-1) {
    activImgIndex = 0;
    lightboxImgEl.src = gallery[activImgIndex].original;
    lightboxImgEl.alt = gallery[activImgIndex].description;
    console.log(activImgIndex);
    return;
  }
  if (evt.key === "ArrowLeft" && activImgIndex ===0) {
    activImgIndex = gallery.length - 1;
    lightboxImgEl.src = gallery[activImgIndex].original;
    lightboxImgEl.alt = gallery[activImgIndex].description;
    console.log(activImgIndex);
    return;
  };
  if (evt.key === "ArrowLeft" && activImgIndex >= 0 ) {
    activImgIndex -= 1;
    lightboxImgEl.src = gallery[activImgIndex].original;
    lightboxImgEl.alt = gallery[activImgIndex].description;
    console.log(activImgIndex); 
    return;
  };
}

ulGalleryEl.addEventListener('click', callbackOpenLightbox);

//- Закрытие модального окна по нажатию клавиши `ESC`.
ulGalleryEl.addEventListener('keydown', callbackCloseLightbox);
//5.Закрытие модального окна по клику на кнопку 
//button[data - action= "close-lightbox"].
btnCloseLightboxEl.addEventListener('click', callbackCloseLightbox);
// - Закрытие модального окна по клику на `div.lightbox__overlay`.
lightboxOverlayEl.addEventListener('click', callbackCloseLightbox);


// - Пролистывание изображений галереи в открытом модальном окне клавишами "влево"
//   и "вправо".
window.addEventListener('keyup', callbackСarousel);
//lightboxOverlayEl.addEventListener('keydown', callbackСarousel);



