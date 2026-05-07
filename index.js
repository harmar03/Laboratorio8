import { getShowData, getEpisodeList, searchShows } from "./services/tvmaze.js";
import { createHeaderHTML } from "./components/header.js";
import { createSeasonHTML } from "./components/season.js";
import { createSearchResultHTML } from "./components/search.js";

const ID = "169";

const $header = document.querySelector("header");
const $episodes = document.querySelector(".episodes");
const $searchInput = document.querySelector("#search-input");
const $searchResults = document.querySelector(".search-results");

const loadShow = async (id) => {
  const show = await getShowData(id);
  const seasons = await getEpisodeList(id);

  $header.setHTMLUnsafe(createHeaderHTML(show));

  const list = Object.values(seasons).map((season, index) => createSeasonHTML(season, index + 1));
  $episodes.setHTMLUnsafe(list.join(""));
};

const hideResults = () => $searchResults.classList.add("hidden");
const showResults = () => $searchResults.classList.remove("hidden");

let debounceTimer;
$searchInput.addEventListener("input", (e) => {
  clearTimeout(debounceTimer);
  const query = e.target.value.trim();

  if (!query) { hideResults(); return; }

  debounceTimer = setTimeout(async () => {
    const results = await searchShows(query);
    $searchResults.setHTMLUnsafe(results.map(createSearchResultHTML).join(""));
    showResults();
  }, 300);
});

$searchResults.addEventListener("click", (e) => {
  const item = e.target.closest(".search-result");
  if (!item) return;

  loadShow(item.dataset.id);
  $searchInput.value = item.querySelector("span").textContent;
  hideResults();
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-box")) hideResults();
});

loadShow(ID);
