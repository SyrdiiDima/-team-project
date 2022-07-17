import ApiService from './apiServices';
import * as basicLightbox from 'basiclightbox';
import LocalStorageAPI from './localStorageAPI';

let apiService = new ApiService();
const KEY = `f83ab619d56ba761ff69bc866a8288d9`;
let instance = '';

const a = document.querySelector('.cards');

a.addEventListener('click', onFilmClick);

function onFilmClick(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const filmId = event.target.dataset?.id;
  if (filmId) {
    fetchFilm(filmId);
  }
}

function fetchFilm(filmId) {
  fetch(
    `https://api.themoviedb.org/3/movie/${filmId}?api_key=${KEY}&language=en-US`
  )
    .then(response => response.json())
    .then(film => {
      let genreStr = '';
      let arrayNames = [];
      film.genres.forEach(function (genre) {
        arrayNames.push(genre.name);
        genreStr = arrayNames.join(', ');
      });

      instance = basicLightbox.create(`  
      <div class = "backdrop-modal "> 
          <div class="modal-card">  
            <div class="modal-film__img">  
              <img class = "image" src="https://image.tmdb.org/t/p/original${film.poster_path}" alt="${film.title}">  
            </div>  
            <div class="modal-film__info">  
              <h2 class="modal-film__title">${film.original_title}</h2>  
              <p class= "modal-film__votes modal-film__text"> Vote / Votes <span class="votes_average"> ${film.vote_average}</span>/<span class ="votes_count">${film.vote_count}</span> </p>  
              <p class= "modal-film__popularity modal-film__text">Popularity <span class="popularity"> ${film.popularity} </span></p>  
              <div class = "title-item">
              <p class= "modal-film__original-title modal-film__text">Original Title</p><p class="original_title">${film.original_title}</p>
              </div>
              <p class = "modal-film__genres modal-film__text">Genre <span class = "modal-film__genres-item">${genreStr} </span> </p> 
              <p class="modal-film__about"> ABOUT </p>  
              <p class="modal-film__description"> ${film.overview} </p>  
                <div class = "modal-film__buttons"> 
                  <ul class= "modal-film__list-button">  
                    <li>  
                    <button type="button" class = "btn_add__watched">Add to watched</button>  
                    </li>  
                    <li>  
                    <button type="button" class = "btn_add__queue">Add to queue</button>  
                    </li>  
                  </ul>  
                </div> 
          <button class="modal-film__close" data-action="close-modal"> 
          &#10005 
          </button> 
      </div>  
    </div>
    `);

      instance.show();

      const close = document.querySelector('.modal-film__close');
      window.addEventListener('keydown', onEscKeyPress);
      close.addEventListener('click', onCloseModal);

      //Робота з кнопками

      //Кнопки
      const addToWatchedBtn = document.querySelector('.btn_add__watched');
      const addToQueueBtn = document.querySelector('.btn_add__queue');

      checkFilmStatus(film);

      //Слухачі
      addToWatchedBtn.addEventListener('click', onWatchedBtnClick);
      addToQueueBtn.addEventListener('click', onQueueBtnClick);

      //Функція перевірки присутності фільму у локальному сховищі
      function checkFilmStatus(film) {
        const idValue = film.id;
        const watchedArr = LocalStorageAPI.getMovies('Watched');
        const queueArr = LocalStorageAPI.getMovies('Queue');

        if (watchedArr.includes(film.id)) {
          addToWatchedBtn.textContent = 'Remove from Watched';
          addToQueueBtn.disabled = true;

          addToQueueBtn.classList.add('btn_disabled');
          // // Інлайн-стилі для дизактивації кнопки
          // addToQueueBtn.style.backgroundColor = 'grey';
          // addToQueueBtn.style.pointerEvents = 'none';
        }

        if (queueArr.includes(film.id)) {
          addToQueueBtn.textContent = 'Remove from Queue';
          addToWatchedBtn.disabled = true;

          addToWatchedBtn.classList.add('btn_disabled');
          // // Інлайн-стилі для дизактивації кнопки
          // addToWatchedBtn.style.backgroundColor = 'grey';
          // addToWatchedBtn.style.pointerEvents = 'none';
        }
      }

      function onWatchedBtnClick(e) {
        const addContent = 'Add to watched';
        const removeContent = 'Remove from Watched';

        if (e.target.textContent === addContent) {
          LocalStorageAPI.setMovie('Watched', film.id);
          e.target.textContent = removeContent;
          addToQueueBtn.disabled = true;

          addToQueueBtn.classList.add('btn_disabled');
          // // Інлайн-стилі для дизактивації кнопки
          // addToQueueBtn.style.backgroundColor = 'grey';
          // addToQueueBtn.style.pointerEvents = 'none';
        } else {
          LocalStorageAPI.removeMovie('Watched', film.id);
          e.target.textContent = addContent;
          addToQueueBtn.disabled = false;

          addToQueueBtn.classList.remove('btn_disabled');
          // // Інлайн-стилі для активації кнопки
          // addToQueueBtn.style.backgroundColor = '#ffffff';
          // addToQueueBtn.style.pointerEvents = 'all';
        }

        //КОСТИЛЬ - якщо фільм видаляється з бібліотеки, коли користувач знаходиться у бібліотеці -
        // для нвого рендеру відбувається примусовий клік по кнопці вілповідної бібліотеки
        if (
          document.querySelector('.refs-library').classList.contains('active')
        ) {
          a.innerHTML = '';
          document.querySelector('#watchedLibr').click();
        }
      }

      function onQueueBtnClick(e) {
        const addContent = 'Add to queue';
        const removeContent = 'Remove from Queue';

        if (e.target.textContent === addContent) {
          LocalStorageAPI.setMovie('Queue', film.id);
          e.target.textContent = removeContent;
          addToWatchedBtn.disabled = true;

          addToWatchedBtn.classList.add('btn_disabled');
          // // Інлайн-стилі для дизактивації кнопки
          // addToWatchedBtn.style.backgroundColor = 'grey';
          // addToWatchedBtn.style.pointerEvents = 'none';
        } else {
          LocalStorageAPI.removeMovie('Queue', film.id);
          e.target.textContent = addContent;
          addToWatchedBtn.disabled = false;

          addToWatchedBtn.classList.remove('btn_disabled');
          // // Інлайн-стилі для активації кнопки
          // addToWatchedBtn.style.backgroundColor = '#ffffff';
          // addToWatchedBtn.style.pointerEvents = 'all';
        }

        //КОСТИЛЬ (див. вище)
        if (
          document.querySelector('.refs-library').classList.contains('active')
        ) {
          a.innerHTML = '';
          document.querySelector('#queueLibr').click();
        }
      }
    });
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  instance.close();
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
