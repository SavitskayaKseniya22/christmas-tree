import { changeOrder } from "./order";
import { restoreSelection } from "./selection";
import { ToyCard } from "./toyCard";
import { Toy } from "./types";

import { searchToy } from "./search";
import { mainContainer, storage } from "./defaultData";
import { filterAll } from "./filter";

export function renderData() {
  mainContainer.innerHTML = "";

  if (getData().length > 0) {
    getData().forEach((element) => (mainContainer.innerHTML += new ToyCard(element).renderHTML()));
  } else {
    const notice = document.createElement("span");
    notice.textContent = "Извините, совпадений не обнаружено";
    notice.classList.add("search-warning");
    mainContainer.append(notice);
  }
}
//выбрать дату на основе того, был ли поиск или нет
export function getData() {
  return JSON.parse(storage.getItem("searchedData") || storage.getItem("data")) as Toy[];
}

export function filterAndRender() {
  filterAll();
  changeOrder();
  if (storage.getItem("searchedData")) {
    searchToy();
  }
  renderData();
  restoreSelection();
}
