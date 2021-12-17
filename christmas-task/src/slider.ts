import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";

const sliderAmount = document.getElementById("amount");

noUiSlider.create(sliderAmount, {
  start: [1, 12],
  step: 1,
  behaviour: "drag",
  connect: true,
  tooltips: true,
  range: {
    min: 1,
    max: 12,
  },
});
const sliderYear = document.getElementById("year-of-manufacture");
noUiSlider.create(sliderYear, {
  start: [1940, 2020],
  step: 20,
  behaviour: "drag",
  connect: true,
  tooltips: true,
  range: {
    min: 1940,
    max: 2020,
  },
});
