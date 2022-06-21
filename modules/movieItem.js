import { addMovieToDB, getStoredMovies } from "./db.js";

const contentGrid = document.querySelector("#movies-grid");

function handleSaveItem() {
  const watchedBtns = document.querySelectorAll("#watched-button");
  watchedBtns.forEach((button) => {
    const movieId = button.getAttribute('data-movie-id');
    const movieItem = document.querySelector(`#movie-item-${movieId}`);
    const movieTitle = movieItem.querySelector('#movie-item-title').innerHTML;
    const descriptionMovie = movieItem.querySelector('#movie-item-description').innerHTML;
    const launchYearMovie = movieItem.querySelector('#movie-item-launch-year').innerHTML;
    button.addEventListener('click', function () {
      addMovieToDB({
        mal_id: movieId,
        title: movieTitle,
        description: descriptionMovie,
        launch_year: launchYearMovie
      });
      contentGrid.removeChild(movieItem);
    });
  });
}

async function removeSavedItems() {
  const storedMovies = await getStoredMovies();
  const childrenNodes = [...contentGrid.children];

  const savedMovies = childrenNodes.filter((presentItem) => {
    return storedMovies.find((storedItem) => {
      const presentItemTitle =
        presentItem.querySelector("#movie-item-title").innerText;
      return presentItemTitle === storedItem.title;
    });
  });

  savedMovies.forEach((movie) => {
    contentGrid.removeChild(movie);
  });
}

async function showSavedItems() {
  const storedMovies = await getStoredMovies();
  const childrenNodes = [...contentGrid.children];

  const notSavedMovies = childrenNodes.filter((presentItem) => {
    return !storedMovies.find((storedItem) => {
      const presentItemTitle =
        presentItem.querySelector("#movie-item-title").innerText;
      return presentItemTitle === storedItem.title;
    });
  });

  notSavedMovies.forEach((movie) => {
    contentGrid.removeChild(movie);
  });
}

function renderMovies(movies) {
  const contentGrid = document.querySelector("#movies-grid");
  const children = movies
    .map((movie, key) => {
      const movieItem = `
        <div class="movie-item" id="movie-item-${movie.id}">
            <img class="movie-item__image" src="
            ${movie.image}" alt="movie-title" />
            <div class="movie-item__content" id="movie-item-">
                <a class="movie-item__content__title" href="${
                  movie.movie_banner
                }" target="_blank" rel="noopener" id="movie-item-title">${movie.title}</a>
                <p id="movie-item-description">${movie.description.substr(0, 100)}..</p>
                <p id="movie-item-launch-year" data->Launch Year: ${movie.release_date}</p>
                <button id="watched-button" data-movie-id="${
                  movie.id
                }" data-type="filled">Watched</button>
            </div>
        </div>
        `;
      return movieItem;
    })
    .join("");
  contentGrid.innerHTML = children;
  handleSaveItem();
}

export { handleSaveItem, removeSavedItems, showSavedItems, renderMovies };
