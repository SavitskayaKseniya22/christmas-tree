import * as noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";
import { filterAndRender } from "./render";
import { Ifilters, myStorage } from "./defaultData";

export const sliderAmount = document.getElementById("amount") as noUiSlider.target;

noUiSlider.create(sliderAmount, {
  start: restoreSliderPosAmount(),
  step: 1,
  behaviour: "drag",
  connect: true,
  tooltips: true,
  format: {
    to: function (value) {
      return parseInt(String(value));
    },
    from: function (value) {
      return Number(value);
    },
  },
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
  format: {
    to: function (value) {
      return parseInt(String(value));
    },
    from: function (value) {
      return Number(value);
    },
  },
  range: {
    min: 1940,
    max: 2020,
  },
});

sliderYear.noUiSlider.on("change", function () {
  const sliderYearValues = sliderYear.noUiSlider.get() as number[];
  const filters = JSON.parse(myStorage.getItem("filters")) as Ifilters;
  filters.year.min = sliderYearValues[0];
  filters.year.max = sliderYearValues[1];
  myStorage.setItem("filters", JSON.stringify(filters));
  filterAndRender();
});

sliderAmount.noUiSlider.on("change", function () {
  const sliderAmountValues = sliderAmount.noUiSlider.get() as number[];
  const filters = JSON.parse(myStorage.getItem("filters")) as Ifilters;
  filters.count.min = sliderAmountValues[0];
  filters.count.max = sliderAmountValues[1];
  myStorage.setItem("filters", JSON.stringify(filters));
  filterAndRender();
});

function restoreSliderPosYear() {
  if (!myStorage.getItem("filters")) {
    return [1940, 2020];
  } else {
    const filters = JSON.parse(myStorage.getItem("filters")) as Ifilters;
    const sliderYearStart = [filters.year.min, filters.year.max];
    return sliderYearStart;
  }
}
function restoreSliderPosAmount() {
  if (!myStorage.getItem("filters")) {
    return [1, 12];
  } else {
    const filters = JSON.parse(myStorage.getItem("filters")) as Ifilters;
    const sliderAmountStart = [filters.count.min, filters.count.max];
    return sliderAmountStart;
  }
}
