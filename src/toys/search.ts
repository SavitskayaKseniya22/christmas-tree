import { restoreSelection } from "./selection";
import { renderData } from "./render";
import { storage } from "./defaultData";

const clearSearchButton = document.querySelector(".clear-search") as HTMLButtonElement;
const searchInput = document.querySelector(".search-input") as HTMLInputElement;

export function searchToy() {
  const readedData = JSON.parse(storage.getItem("data"));
  const searchedData = [];

  for (const toy of readedData) {
    if (toy.name.toLowerCase().includes(searchInput.value.toLowerCase())) {
      searchedData.push(toy);
    }
  }
  storage.setItem("searchedData", JSON.stringify(searchedData));
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

  storage.removeItem("searchedData");
}
