import { myStorage, filtersSource } from "./defaultData";
import { filterAndRender } from "./render";
import { sliderAmount, sliderYear } from "./slider";
const resetFilter = document.querySelector(".reset-filter");
resetFilter.addEventListener("click", function () {
  myStorage.setItem("filters", JSON.stringify(filtersSource));
  filterAndRender();
  sliderYear.noUiSlider.set([1940, 2020]);
  sliderAmount.noUiSlider.set([1, 12]);
});
