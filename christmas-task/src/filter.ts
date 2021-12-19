import data from "./data";
import { mainContainer, Ifilters, myStorage, Ifilter } from "./defaultData";
import { filterAndRender } from "./render";

export function filterAll() {
  let filteredData = data.slice();
  const filters = JSON.parse(myStorage.getItem("filters")) as Ifilters;
  for (const key of Object.keys(filters)) {
    let result = [];
    let isChanged = false;
    if (key === "shape" || key === "color" || key === "size") {
      for (const option of Object.keys(filters[key].options)) {
        if ((filters[key] as Ifilter).options[option].value) {
          isChanged = true;
          result.push(filteredData.filter((item) => item[key] === (filters[key] as Ifilter).options[option].name));
          (document.querySelector(`#${option}`) as HTMLInputElement).checked = true;
        }
      }
    } else if (key === "favorite") {
      if (filters.favorite) {
        isChanged = true;
        result.push(filteredData.filter((item) => item.favorite === filters.favorite));
        (document.querySelector("#favorite") as HTMLInputElement).checked = true;
      }
    } else if (key === "count" || key === "year") {
      isChanged = true;
      result.push(
        filteredData.filter((item) => Number(item[key]) >= filters[key].min && Number(item[key]) <= filters[key].max),
      );
    }
    result = result.flat();
    if (result.length !== 0) {
      filteredData = result;
    }
    if (result.length === 0 && isChanged) {
      mainContainer.innerHTML = "";
      filteredData = [];
    }
  }
  myStorage.setItem("data", JSON.stringify(filteredData));
}

document.addEventListener("click", (e: Event) => {
  const targetElement = e.target as HTMLElement;
  if (targetElement.closest(".inner-section label")) {
    const filters = JSON.parse(myStorage.getItem("filters")) as Ifilters;
    if (targetElement.closest(".shape-label")) {
      const attrName = targetElement.closest(".shape-label").getAttribute("for");
      filters.shape.options[attrName].value = !filters.shape.options[attrName].value;
    } else if (targetElement.closest(".size-label")) {
      const attrName = targetElement.closest(".size-label").getAttribute("for");
      filters.size.options[attrName].value = !filters.size.options[attrName].value;
    } else if (targetElement.closest(".color-label")) {
      const attrName = targetElement.closest(".color-label").getAttribute("for");
      filters.color.options[attrName].value = !filters.color.options[attrName].value;
    } else if (targetElement.closest(".favorite-label")) {
      filters.favorite = !filters.favorite;
    }
    myStorage.setItem("filters", JSON.stringify(filters));
    filterAndRender();
  }
});
