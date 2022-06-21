import { addAnimeToDB, getStoredAnimes } from "./db.js";

const contentGrid = document.querySelector("#anime-grid");

function handleSaveItem() {
  const watchedBtns = document.querySelectorAll("#watched-button");
  watchedBtns.forEach((button) => {
    const animeId = button.getAttribute("data-anime-id");
    const animeItem = document.querySelector(`#anime-item-${animeId}`);
    const animeTitle = animeItem.querySelector("#anime-item-title").innerText;
    const rating = animeItem
      .querySelector("#anime-item-rating")
      .innerText.split("Rating: ")[1];
    button.addEventListener("click", function () {
      addAnimeToDB({ mal_id: animeId, title: animeTitle, rating: rating });
      contentGrid.removeChild(animeItem);
    });
  });
}

async function removeSavedItems() {
  const storedAnimes = await getStoredAnimes();
  const childrenNodes = [...contentGrid.children];

  const savedAnimes = childrenNodes.filter((presentItem) => {
    return storedAnimes.find((storedItem) => {
      const presentItemTitle =
        presentItem.querySelector("#anime-item-title").innerText;
      return presentItemTitle === storedItem.title;
    });
  });

  savedAnimes.forEach((anime) => {
    contentGrid.removeChild(anime);
  });
}

async function showSavedItems() {
  const storedAnimes = await getStoredAnimes();
  const childrenNodes = [...contentGrid.children];

  const notSavedAnimes = childrenNodes.filter((presentItem) => {
    return !storedAnimes.find((storedItem) => {
      const presentItemTitle =
        presentItem.querySelector("#anime-item-title").innerText;
      return presentItemTitle === storedItem.title;
    });
  });

  notSavedAnimes.forEach((anime) => {
    contentGrid.removeChild(anime);
  });
}

function renderAnimes(animes) {
  const contentGrid = document.querySelector("#anime-grid");
  const children = animes
    .map((anime, key) => {
      const animeItem = `
        <div class="anime-item" id="anime-item-${anime.mal_id}">
            <img class="anime-item__image" src="
            ${anime.images.webp.large_image_url}" alt="anime-title" />
            <div class="anime-item__content" id="anime-item-">
                <a class="anime-item__content__title" href="${
                  anime.trailer.url
                }" target="_blank" rel="noopener" id="anime-item-title">
                ${anime.title}
                </a>
                <p id="anime-item-desc">${anime.synopsis.substr(0, 100)}..</p>
                <p id="anime-item-rating" data->Rating: ${anime.rating}</p>
                <ul class="anime-item__content__genres">${anime.genres
                  .map((genre) => `<li>${genre.name}</li>`)
                  .join("")}</ul>
                <button id="watched-button" data-anime-id="${
                  anime.mal_id
                }" data-type="filled">Watched</button>
            </div>
        </div>
        `;
      return animeItem;
    })
    .join("");
  contentGrid.innerHTML = children;
  handleSaveItem();
}

export { handleSaveItem, removeSavedItems, showSavedItems, renderAnimes };
