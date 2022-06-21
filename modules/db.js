/* Agregamos compatiblidad con varias navegadores */

const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

let request;

function loadDB() {
  /* Abrimos o creamos la base de datos. Si no la encuentra, la crea */
  request = indexedDB.open("GhibliDatabase", 1);

  request.onerror = function (event) {
    console.error("database error", event);
  };

  /* Se declara la estructura general de la BD */
  request.onupgradeneeded = function (event) {
    const db = request.result;
    const store = db.createObjectStore("movies", { keyPath: "mal_id" }); // Creamos un "store" con un atributo unico
    store.createIndex("title", ["title"], { unique: true }); // Propiedad de titulo, es único ya que no hay peliculas llamadas igual
    store.createIndex("description", ["description"], { unique: false }); // Propiedad de descripción
    store.createIndex("launch_year", ["launch_year"], { unique: false }); // Propiedad de año de lanzamiento
  };

  // Si todo sale bien, ejecutamos esta funcion

  return new Promise((resolve) => {
    request.onsuccess = function () {
      const db = request.result;
      resolve(db);
    };
  });
}

function addMovieToDB(movie) {
  const db = request.result;
  const transaction = db.transaction('movies', 'readwrite');
  const store = transaction.objectStore("movies");
  store.put({ mal_id: movie.mal_id, title: movie.title, description: movie.description, launch_year: movie.launch_year });
}

function getStoredMovies() {
  const db = request.result;
  const transaction = db.transaction("movies", "readwrite");
  const store = transaction.objectStore("movies");
  const queryAll = store.getAll();
  return new Promise((resolve) => {
    queryAll.onsuccess = function () {
      resolve(queryAll.result);
    };
  });
}

export { loadDB, addMovieToDB, getStoredMovies };
