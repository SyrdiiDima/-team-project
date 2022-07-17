import 'basiclightbox/src/styles/main.scss';
import * as basicLightbox from 'basiclightbox';
import spiner from './spiner';
import ApiService from './apiServices';

const apiService = new ApiService;

const slide = document.querySelector('.slider-container');
let trailer;
slide.addEventListener('click', onSlideClick);

function onSlideClick(e) {
    e.preventDefault();
    const id = e.target.dataset.id;    
    spiner.spiner.show();
    apiService.fetchMovieById(id)
    .then((r) => {            
        const key = r.results[0].key;            
        trailer = basicLightbox.create(`
            <iframe width="560" height="315" src='https://www.youtube.com/embed/${key}'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
        trailer.show();
        closeBtnTrailer(trailer);
      spiner.spiner.close();
      window.addEventListener('keydown', onEscKeyPress);
      });
};
 function closeBtnTrailer(trailer) {
    const modalBox = document.querySelector('.basicLightbox--iframe');
    modalBox.insertAdjacentHTML(
      'afterbegin',
      `<button
        type="button"
        class="lightbox__button"
        data-action="close-lightbox"
        ></button>
    `,
    );
    const modalCloseBtn = document.querySelector(
      '[data-action="close-lightbox"]',
    );
    modalCloseBtn.addEventListener('click', () => trailer.close());
}
  
function onEscKeyPress(event) {  
  if (event.code === 'Escape') {
    trailer.close();    
  }
}