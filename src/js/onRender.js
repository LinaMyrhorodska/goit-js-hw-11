import simpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';


export function onRenderList(images, append = false) {
    const galery = document.querySelector('.gallery');
      console.log(images, 'images');
    const markupImg = images.map(image => {
        
      console.log('img', image);
        return `
    <div class="photo-card">
 <a href="${image.largeImageURL}"><img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes:${image.likes}</b>
    </p>
    <p class="info-item">
      <b>Views:${image.views}</b>
    </p>
    <p class="info-item">
      <b>Comments:${image.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads:${image.downloads}</b>
    </p>
  </div>
</div>`;
    }).join('')
    galery.innerHTML += markupImg;
  simpleLightBox.refresh();
}

const simpleLightBox = new simpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
