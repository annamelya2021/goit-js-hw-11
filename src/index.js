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

function onSearch(e) {
  e.preventDefault();
  resetPage();
  myQuery = e.currentTarget.elements.searchQuery.value;
  fetchArticles()
    .then(data => {
      // console.log(data.hits, 'khgkhg');
      if (!myQuery.trim()) {
        alert(
          'Sorry, there are no images matching your search query. Please try again'
        );
      }
      return data;
      // console.log('data.hits in onsearch :>> ', data.hits, 'data', data)
    })
    .then(createMarkup);
}

function createMarkup({ hits, totalHits }) {
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
    <div class="photo-card galery">
    <a href='${largeImageURL}'>
<img  src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
 <p class="info-item">
   <b>${likes}</b>
  </p>
  <p class="info-item">
 <b>${views}</b>
 </p>
 <p class="info-item">
 <b>${comments}</b>
 </p>
 <p class="info-item">
 <b>${downloads}</b>
</p>
</div>
</a>
 </div> `
    )
    .join('');
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
  fetchArticles().then(data =>
    console.log('data.hits in loadmore :>> ', data.hits)
  );
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
