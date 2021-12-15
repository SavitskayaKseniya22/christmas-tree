import { myStorage } from "./index";

const selectionCount = document.querySelector(".selection-count") as HTMLSpanElement;
const selectionRest = document.querySelector(".selection-rest") as HTMLSpanElement;
const selectionWarning = document.querySelector(".selection-warning") as HTMLSpanElement;

let selection: string[] = [];

export function restoreSelection() {
  if (myStorage.getItem("selection")) {
    selection = JSON.parse(myStorage.getItem("selection") as string);
    selectionCount.textContent = String(selection.length);
    selectionRest.textContent = String(20 - selection.length);
    if (selection.length === 20) {
      selectionWarning.textContent = "Извините, все слоты заполнены";
    }

    for (const i of selection) {
      const item = document.querySelector(`[data-num="${i}"]`) as HTMLElement;
      if (item) {
        item.setAttribute("data-selection", "true");
        (item.querySelector(".star-image") as HTMLImageElement).classList.add("golden-star-image");
      }
    }
  }
}

export function selectToy() {
  document.addEventListener("click", (e: Event) => {
    if ((e.target as HTMLElement).closest(".toy-item")) {
      const containerToy = (e.target as HTMLElement).closest(".toy-item") as HTMLElement;
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
    }
  });
}
