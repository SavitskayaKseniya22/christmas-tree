import { Toy } from "./toys";
import { myStorage } from "./defaultData";
import { renderData } from "./render";
import { searchToy } from "./search";
import { restoreSelection } from "./selection";

export function changeOrder() {
  const readedData = JSON.parse(myStorage.getItem("data")) as Toy[];
  const value = myStorage.getItem("order");
  document
    .querySelectorAll("#sort-select option")
    .forEach((element) => ((element as HTMLOptionElement).selected = false));
  (document.querySelector(`[value=${value}]`) as HTMLOptionElement).selected = true;

  let sortedData;
  switch (value) {
    case "nameUp":
      sortedData = readedData.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      break;
    case "nameDown":
      sortedData = readedData.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
      break;
    case "valueUp":
      sortedData = readedData.sort((a, b) => {
        return a.year.localeCompare(b.year);
      });
      break;
    case "valueDown":
      sortedData = readedData.sort((a, b) => {
        return b.year.localeCompare(a.year);
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