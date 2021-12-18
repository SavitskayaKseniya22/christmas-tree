import { myStorage } from "./index";
import { filtersSource, filterAndRender } from "./filter-form";
import { sliderAmount, sliderYear } from "./slider";
const resetFilter = document.querySelector(".reset-filter");
resetFilter.addEventListener("click", function () {
  myStorage.setItem("filters", JSON.stringify(filtersSource));
  filterAndRender();
  sliderYear.noUiSlider.set([1940, 2020]);
  sliderAmount.noUiSlider.set([1, 12]);
});
