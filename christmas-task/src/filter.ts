import data from "./data";
import { mainContainer, Ifilters, myStorage } from "./defaultData";
import { filterAndRender } from "./render";

export function filterAll() {
  let filteredData = data.slice();
  const filters = JSON.parse(myStorage.getItem("filters")) as Ifilters;
  // по цвету
  let result = [];
  let isChanged = false;
  for (const option of Object.keys(filters.color.options)) {
    if (filters.color.options[option].value) {
      isChanged = true;
      result.push(filteredData.filter((item) => item.color === filters.color.options[option].name));
    }
  }
  result = result.flat();

  if (result.length !== 0) {
    filteredData = result;
  }
  if (result.length === 0 && isChanged) {
    mainContainer.innerHTML = "";
    filteredData = [];
  }
  // по форме
  result = [];
  isChanged = false;
  for (const option of Object.keys(filters.shape.options)) {
    if (filters.shape.options[option].value) {
      isChanged = true;
      result.push(filteredData.filter((item) => item.shape === filters.shape.options[option].name));
    }
  }
  result = result.flat();

  if (result.length !== 0) {
    filteredData = result;
  }
  if (result.length === 0 && isChanged) {
    mainContainer.innerHTML = "";
    filteredData = [];
  }
  // по размеру
  result = [];
  isChanged = false;
  for (const option of Object.keys(filters.size.options)) {
    if (filters.size.options[option].value) {
      isChanged = true;
      result.push(filteredData.filter((item) => item.size === filters.size.options[option].name));
    }
  }
  result = result.flat();
  if (result.length !== 0) {
    filteredData = result;
  }
  if (result.length === 0 && isChanged) {
    mainContainer.innerHTML = "";
    filteredData = [];
  }
  //по кол-ву

  result = [];
  isChanged = false;

  isChanged = true;
  result.push(
    filteredData.filter((item) => Number(item.count) >= filters.amount.min && Number(item.count) <= filters.amount.max),
  );

  result = result.flat();
  if (result.length !== 0) {
    filteredData = result;
  }
  if (result.length === 0 && isChanged) {
    mainContainer.innerHTML = "";
    filteredData = [];
  }
  //по году

  result = [];
  isChanged = false;

  isChanged = true;
  result.push(
    filteredData.filter((item) => Number(item.year) >= filters.year.min && Number(item.year) <= filters.year.max),
  );

  result = result.flat();
  if (result.length !== 0) {
    filteredData = result;
  }
  if (result.length === 0 && isChanged) {
    mainContainer.innerHTML = "";
    filteredData = [];
  }

  //любимые

  result = [];
  isChanged = false;

  if (filters.favorite.options) {
    isChanged = true;
    result.push(filteredData.filter((item) => item.favorite === filters.favorite.options));
  }

  result = result.flat();
  if (result.length !== 0) {
    filteredData = result;
  }
  if (result.length === 0 && isChanged) {
    mainContainer.innerHTML = "";
    filteredData = [];
  }
  myStorage.setItem("data", JSON.stringify(filteredData));
}

document.addEventListener("click", (e: Event) => {
  if ((e.target as HTMLElement).closest(".inner-section label")) {
    const filters = JSON.parse(myStorage.getItem("filters")) as Ifilters;
    if ((e.target as HTMLElement).closest(".shape-label")) {
      const attrName = (e.target as HTMLElement).closest(".shape-label").getAttribute("for");
      filters.shape.options[attrName].value = !filters.shape.options[attrName].value;
    } else if ((e.target as HTMLElement).closest(".size-label")) {
      const attrName = (e.target as HTMLElement).closest(".size-label").getAttribute("for");
      filters.size.options[attrName].value = !filters.size.options[attrName].value;
    } else if ((e.target as HTMLElement).closest(".color-label")) {
      const attrName = (e.target as HTMLElement).closest(".color-label").getAttribute("for");
      filters.color.options[attrName].value = !filters.color.options[attrName].value;
    } else if ((e.target as HTMLElement).closest(".favorite-label")) {
      filters.favorite.options = !filters.favorite.options;
      console.log(filters);
    }
    myStorage.setItem("filters", JSON.stringify(filters));
    filterAndRender();
  }
});
