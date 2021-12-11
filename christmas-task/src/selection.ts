import myStorage from "./index";

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

export function restoreSelection(): void {
  if (myStorage.getItem("selection")) {
    selection = JSON.parse(myStorage.getItem("selection") as string);
    selectionCount.innerHTML = String(selection.length);
    selectionRest.innerHTML = String(20 - selection.length);
    if (selection.length === 20) {
      selectionWarning.innerHTML = "Извините, все слоты заполнены";
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const elem of selection) {
      const item = document.querySelector(
        `[data-num="${elem}"]`
      ) as HTMLElement;
      item.setAttribute("data-selection", "true");
      (item.querySelector(".star-image") as HTMLImageElement).classList.add(
        "golden-star-image"
      );
    }
  }
}

export function selectToy(): void {
  document.addEventListener("click", (e: Event): void => {
    if ((e.target as HTMLElement).closest(".toy-item")) {
      const containerToy = (e.target as HTMLElement).closest(
        ".toy-item"
      ) as HTMLElement;
      const img = containerToy.querySelector(".star-image") as HTMLImageElement;
      if (containerToy.getAttribute("data-selection") === "false") {
        if (selection.length < 20) {
          img.classList.add("golden-star-image");
          containerToy.setAttribute("data-selection", "true");
          selection.push(containerToy.getAttribute("data-num") as string);
        } else {
          selectionWarning.innerHTML = "Извините, все слоты заполнены";
        }
      } else {
        img.classList.remove("golden-star-image");
        containerToy.setAttribute("data-selection", "false");
        selectionWarning.innerHTML = "";

        selection = selection.filter(
          (elem) => elem !== containerToy.getAttribute("data-num")
        );
      }

      myStorage.setItem("selection", JSON.stringify(selection));
      selectionCount.innerHTML = String(selection.length);
      selectionRest.innerHTML = String(20 - selection.length);
    }
  });
}
