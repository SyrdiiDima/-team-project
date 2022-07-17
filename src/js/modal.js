import { modalDataTeam } from './dataTeam';
import iconUrl from '/src/images/sprite.svg';

// Основні змінні

const open = document.querySelector('[data-action="open-modal"]');
const close = document.querySelector('[data-action="close-modal"]');
const backdrop = document.querySelector('.js-backdrop'),
teamCard = document.querySelector('.card-conteiner');




// рендер розмітки 

const createCard = () => {
   const cordEk = modalDataTeam.map(({url, href, nameEmp, position, laptop, Phone,}) => `
   <li class="card">
   <picture>
   <source media="(max-width: 755px)" srcset="${Phone}">
   <source media="(min-width: 756px)" srcset="${laptop}">
<img loading="lazy" class="modal-img" src="${url}" alt="${nameEmp}">
</picture>
   <a href="${href}" target="_blank"><svg class="card-icon">
      <use href="${iconUrl}#github"></use></svg></a>
   <p class="card-name">${nameEmp}</p>
   <p class="card-position">${position}</p>
</li>`).join('');

teamCard.insertAdjacentHTML('afterbegin', cordEk); 

};

createCard();

// Слухачі   

open.addEventListener('click', toggleModal);
close.addEventListener('click', toggleModal);
backdrop.addEventListener('click', onBackdrop);

// Функція відкриття модалки


function toggleModal() {
   window.addEventListener('keydown', onEsc);
   document.body.classList.toggle('show-modal');
}

// Функція закриття модалки по кліку в Backdrop 
function onBackdrop(e) {
   if(e.currentTarget === e.target) {
      toggleModal(); 
   }
}

// Функція закриття модалки по Escape  
function onEsc(e) {
const escKey = 'Escape',
isEscKey = e.code === escKey;
if(isEscKey) {
   toggleModal();
   window.removeEventListener('keydown', onEsc); 
   
}
}
