import { Snow } from "./games/snow";
import { Music } from "./games/music";
import { Background } from "./games/background";
import { Garland } from "./games/garland";
import { Tree } from "./games/tree";
import { DecorateTree } from "./games/decorateTree";
import { DoneList } from "./games/doneList";
import { GameTypes } from "./types";

export function saveSettings(prop: string, value: string | boolean) {
  let gameSettings = JSON.parse(window.localStorage.getItem("gameSettings"));
  gameSettings ? gameSettings : (gameSettings = gameDefault);
  gameSettings[prop] = value;
  window.localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
}

const gameDefault = {
  isMusicPlaying: false,
  isSnowing: false,
  bg: "bg1",
  tree: "1",
  isGarlandEnabled: false,
  garlandType: "5",
};

export class Game {
  snow: Snow;
  music: Music;
  bg: Background;
  garland: Garland;
  tree: Tree;
  decorateTree: DecorateTree;

  constructor(gameOptions = gameDefault) {
    this.snow = new Snow(gameOptions);
    this.music = new Music(gameOptions);
    this.bg = new Background(gameOptions);
    this.garland = new Garland(gameOptions);
    this.tree = new Tree(gameOptions);
    this.decorateTree = new DecorateTree();

    this.decorateTree.printSelection();
    this.restoreSettings(gameOptions);

    document.querySelector(".reset-storage")?.addEventListener("click", () => {
      this.restoreSettings(gameDefault);
      this.decorateTree.printSelection();
    });
  }

  restoreSettings(gameOptions: GameTypes) {
    this.bg.changeBg(gameOptions.bg);
    this.snow.changeSnow(gameOptions.isSnowing);
    this.garland.changeGarland(gameOptions.isGarlandEnabled, gameOptions.garlandType);
    this.tree.changeTree(gameOptions.tree);
    this.music.changeMusic(gameOptions.isMusicPlaying);
  }
}

const gameSettings = JSON.parse(window.localStorage.getItem("gameSettings")) as GameTypes;
gameSettings ? new Game(gameSettings) : new Game();
new DoneList();
