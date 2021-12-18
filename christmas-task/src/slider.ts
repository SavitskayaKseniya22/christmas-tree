import * as noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";
import { filterAndRender } from "./render";
import { myStorage } from "./defaultData";

export const sliderAmount = document.getElementById("amount") as noUiSlider.target;

noUiSlider.create(sliderAmount, {
  start: restoreSliderPosAmount(),
  step: 1,
  behaviour: "drag",
  connect: true,
  tooltips: true,
  range: {
    min: 1,
    max: 12,
  },
});
export const sliderYear = document.getElementById("year-of-manufacture") as noUiSlider.target;
noUiSlider.create(sliderYear, {
  start: restoreSliderPosYear(),
  step: 20,
  behaviour: "drag",
  connect: true,
  tooltips: true,
  range: {
    min: 1940,
    max: 2020,
  },
});

sliderYear.noUiSlider.on("change", function () {
  const sliderYearValues = sliderYear.noUiSlider.get() as string[];
  const filters = JSON.parse(myStorage.getItem("filters"));
  filters.year.min = Number(sliderYearValues[0].slice(0, -3));
  filters.year.max = Number(sliderYearValues[1].slice(0, -3));
  myStorage.setItem("filters", JSON.stringify(filters));
  filterAndRender();
});

sliderAmount.noUiSlider.on("change", function () {
  const sliderAmountValues = sliderAmount.noUiSlider.get() as string[];
  const filters = JSON.parse(myStorage.getItem("filters"));
  filters.amount.min = Number(sliderAmountValues[0].slice(0, -3));
  filters.amount.max = Number(sliderAmountValues[1].slice(0, -3));
  myStorage.setItem("filters", JSON.stringify(filters));
  filterAndRender();
});

function restoreSliderPosYear() {
  if (!myStorage.getItem("filters")) {
    return [1940, 2020];
  } else {
    const filters = JSON.parse(myStorage.getItem("filters"));
    const sliderYearStart = [filters.year.min, filters.year.max];
    return sliderYearStart;
  }
}
function restoreSliderPosAmount() {
  if (!myStorage.getItem("filters")) {
    return [1, 12];
  } else {
    const filters = JSON.parse(myStorage.getItem("filters"));
    const sliderAmountStart = [filters.amount.min, filters.amount.max];
    return sliderAmountStart;
  }
}
