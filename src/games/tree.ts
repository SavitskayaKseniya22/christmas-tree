import { saveSettings } from "../game";
import { GameTypes } from "../types";

export class Tree {
  tree: string;

  constructor(gameOptions: GameTypes) {
    this.tree = gameOptions.tree;

    document.addEventListener("click", (event) => {
      if ((event.target as HTMLElement).getAttribute("name") === "tree") {
        this.changeTree((event.target as HTMLInputElement).value);
      }
    });
  }

  changeTree(tree: string) {
    this.tree = tree;
    (document.querySelector(`input[value="${tree}"]`) as HTMLInputElement).checked = true;
    saveSettings("tree", this.tree);
    const treeImg = document.querySelector(".tree-image") as HTMLImageElement;
    treeImg.src = `./assets/tree/${tree}.png`;
  }
}
