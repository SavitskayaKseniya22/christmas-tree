import { ToyCard } from "./toyCard";
import { data } from "./data";
export class DecorateTree {
  constructor() {
    document.addEventListener("dragover", (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "AREA") {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
      }
    });
    document.addEventListener("drop", (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "AREA") {
        const targetSelector = event.dataTransfer.getData("text");
        const draggableElement = document.querySelector(targetSelector) as HTMLElement;
        const dropzone = target.closest(".tree-container");
        let count = draggableElement.dataset.count;
        if (targetSelector.includes("toy-preview") && +count > 0) {
          const draggableElementDup = draggableElement.cloneNode() as HTMLElement;
          count = String(+count - 1);
          draggableElement.dataset.count = count;
          draggableElementDup.dataset.count = count;
          draggableElement.previousElementSibling.textContent = count;
          draggableElement.parentNode.append(draggableElement);
          dropzone.append(draggableElementDup);
          this.setCoords(draggableElementDup, event, dropzone as HTMLElement);
          draggableElementDup.addEventListener("dblclick", () => {
            this.returnToy(draggableElementDup);
          });
          event.dataTransfer.clearData();
        } else if (targetSelector.includes("tree-container")) {
          dropzone.append(draggableElement);
          this.setCoords(draggableElement, event, dropzone as HTMLElement);
        }
      }
    });

    document.addEventListener("dragstart", (event) => {
      if ((event.target as HTMLElement).className === "toy-image") {
        this.onDragStart(event);
      }
    });
  }
  printSelection() {
    const collectionList = document.querySelector(".selection-options ul");
    const collection = JSON.parse(window.localStorage.getItem("selection")) as number[];
    collectionList.innerHTML = "";

    if (collection && collection.length > 0) {
      collection.forEach((element) => {
        collectionList.innerHTML += new ToyCard(data[element - 1]).renderPreview();
      });
    } else {
      let i = 0;
      while (i < 20) {
        collectionList.innerHTML += new ToyCard(data[i]).renderPreview();
        i++;
      }
    }
  }
  returnToy(element: HTMLElement) {
    const num = element.getAttribute("data-num");
    const target = document.querySelector(`.toy-preview [data-num='${num}']`) as HTMLElement;
    element.remove();
    const count = String(+target.dataset.count + 1);
    target.previousElementSibling.textContent = count;
    target.dataset.count = count;
  }

  setCoords(element: HTMLElement, e: Event, block: Element) {
    const { pageX, pageY } = e as MouseEvent;
    element.style.left = ` ${pageX - (block.getBoundingClientRect().left + 20 + window.pageXOffset)}px`;
    element.style.top = `${pageY - (block.getBoundingClientRect().top + 20 + window.pageYOffset)}px`;
  }
  onDragStart(event: DragEvent) {
    event.dataTransfer.effectAllowed = "copy";
    const parent = (event.target as HTMLElement).parentElement.className;
    event.dataTransfer.setData(
      "text/plain",
      `.${parent} [data-num='${(event.target as HTMLImageElement).dataset.num}'][data-count='${
        (event.target as HTMLImageElement).dataset.count
      }']`,
    );
  }
}
