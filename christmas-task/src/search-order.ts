import { Toy } from "./toys";
import { renderData } from "./filter-form";
const sortSelect = document.querySelector(".sort-select") as HTMLSelectElement;
const myStorage = window.localStorage;

export function changeOrder() {
  const readedData = JSON.parse(myStorage.getItem("data")) as Toy[];
  if (!myStorage.getItem("order")) {
    myStorage.setItem("order", "nameUp");
  }
  const value = myStorage.getItem("order");
  const selectedOption = document.querySelector(`[value=${value}]`);
  selectedOption.setAttribute("selected", "true");

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
      return sortedData;
  }

  myStorage.setItem("data", JSON.stringify(sortedData));
  return sortedData;
}

sortSelect.addEventListener("change", () => {
  myStorage.setItem("order", sortSelect.value);
  changeOrder();
  renderData();
});
