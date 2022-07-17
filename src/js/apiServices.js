 const BASE_URL = `https://api.themoviedb.org/3`;
const KEY = `f83ab619d56ba761ff69bc866a8288d9`;
export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalResults ;
  }
  fetchTrendMovies() {
    const url = `${BASE_URL}/trending/movie/week?api_key=${KEY}&language=en-US&page=${this.page}&include_adult=false`;
    return fetch(url)
      .then(response => {        
       return  response.json()
      })
      .then(data => {
        this.totalResults = data.total_results;        
        return data;
      })
      .then(({results }) => {       
        return results;
      });
  }
  fetchSearchArticles() {   
    const url = `${BASE_URL}/search/movie?api_key=${KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}&include_adult=false`;
    return fetch(url)
      .then(response => {       
        return response.json()
      })
      .then(data => {        
        if (!data.total_results) {           
          throw new Error(response.statusText);
        };
        this.totalResults = data.total_results;       
        return data;
      })
      .then(({ results }) => {
        return results;
      });
  }
  fetchMovieById(id) {
    const url = `${BASE_URL}/movie/${id}/videos?api_key=${KEY}&language=en-US`
     return fetch(url)
       .then((response) => {
         return response.json()
       })
       
  }

  fetchGenres() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${KEY}&language=en-US&page=${this.page}`;     
    return fetch(url)
      .then(response => response.json())
      .then( results  => {
        return results.genres;
      });
  }
 getGenreTrendMovies() {
    return this.fetchTrendMovies().then(data =>{return this.formatGenreDate(data)});
  }

  getSearchArticles() {
    return this.fetchSearchArticles().then(data =>{return this.formatGenreDate(data)});
  }

 
  formatGenreDate(data){    
    return this.fetchGenres().then(genresList => {       
        return data.map(movie => (
          
          {
          ...movie,
          // release_date: movie.release_date
          //   ? movie.release_date.split('-')[0]
          //   : 'n/a',
          genres: movie.genre_ids
            .map(id => genresList.filter(el => el.id === id))
            .flat(),
        }));
      });
  }

}