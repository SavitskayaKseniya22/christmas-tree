import { changeOrder } from "./order";
import { restoreSelection } from "./selection";
import { Toy, Card } from "./toys";
import { searchToy } from "./search";
import { mainContainer, myStorage } from "./defaultData";
import { filterAll } from "./filter";

export function renderData() {
  mainContainer.innerHTML = "";
  getData().forEach((element) => (mainContainer.innerHTML += new Card(element).renderHTML()));
}

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
