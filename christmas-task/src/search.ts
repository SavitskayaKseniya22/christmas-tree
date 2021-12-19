import { restoreSelection } from "./selection";
import { renderData } from "./render";
import { myStorage } from "./defaultData";
const clearSearchButton = document.querySelector(".clear-search") as HTMLButtonElement;
const searchInput = document.querySelector(".search-input") as HTMLInputElement;
const searchWarning = document.querySelector(".search-warning") as HTMLSpanElement;

export function searchToy() {
  const readedData = JSON.parse(myStorage.getItem("data"));
  const searchedData = [];

  for (const toy of readedData) {
    if (toy.name.toLowerCase().includes(searchInput.value.toLowerCase())) {
      searchedData.push(toy);
    }
  }
  myStorage.setItem("searchedData", JSON.stringify(searchedData));

  searchedData.length === 0
    ? (searchWarning.textContent = "Извините, совпадений не обнаружено")
    : (searchWarning.textContent = "");
}

clearSearchButton.addEventListener("click", () => {
  clearSearch();
  renderData();
  restoreSelection();
});

searchInput.addEventListener("input", () => {
  if (searchInput.value.length === 0) {
    clearSearch();
  } else {
    searchToy();
  }
  renderData();
  restoreSelection();
});

export function clearSearch() {
  searchInput.value = "";
  searchWarning.textContent = "";
  myStorage.removeItem("searchedData");
}
