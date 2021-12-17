import { Card } from "./toys";
import { restoreSelection } from "./selection";
import { renderData } from "./filter-form";
const clearSearch = document.querySelector(".clear-search") as HTMLButtonElement;
const searchInput = document.querySelector(".search-input") as HTMLInputElement;
const searchWarning = document.querySelector(".search-warning") as HTMLSpanElement;
const mainContainer = document.querySelector(".toys-container") as HTMLElement;

const myStorage = window.localStorage;

function searchToy() {
  const readedData = JSON.parse(myStorage.getItem("data"));
  const searchedData = [];
  if (searchInput.value.length === 0) {
    myStorage.removeItem("searchedData");
    renderData();
    restoreSelection();
  } else {
    mainContainer.innerHTML = "";
    for (const item of readedData) {
      if (item.name.toLowerCase().includes(searchInput.value.toLowerCase())) {
        searchedData.push(item);
        mainContainer.innerHTML += new Card(item).renderHTML();
      }
    }
    myStorage.setItem("searchedData", JSON.stringify(searchedData));
  }

  mainContainer.innerHTML === ""
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
  searchToy();
  restoreSelection();
});
