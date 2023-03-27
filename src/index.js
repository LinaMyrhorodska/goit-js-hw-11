import  onFetch  from './js/fetch.js';
import SimpleLightbox from 'simplelightbox';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { ProgressBar } from 'react-loader-spinner';

let numberPage = 1;
const galery = document.querySelector('.gallery');
const searchBtn = document.querySelector('.search-btn');
const input = document.querySelector('.input');
const loadMoreBtn = document.querySelector('.load-more__btn');
loadMoreBtn.style.display = 'none';
let gallerySimpleLightbox = new SimpleLightbox('.gallery a');


searchBtn.addEventListener('click', onBtnSubmit);
loadMoreBtn.addEventListener('click', onClickMore);

async function onBtnSubmit(e)  {
  e.preventDefault();
  onClean();
  const name = input.value.trim();
   if (name !== '') {
    const data = await onFetch(name);
    createItems(data);
  } else {
    loadMoreBtn.style.display = 'none';
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
};

async function onClickMore() {
  const name = input.value.trim();
  numberPage += 1;
  const data = await onFetch(name, numberPage);
  createItems(data, true);
};

export function createItems(photos, append = false) {
  const markup = photos.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
  <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
   <div class="info">
     <p class="info-item">
       <b>Likes:${likes}</b>
     </p>
     <p class="info-item">
       <b>Views:${views}</b>
     </p>
     <p class="info-item">
       <b>Comments:${comments}</b>
     </p>
     <p class="info-item">
       <b>Downloads:${downloads}</b>
     </p>
   </div>
 </div>`
    )
    .join('');
  if (append) {
    galery.insertAdjacentHTML('beforeend', markup);
  } else {
    galery.innerHTML = markup;
  }
  simpleLightbox.refresh();
};

const simpleLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function onClean() {
  numberPage = 1;
  galery.innerHTML = '';
  loadMoreBtn.style.display = 'none' 
}

let mask = document.querySelector('.loader-inner');

window.addEventListener('load', () =>
{
  mask.classList.add('hide');
  setTimeout(() => {
mask.remove()
  }, 400)
})


  // scroll to top//

window.onload = () => {
  window.onscroll = function (e) {
    let winY = window.scrollY;
    if (winY > 300) {
      ProgressBar();
      scrollbarAnimation();
      winY = null;
    }
  };
  const scrollBtn = document.querySelector('.isShowBtn')
  window.onscroll = () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.remove('isHiden');
    } else {
      scrollBtn.classList.add('isHiden');
    }
  }

  scrollBtn.onclick = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

};

export function Notification(length, totalHits) {
  if (length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  } else if (numberPage === 1) {
    loadMoreBtn.style.display = 'block';

    Notify.success(`Hooray! We found ${totalHits} images.`);
  } else if (numberPage >= Math.ceil(totalHits / 40)) {
    loadMoreBtn.style.display = 'none';
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
}


