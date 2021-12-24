import { ToyCard } from "./toyCard";
import { data } from "./data";

const collectionList = document.querySelector(".selection-options ul");

const collection = JSON.parse(window.localStorage.getItem("selection")) as number[];
//alert(2);

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

class Game {
  bg: string;
  tree: string;
  garland: boolean;
  garlandType: string;
  constructor(bg = "bg1", tree = "./assets/tree/1.png", garland = false, garlandType = "green-garland") {
    this.bg = bg;
    this.tree = tree;
    this.garland = garland;
    if (this.garland) {
      this.garlandType = garlandType;
    }
  }

  printResult() {
    return `<div class="bg ${this.bg}">
    <img src="${this.tree}" alt="tree target">
    <ul class="${this.garlandType}"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
    </div>`;
  }
}

class Settings {
  music: boolean;
  snow: boolean;
  tree: string;
  bg: string;
  checkboxMusic: HTMLInputElement;
  checkboxSnow: HTMLInputElement;
  audio: HTMLAudioElement;
  bgCollection: NodeListOf<Element>;
  resultScreen: HTMLDivElement;
  treeCollection: NodeListOf<Element>;
  resetButton: HTMLButtonElement;

  constructor(music = false, snow = false, bg = "bg1", tree = "1") {
    this.music = music;
    this.snow = snow;
    this.bg = bg;
    this.tree = tree;
    this.checkboxMusic = document.querySelector("#toggle-button-music");
    this.audio = document.querySelector("audio");
    this.checkboxSnow = document.querySelector("#toggle-button-snow");
    this.bgCollection = document.querySelectorAll("input[name='bg']");
    this.resultScreen = document.querySelector(".result-screen");
    this.treeCollection = document.querySelectorAll("input[name='tree']");
    this.resetButton = document.querySelector(".reset-storage");

    this.callSettings(this.music, this.snow, this.bg, this.tree);

    this.checkboxMusic.addEventListener("change", () => {
      this.changeMusic(this.checkboxMusic.checked);
    });
    this.checkboxSnow.addEventListener("change", () => {
      this.changeSnow(this.checkboxSnow.checked);
    });

    this.bgCollection.forEach((element) => {
      element.addEventListener("click", (e: Event) => {
        this.changeBg((e.target as HTMLInputElement).value);
      });
    });

    this.treeCollection.forEach((element) => {
      element.addEventListener("click", (e: Event) => {
        this.changeTree((e.target as HTMLInputElement).value);
      });
    });
    this.resetButton.addEventListener("click", () => {
      this.callSettings(false, false, "bg1", "1");
    });
  }
  changeMusic(value: boolean) {
    this.music = value;
    this.saveSettings();
    if (this.music) {
      this.checkboxMusic.checked = true;
      this.audio.play();
    } else {
      this.checkboxMusic.checked = false;
      this.audio.pause();
    }
  }

  changeSnow(value: boolean) {
    this.snow = value;
    this.saveSettings();
    if (this.snow) {
      this.checkboxSnow.checked = true;
    } else {
      this.checkboxSnow.checked = false;
    }
  }
  changeBg(value: string) {
    this.bg = value;
    this.saveCheckedState(value);
    this.saveSettings();
    this.resultScreen.className = "result-screen bg";
    this.resultScreen.classList.add(value);
  }
  changeTree(value: string) {
    this.tree = value;
    this.saveCheckedState(value);
    this.saveSettings();
    const treeImg = document.createElement("img");
    treeImg.src = `./assets/tree/${value}.png`;
    treeImg.classList.add("tree-img");
    this.resultScreen.innerHTML = "";
    this.resultScreen.append(treeImg);
  }
  saveCheckedState(value: string) {
    const item = document.querySelector(`input[value="${value}"]`) as HTMLInputElement;
    item.checked = true;
  }

  callSettings(music: boolean, snow: boolean, bg: string, tree: string) {
    this.changeMusic(music);
    this.changeBg(bg);
    this.changeSnow(snow);
    this.changeTree(tree);
  }

  saveSettings() {
    window.localStorage.setItem("gameSettings", JSON.stringify([this.music, this.snow, this.bg, this.tree]));
  }
}
let settings: Settings;
if (window.localStorage.getItem("gameSettings")) {
  const arr = JSON.parse(window.localStorage.getItem("gameSettings"));
  settings = new Settings(arr[0], arr[1], arr[2], arr[3]);
} else {
  settings = new Settings();
}
