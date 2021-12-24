import { storage, filtersSource, setDefaultSettings } from "./defaultData";
import { filterAndRender } from "./render";
import { sliderAmount, sliderYear } from "./slider";
import { clearSearch } from "./search";

const resetFilter = document.querySelector(".reset-filter");
//сброс только фильтров
resetFilter.addEventListener("click", function () {
  storage.setItem("filters", JSON.stringify(filtersSource));
  filterAndRender();
  setDefaultRange();
});
//сброс фильтров, сортировки, поиска, избранного
const resetSettings = document.querySelector(".reset-storage");
resetSettings.addEventListener("click", function () {
  storage.clear();
  clearSearch();
  setDefaultSettings();
  setDefaultRange();
});

export function setDefaultRange() {
  sliderYear.noUiSlider.set([1940, 2020]);
  sliderAmount.noUiSlider.set([1, 12]);
}
