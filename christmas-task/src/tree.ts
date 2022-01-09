import { saveSettings } from "./game";
import { GameTypes } from "./types";
export class Tree {
  tree: string;

  constructor(game: GameTypes) {
    this.tree = game.tree;

    document.addEventListener("click", (event) => {
      if ((event.target as HTMLElement).getAttribute("name") === "tree") {
        this.changeTree((event.target as HTMLInputElement).value);
      }
    });
  }
  changeTree(value: string) {
    this.tree = value;
    (document.querySelector(`input[value="${value}"]`) as HTMLInputElement).checked = true;
    saveSettings("tree", this.tree);
    const treeImg = document.querySelector(".tree-image") as HTMLImageElement;
    treeImg.src = `./assets/tree/${value}.png`;
  }
}
