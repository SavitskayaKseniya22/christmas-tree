import { myStorage, filtersSource, setDefaultSettings } from "./defaultData";
import { filterAndRender } from "./render";
import { sliderAmount, sliderYear } from "./slider";
import { clearSearch } from "./search";
const resetFilter = document.querySelector(".reset-filter");
resetFilter.addEventListener("click", function () {
  myStorage.setItem("filters", JSON.stringify(filtersSource));
  filterAndRender();
  setDefaultRange();
});

const resetSettings = document.querySelector(".reset-storage");
resetSettings.addEventListener("click", function () {
  myStorage.clear();
  clearSearch();
  setDefaultSettings();
  setDefaultRange();
});

function setDefaultRange() {
  sliderYear.noUiSlider.set([1940, 2020]);
  sliderAmount.noUiSlider.set([1, 12]);
}
