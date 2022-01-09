import { saveSettings } from "./game";
import { GameTypes } from "./types";
export class Tree {
  tree: string;
  treeCollection: NodeListOf<Element>;
  selectionsContainer: HTMLUListElement;
  constructor(game: GameTypes) {
    this.tree = game.tree;
    this.treeCollection = document.querySelectorAll("input[name='tree']");
    this.selectionsContainer = document.querySelector(".selection-options ul");

    this.treeCollection.forEach((element) => {
      element.addEventListener("click", (e: Event) => {
        this.changeTree((e.target as HTMLInputElement).value);
      });
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
