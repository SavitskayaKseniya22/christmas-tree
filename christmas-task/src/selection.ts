import { myStorage } from "./defaultData";
import { Card } from "./toys";
import data from "./data";

const selectionCount = document.querySelector(".selection-count") as HTMLSpanElement;
const selectionRest = document.querySelector(".selection-rest") as HTMLSpanElement;
const selectionWarning = document.querySelector(".selection-warning") as HTMLSpanElement;
const container = document.querySelector(".selection-container");
const containerInner = document.querySelector(".selection-inner");
export function restoreSelection() {
  if (myStorage.getItem("selection")) {
    const selection = JSON.parse(myStorage.getItem("selection")) as string[];
    selectionCount.textContent = String(selection.length);
    selectionRest.textContent = String(20 - selection.length);
    if (selection.length === 20) {
      selectionWarning.textContent = "Извините, все слоты заполнены";
    }

    selection.forEach(function (element) {
      const choosenToy = document.querySelector(`[data-num="${element}"]`);
      if (choosenToy) {
        choosenToy.setAttribute("data-selection", "true");
        choosenToy.querySelector(".star-image").classList.add("golden-star-image");
      }
    });
  } else {
    selectionCount.textContent = String(0);
    selectionRest.textContent = String(20);
    selectionWarning.textContent = "";
  }
}

document.addEventListener("click", (e: Event) => {
  const targetElement = e.target as HTMLElement;
  if (targetElement.closest(".toys-container .toy-item")) {
    let selection: string[] = [];
    if (myStorage.getItem("selection")) {
      selection = JSON.parse(myStorage.getItem("selection") as string);
    }

    const containerToy = targetElement.closest(".toy-item") as HTMLElement;
    const img = containerToy.querySelector(".star-image") as HTMLImageElement;
    if (containerToy.getAttribute("data-selection") === "false") {
      if (selection.length < 20) {
        img.classList.add("golden-star-image");
        containerToy.setAttribute("data-selection", "true");
        selection.push(containerToy.getAttribute("data-num") as string);
      } else {
        selectionWarning.textContent = "Извините, все слоты заполнены";
      }
    } else {
      img.classList.remove("golden-star-image");
      containerToy.setAttribute("data-selection", "false");
      selectionWarning.textContent = "";
      selection = selection.filter((elem) => elem !== containerToy.getAttribute("data-num"));
    }

    myStorage.setItem("selection", JSON.stringify(selection));
    selectionCount.textContent = String(selection.length);
    selectionRest.textContent = String(20 - selection.length);
  } else if (targetElement.closest(".open-selected")) {
    container.classList.add("active");
    containerInner.classList.add("active");
    const collection = JSON.parse(myStorage.getItem("selection")) as number[];
    if (collection) {
      collection.forEach((element) => {
        containerInner.innerHTML += new Card(data[element]).renderSelectionHTML();
      });
    } else {
      containerInner.textContent = "Сначала добавьте игрушки в избранное. Нет игрушек в избранном";
    }
  } else if (targetElement.closest(".selection-inner__close")) {
    container.classList.remove("active");
    containerInner.classList.remove("active");
    containerInner.innerHTML = "";
  }
});
