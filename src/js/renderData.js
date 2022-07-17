const gallery = document.querySelector('.cards');

let date;

export default function renderData(data) { 
   document.querySelector('#pagination').classList.remove('visually-hidden'); 
  gallery.innerHTML = '';
  return data.forEach(function (element) {
    if (!element.release_date) {
      date = 'n/a';
    } else {
      
      date = element.release_date.split('-')[0]
      
    }
    let genreStr = "";
    let str = [];
    if (element.genres.length === 0) {
      let item = `<li class="movie_card">
        <img src="https://image.tmdb.org/t/p/w500${element.poster_path}" onerror="this.onerror=null;this.src='https://dummyimage.com/600x400/000/fff&text=Filmoteka';" alt="${element.title}" loading="lazy" data-id = ${element.id} class="list__img"/>
        
        <p class="info_title">${element.original_title}
          <span class="info_genre"> ${date}</span> 
          </p> 
        
      </li>`;
  gallery.insertAdjacentHTML("beforeend", item);
    } else {
      element.genres.forEach((genre) => {
        
        str.push(genre.name);
        // console.log(genre.name);
      })
      
      if (element.genres.length > 2) {
        
          let genrList = element.genres[0].name + ',  '+ element.genres[1].name ;
          genreStr = genrList + ', Others';
        
      } else {      
      genreStr = str.join(', ');    
      }
      // console.log(str.join(', '));
      
 let item = `<li class="movie_card">
        <img src="https://image.tmdb.org/t/p/w500${element.poster_path}" onerror="this.onerror=null;this.src='https://dummyimage.com/600x400/000/fff&text=Filmoteka';" alt="${element.title}" loading="lazy" data-id = ${element.id} class="list__img"/>
        
        <p class="info_title">${element.original_title}
          <span class="info_genre">${genreStr} | ${date}</span> 
          </p> 
        
      </li>`;
  gallery.insertAdjacentHTML("beforeend", item);
    }
   
      
  });
};
