import { Card } from "./toys";
import { restoreSelection } from "./selection";
const clearSearch = document.querySelector(".clear-search") as HTMLButtonElement;
const searchInput = document.querySelector(".search-input") as HTMLInputElement;
const searchWarning = document.querySelector(".search-warning") as HTMLSpanElement;
const mainContainer = document.querySelector(".toys-container") as HTMLElement;

import data from "./data";

function searchToy() {
  mainContainer.innerHTML = "";
  for (const item of data) {
    if (item.name.toLowerCase().includes(searchInput.value.toLowerCase())) {
      mainContainer.innerHTML += new Card(item).renderHTML();
    }
  }

  mainContainer.innerHTML === ""
    ? (searchWarning.textContent = "Извините, совпадений не обнаружено")
    : (searchWarning.textContent = "");
}

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  searchWarning.textContent = "";
  searchToy();
  restoreSelection();
});

searchInput.addEventListener("input", () => {
  searchToy();
  restoreSelection();
});
