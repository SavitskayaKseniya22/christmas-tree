import { Snow } from "./snow";
import { Music } from "./music";
import { Bg } from "./background";
import { Garland } from "./garland";
import { Tree } from "./tree";
import { DecorateTree } from "./decorateTree";

export function saveSettings(prop: string, value: string | boolean) {
  let gameSettings = JSON.parse(window.localStorage.getItem("gameSettings"));
  gameSettings ? gameSettings : (gameSettings = gameDefault);
  gameSettings[prop] = value;
  window.localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
}

export interface GameTypes {
  music: boolean;
  snow: boolean;
  tree: string;
  bg: string;
  garland: boolean;
  garlandType: string;
}

const gameDefault = {
  music: false,
  snow: false,
  bg: "bg1",
  tree: "1",
  garland: false,
  garlandType: "5",
};

class Game {
  doneList: HTMLUListElement;

  constructor(game = gameDefault) {
    this.doneList = document.querySelector(".done-list");

    new Snow(game);
    new Music(game);
    new Bg(game);
    new Garland(game);
    new Tree(game);
    new DecorateTree().printSelection();

    this.restoreSettings(game);

    document.querySelector(".reset-storage")?.addEventListener("click", () => {
      this.restoreSettings(gameDefault);
      new DecorateTree().printSelection();
    });

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
        this.restoreSettings(data);
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
          this.restoreSettings(data);
        });
      }
    }
  }

  restoreSettings(game: GameTypes) {
    new Bg(game).changeBg(game.bg);
    new Snow(game).changeSnow(game.snow);
    new Garland(game).changeGarland(game.garland, game.garlandType);
    new Tree(game).changeTree(game.tree);
    new Music(game).changeMusic(game.music);
  }
}

const gameSettings = JSON.parse(window.localStorage.getItem("gameSettings")) as GameTypes;
gameSettings ? new Game(gameSettings) : new Game();
