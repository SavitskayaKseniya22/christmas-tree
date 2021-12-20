import { myStorage, filtersSource, setDefaultSettings, uncheck } from "./defaultData";
import { filterAndRender } from "./render";
import { sliderAmount, sliderYear } from "./slider";
import { clearSearch } from "./search";
const resetFilter = document.querySelector(".reset-filter");
//сброс только фильтров
resetFilter.addEventListener("click", function () {
  myStorage.setItem("filters", JSON.stringify(filtersSource));
  filterAndRender();
  uncheck();
  setDefaultRange();
});
//сброс фильтров, сортировки, поиска, избранного
const resetSettings = document.querySelector(".reset-storage");
resetSettings.addEventListener("click", function () {
  myStorage.clear();
  clearSearch();
  setDefaultSettings();
  setDefaultRange();
});

export function setDefaultRange() {
  sliderYear.noUiSlider.set([1940, 2020]);
  sliderAmount.noUiSlider.set([1, 12]);
}
