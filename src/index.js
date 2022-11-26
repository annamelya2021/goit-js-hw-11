// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import { Notify } from 'notiflix';
import axios from 'axios';
// import { searchHttpQuery } from './searchHttpQuery';
import { refs } from './refs';
// import NewsApiService from './new-service';

refs.form.addEventListener('submit', onSearch);
refs.buttonLM.addEventListener('click', onLoadMore);

let myQuery = '';
let page = 1;
let total = 0;
refs.buttonLM.style.display = 'none';

async function fetchArticles() {
  return fetch(
    `https://pixabay.com/api/?key=12397794-3c79aefa4a299d9b97accc173&q=${myQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  )
    .then(response => response.json())

    .then(data => {
      total += data.hits.length;
      const totalHits = data.totalHits;
      if (total >= totalHits) {
        Notify.info(
          'We`re sorry, but you`ve reached the end of search results.'
        );
        refs.buttonLM.style.display = 'none';
      }
      // console.log(total);
      // console.log('data22', data);
      return data;
    });
}

async function onSearch(e) {
  e.preventDefault();
  clearArticlesContainer();
  myQuery = e.currentTarget.elements.searchQuery.value;
  if (!myQuery.trim()) {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again'
    );
  }
  // return data;
  resetPage();
  const a = await fetchArticles().then(createMarkup);
  refs.buttonLM.style.display = 'block';
}

function createMarkup({ hits }) {
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
}

function resetPage() {
  page = 1;
}

function incrementPage() {
  page += 1;
}

function onLoadMore() {
  incrementPage();
  fetchArticles().then(createMarkup);
}

function clearArticlesContainer() {
  refs.div.innerHTML = '';
}
