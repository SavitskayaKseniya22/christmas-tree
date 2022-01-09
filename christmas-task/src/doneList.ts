import { Game } from "./game";
import { GameTypes } from "./types";
export class DoneList {
  doneList: HTMLUListElement;
  constructor() {
    this.doneList = document.querySelector(".done-list");
    document.querySelector(".clear-tree")?.addEventListener("click", () => {
      window.localStorage.removeItem("savedTrees");
      this.doneList.innerHTML = "";
    });

    document.querySelector(".save-tree")?.addEventListener("click", () => {
      const gameSettings = JSON.parse(window.localStorage.getItem("gameSettings")) as GameTypes;
      const savedTree = document.createElement("li");
      savedTree.className = `bg ${gameSettings.bg}`;
      savedTree.setAttribute("data-num", `${this.doneList.children.length}`);
      this.doneList.append(savedTree);

      if (window.localStorage.getItem("savedTrees")) {
        const savedTrees = JSON.parse(window.localStorage.getItem("savedTrees"));
        savedTrees.push(gameSettings);
        window.localStorage.setItem("savedTrees", JSON.stringify(savedTrees));
      } else {
        window.localStorage.setItem("savedTrees", JSON.stringify([gameSettings]));
      }

      savedTree.addEventListener("click", () => {
        const savedTrees = JSON.parse(window.localStorage.getItem("savedTrees"));
        const num = savedTree.getAttribute("data-num");
        const data = savedTrees[Number(num)];
        new Game(data);
      });
    });

    if (window.localStorage.getItem("savedTrees")) {
      const savedTrees = JSON.parse(window.localStorage.getItem("savedTrees")) as GameTypes[];
      for (let i = 0; i <= savedTrees.length - 1; i++) {
        const savedTree = document.createElement("li");
        savedTree.className = `bg ${savedTrees[i].bg}`;
        savedTree.setAttribute("data-num", `${this.doneList.children.length}`);
        this.doneList.append(savedTree);
        savedTree.addEventListener("click", () => {
          const num = savedTree.getAttribute("data-num");
          const data = savedTrees[Number(num)];
          new Game(data);
        });
      }
    }
  }
}
