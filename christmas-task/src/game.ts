import { Snow } from "./snow";
import { Music } from "./music";
import { Bg } from "./background";
import { Garland } from "./garland";
import { Tree } from "./tree";
import { DecorateTree } from "./decorateTree";
import { DoneList } from "./doneList";
import { GameTypes } from "./types";

export function saveSettings(prop: string, value: string | boolean) {
  let gameSettings = JSON.parse(window.localStorage.getItem("gameSettings"));
  gameSettings ? gameSettings : (gameSettings = gameDefault);
  gameSettings[prop] = value;
  window.localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
}

const gameDefault = {
  music: false,
  snow: false,
  bg: "bg1",
  tree: "1",
  garland: false,
  garlandType: "5",
};

export class Game {
  snow: Snow;
  music: Music;
  bg: Bg;
  garland: Garland;
  tree: Tree;
  decorateTree: DecorateTree;
  constructor(game = gameDefault) {
    this.snow = new Snow(game);
    this.music = new Music(game);
    this.bg = new Bg(game);
    this.garland = new Garland(game);
    this.tree = new Tree(game);
    this.decorateTree = new DecorateTree();

    this.decorateTree.printSelection();
    this.restoreSettings(game);

    document.querySelector(".reset-storage")?.addEventListener("click", () => {
      this.restoreSettings(gameDefault);
      this.decorateTree.printSelection();
    });
  }

  restoreSettings(game: GameTypes) {
    this.bg.changeBg(game.bg);
    this.snow.changeSnow(game.snow);
    this.garland.changeGarland(game.garland, game.garlandType);
    this.tree.changeTree(game.tree);
    this.music.changeMusic(game.music);
  }
}

const gameSettings = JSON.parse(window.localStorage.getItem("gameSettings")) as GameTypes;
gameSettings ? new Game(gameSettings) : new Game();
new DoneList();
