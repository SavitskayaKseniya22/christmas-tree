import "./styles.scss";
import "./normalize.scss";
import data from "./data";
import printAllCards from "./toys";

const myStorage = window.localStorage;

const mainContainer = document.querySelector(".toys-container");
let selection: HTMLElement[] = [];

if (mainContainer) {
  printAllCards(data, mainContainer);

  document.addEventListener("click", (e: Event): void => {
    if ((e.target as HTMLElement).className === "toy-item") {
      const img = (e.target as HTMLElement).querySelector(".star-image");
      (img as HTMLImageElement).classList.toggle("golden-star-image");

      const selectionCount = document.querySelector(".selection-count");
      const str = (selectionCount as HTMLSpanElement).innerHTML;
      let num: number;
      if ((img as HTMLImageElement).classList.contains("golden-star-image")) {
        num = Number(str) + 1;

        selection.push(e.target as HTMLElement);
      } else {
        num = Number(str) - 1;
        selection = selection.filter(
          (elem) =>
            elem.getAttribute("data-num") !==
            (e.target as HTMLElement).getAttribute("data-num")
        );
      }
      (selectionCount as HTMLSpanElement).innerHTML = String(num);
    }

    myStorage.setItem("selection", JSON.stringify(selection));
    const temp = myStorage.getItem("selection");
    if (temp) {
      console.log(JSON.parse(temp));
    }
  });
}
