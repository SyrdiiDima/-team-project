import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import * as renderFilms from './header'
import * as myRender from './renderTrendMovies'


export default function makePagination(total, page, search,array) {
  const options = {
  totalItems: total,
  itemsPerPage: 20,
  visiblePages: 7,
  page: page,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}" >' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>'
  }
  
  };
  
  if (window.innerWidth < 767) {
  options.visiblePages = 4;
}


const pagination = new Pagination('pagination', options);  
  pagination.on('afterMove', (event) => {  
  myRender.apiService.page = event.page;
  if (search === 'trend') {    
    myRender.renderTrendMovies(); 
  } if(search === 'query') {    
    myRender.renderSearchMovies();
    } if(search==='myLibrary') {
      let page = event.page;
      let onPage = 20;
      let start = (page - 1) * onPage;
      let end = start + onPage;
      let cards = array.slice(start, end);
      renderFilms.renderDataByArray(cards);
    }   
});

}

