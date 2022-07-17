import '@splidejs/splide/dist/css/splide.min.css';
import Splide from '@splidejs/splide';
import ApiService from './apiServices';


const apiService = new ApiService();
const options = {
    type: 'loop',
    padding: 10,
    perPage: 8,
    pagination: false,
    start: 0,
    perMove: 2,
    autoplay: true,
    interval: 2000,
    pauseOnHover: true,
    pauseOnFocus: true,
    breakpoints: {
        1023: {
            perPage: 4,
            perMove: 1,
        },
        767: {
            perPage: 2,
           perMove: 1, 
        }
    }

}    
const slider = new Splide('.splide', options);

apiService.fetchTrendMovies().then(data => {
    slider.add(markup(data));     
})

document.addEventListener( 'DOMContentLoaded', function () {
    slider.mount();
} );

function sliderTpl({poster_path, original_title, id}) {
    return `<li class="splide__slide slider-card">
    <img class="slider-img" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${original_title}" data-id="${id}"/>
    </li>`
}

function markup(data) {    
    return data.map(sliderTpl);    
}






