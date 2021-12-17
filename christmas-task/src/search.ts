import { restoreSelection } from "./selection";
import { renderData } from "./filter-form";
import { myStorage } from "./index";
const clearSearch = document.querySelector(".clear-search") as HTMLButtonElement;
const searchInput = document.querySelector(".search-input") as HTMLInputElement;
const searchWarning = document.querySelector(".search-warning") as HTMLSpanElement;

export function searchToy() {
  const readedData = JSON.parse(myStorage.getItem("data"));
  const searchedData = [];

  for (const item of readedData) {
    if (item.name.toLowerCase().includes(searchInput.value.toLowerCase())) {
      searchedData.push(item);
    }
  }
  myStorage.setItem("searchedData", JSON.stringify(searchedData));

  searchedData.length === 0
    ? (searchWarning.textContent = "Извините, совпадений не обнаружено")
    : (searchWarning.textContent = "");
}

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  searchWarning.textContent = "";
  myStorage.removeItem("searchedData");
  renderData();
  restoreSelection();
});

searchInput.addEventListener("input", () => {
  if (searchInput.value.length === 0) {
    myStorage.removeItem("searchedData");
  } else {
    searchToy();
  }
  renderData();
  restoreSelection();
});
