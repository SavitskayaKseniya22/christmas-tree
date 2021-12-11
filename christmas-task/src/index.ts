import "./styles.scss";
import "./normalize.scss";
import data from "./data";
import printAllCards from "./toys";

const myStorage = window.localStorage;

const mainContainer = document.querySelector(".toys-container") as HTMLElement;
const selectionCount = document.querySelector(
  ".selection-count"
) as HTMLSpanElement;
const selectionRest = document.querySelector(
  ".selection-rest"
) as HTMLSpanElement;
const selectionWarning = document.querySelector(
  ".selection-warning"
) as HTMLSpanElement;

let selection: string[] = [];

printAllCards(data, mainContainer);

if (myStorage.getItem("selection")) {
  selection = JSON.parse(myStorage.getItem("selection") as string);
}
(selectionCount as HTMLSpanElement).innerHTML = String(selection.length);
(selectionRest as HTMLSpanElement).innerHTML = String(20 - selection.length);
if (selection.length === 20) {
  (selectionWarning as HTMLSpanElement).innerHTML =
    "Извините, все слоты заполнены";
}

// eslint-disable-next-line no-restricted-syntax
for (const elem of selection) {
  const item = document.querySelector(`[data-num="${elem}"]`) as HTMLElement;
  (item as HTMLElement).setAttribute("data-selection", "true");
  const img = (item as HTMLElement).querySelector(".star-image");
  (img as HTMLImageElement).classList.add("golden-star-image");
}

document.addEventListener("click", (e: Event): void => {
  if ((e.target as HTMLElement).className === "toy-item") {
    const img = (e.target as HTMLElement).querySelector(".star-image");
    if ((e.target as HTMLElement).getAttribute("data-selection") === "false") {
      if (selection.length < 20) {
        (img as HTMLImageElement).classList.add("golden-star-image");
        (e.target as HTMLElement).setAttribute("data-selection", "true");
        selection.push(
          (e.target as HTMLElement).getAttribute("data-num") as string
        );
      } else {
        (selectionWarning as HTMLSpanElement).innerHTML =
          "Извините, все слоты заполнены";
      }
    } else {
      (img as HTMLImageElement).classList.remove("golden-star-image");
      (e.target as HTMLElement).setAttribute("data-selection", "false");
      (selectionWarning as HTMLSpanElement).innerHTML = "";

      selection = selection.filter(
        (elem) => elem !== (e.target as HTMLElement).getAttribute("data-num")
      );
    }

    myStorage.setItem("selection", JSON.stringify(selection));
    (selectionCount as HTMLSpanElement).innerHTML = String(selection.length);
    (selectionRest as HTMLSpanElement).innerHTML = String(
      20 - selection.length
    );
  }
});
