import { changeOrder } from "./order";
import { restoreSelection } from "./selection";
import { Toy, Card } from "./toyCard";
import { searchToy } from "./search";
import { mainContainer, myStorage } from "./defaultData";
import { filterAll } from "./filter";

export function renderData() {
  mainContainer.innerHTML = "";

  if (getData().length > 0) {
    getData().forEach((element) => (mainContainer.innerHTML += new Card(element).renderHTML()));
  } else {
    const notice = document.createElement("span");
    notice.textContent = "Извините, совпадений не обнаружено";
    notice.classList.add("search-warning");
    mainContainer.append(notice);
  }
}
//выбрать дату на основе того, был ли поиск или нет
export function getData() {
  let readedData: Toy[];
  if (!myStorage.getItem("searchedData")) {
    readedData = JSON.parse(myStorage.getItem("data"));
  } else {
    readedData = JSON.parse(myStorage.getItem("searchedData"));
  }
  return readedData;
}

export function filterAndRender() {
  filterAll();
  changeOrder();
  if (myStorage.getItem("searchedData")) {
    searchToy();
  }
  renderData();
  restoreSelection();
}
