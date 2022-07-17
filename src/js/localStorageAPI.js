const localStorageAPI = {
  // Отримання даних за ключем. Повертає дані, або null
  loadData(key) {
    const localStorageData = localStorage.getItem(key);
    return JSON.parse(localStorageData);
  },

  // Запис даних до сховища. Записує дані з ключем key
  saveData(key, value) {
    const dataToSave = JSON.stringify(value);
    localStorage.setItem(key, dataToSave);
  },

  // Отримання колекції фільмів. Повертає масив фільмів, або порожній масив з його попереднім записом до сховища
  getMovies(key) {
    const movies = this.loadData(key);
    if (!movies) {
      this.saveData(key, []);
      return [];
    } else {
      return movies;
    }
  },

  // Додавання фільмів до колекції. Додає новий елемент до поточної колекції фільмів у сховищі
  setMovie(key, value) {
    const currentCollection = this.getMovies(key);
    currentCollection.push(value);

    this.saveData(key, currentCollection);
  },

  removeMovie(key, value) {
    const currentCollection = this.getMovies(key);
    const indexToRemove = currentCollection.indexOf(value);

    if (indexToRemove >= 0) {
      currentCollection.splice(indexToRemove, 1);
      this.saveData(key, currentCollection);
    }
  },
};

export default localStorageAPI;
