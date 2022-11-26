// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import { Notify } from 'notiflix';
import axios from 'axios';
import { searchHttpQuery } from './searchHttpQuery';
import { refs } from './refs';
// import NewsApiService from './new-service';

refs.form.addEventListener('submit', onSearch);
refs.buttonLM.addEventListener('click', onLoadMore);

let myQuery = '';
let page = 1;
refs.buttonLM.style.display = 'none';

function fetchArticles() {
  return fetch(
    `https://pixabay.com/api/?key=12397794-3c79aefa4a299d9b97accc173&q=${myQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  )
    .then(response => response.json())
    .then(data => {
      console.log('data22', data);
      return data;
    });
}

async function onSearch(e) {
  e.preventDefault();
  clearArticlesContainer();
  myQuery = e.currentTarget.elements.searchQuery.value;
  if (!myQuery.trim()) {
    return alert(
      'Sorry, there are no images matching your search query. Please try again'
    );
  }
  // return data;
  resetPage();
  const a = await fetchArticles().then(createMarkup);
  refs.buttonLM.style.display = 'block';
}

function createMarkup({ hits, totalHits }) {
  // console.log('hits46', hits, totalHits);
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
   <b>Likes:${likes}</b>
  </p>
  <p class="info-item">
 <b>Views:${views}</b>
 </p>
 <p class="info-item">
 <b>Commments:${comments}</b>
 </p>
 <p class="info-item">
 <b>Downloads:${downloads}</b>
</p>
</div>
</a>
 </div> `
    )
    .join('');
  refs.div.insertAdjacentHTML('beforeend', markup);
}

function resetPage() {
  page = 1;
}

function incrementPage() {
  page += 1;
}
// console.log(Notify);
function onLoadMore() {
  incrementPage();
  fetchArticles().then(createMarkup);
}

function clearArticlesContainer() {
  refs.div.innerHTML = '';
}
// function createMarkup(data) {
// console.log('in create markup ', data);
// const markup = data.hits
//   .map(
//     ({
//       webformatURL,
//       largeImageURL,
//       tags,
//       likes,
//       views,
//       comments,
//       downloads,
//     }) => {
//       return ` <div class="photo-card">
//           // <a class ="gallery-link" href='${largeImageURL}'>
//   <img  src="${webformatURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>${views}</b>
//     </p>
//     <p class="info-item">
//       <b>${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>${downloads}</b>
//     </p>
//   </div>
// </div>
// // </a>
// `;
//     }
//   )
//   .join('');
// // return markup;
// refs.div.insertAdjacentHTML('beforeend', createMarkup);
// }
// createMarkup();
