// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix';
import axios from 'axios';
import { refs } from './refs';
import { createMarkup } from './markup';

const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = `12397794-3c79aefa4a299d9b97accc173`;

refs.form.addEventListener('submit', onSearch);
refs.buttonLM.addEventListener('click', onLoadMore);

let myQuery = '';
let page = 1;
let total = 0;
refs.buttonLM.style.display = 'none';

async function fetchArticles() {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=&q=${myQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    );
    total += response.data.hits.length;
    const totalHits = response.data.totalHits;
    if (total >= totalHits) {
      Notify.info('We`re sorry, but you`ve reached the end of search results.');
      refs.buttonLM.style.display = 'none';
    }
    return response.data;
  } catch (error) {
    Notify.failure('Sorry,an error occurred');
  }
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
  resetPage();
  const renderMarkup = await fetchArticles().then(createMarkup);
  refs.buttonLM.style.display = 'block';
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
