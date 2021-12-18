import { Toy } from "./toys";
import { myStorage } from "./defaultData";
import { renderData } from "./render";
import { searchToy } from "./search";
import { restoreSelection } from "./selection";

export function changeOrder() {
  const readedData = JSON.parse(myStorage.getItem("data")) as Toy[];
  const value = myStorage.getItem("order");
  document.querySelector(`[value=${value}]`).setAttribute("selected", "true");

  let sortedData;
  switch (value) {
    case "nameUp":
      sortedData = readedData.sort((a, b) => {
        return Number(a.name > b.name);
      });

      break;
    case "nameDown":
      sortedData = readedData.sort((a, b) => {
        return Number(a.name < b.name);
      });
      break;
    case "valueUp":
      sortedData = readedData.sort((a, b) => {
        return Number(Number(a.year) > Number(b.year));
      });
      break;
    case "valueDown":
      sortedData = readedData.sort((a, b) => {
        return Number(Number(a.year) < Number(b.year));
      });
      break;
    default:
      return (sortedData = readedData);
  }

  myStorage.setItem("data", JSON.stringify(sortedData));
}

const sortSelect = document.querySelector(".sort-select") as HTMLSelectElement;
sortSelect.addEventListener("change", () => {
  myStorage.setItem("order", sortSelect.value);
  changeOrder();
  if (myStorage.getItem("searchedData")) {
    searchToy();
  }
  renderData();
  restoreSelection();
});
