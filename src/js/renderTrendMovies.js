import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";
import renderData from './renderData';
import ApiService from './apiServices';
import spiner from './spiner';
import makePagination from './pagination';




export let apiService = new ApiService();
const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit',getArticlesByQuery);




renderTrendMovies();

  
function getArticlesByQuery(event) {
  // console.log(searchForm.elements.searchQuery.value);
  if (!event.target[0].value) {
     event.preventDefault();
    return renderTrendMovies();
  }
    
  event.preventDefault();
  apiService.page = 1;  
    apiService.searchQuery = event.target[0].value;  
    renderSearchMovies();
}
  
function showError() {    
  searchForm.elements.searchQuery.value = '';
  spiner.spiner.close();
  return Notiflix.Notify.failure("Sorry, there no results found. Try searching for something else!");
}

export function renderSearchMovies() {  
  spiner.spiner.show();
   apiService
   .getSearchArticles()
     .then(renderData)
     .then(() => {
       makePagination(apiService.totalResults, apiService.page, 'query')
    spiner.spiner.close();
    window.scrollTo({ top: 0, behavior: 'smooth' });
     })
     .catch(err => {
       apiService.page = 1;
      renderTrendMovies();
     showError()
     console.log('error in function renderSearchMovies');
    });    
}

export function renderTrendMovies() {  
  spiner.spiner.show();
  apiService
  .getGenreTrendMovies()
  .then(renderData)
  .then(() => {
    makePagination(apiService.totalResults, apiService.page, 'trend')
    
    spiner.spiner.close();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  })
    
  .catch(err => {
    console.log('error in function renderTrendMovies');
  });    
}
