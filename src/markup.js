import { refs } from './refs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function createMarkup({ hits }) {
  const markup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <div class="photo-card">
    <a href='${largeImageURL}'>
<img  src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
 <p class="info-item">
   <b>Likes:<br>${likes}</b>
  </p>
  <p class="info-item">
 <b>Views:<br>${views}</b>
 </p>
 <p class="info-item">
 <b>Commments:<br>${comments}</b>
 </p>
 <p class="info-item">
 <b>Downloads:<br>${downloads}</b>
</p>
</div>
</a>
 </div> `
    )
    .join('');
  refs.div.insertAdjacentHTML('beforeend', markup);

  new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    fadeSpeed: 170,
  });
}
