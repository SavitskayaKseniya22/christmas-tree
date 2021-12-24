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

const resultScreen = document.querySelector(".result-screen") as HTMLDivElement;
const bgCollection = document.querySelectorAll("input[name='bg']");

bgCollection.forEach((element) => {
  element.addEventListener("click", function (e: Event) {
    const number = (e.target as HTMLInputElement).value;
    resultScreen.className = "result-screen bg";
    resultScreen.classList.add(`bg${number}`);
    //resultScreen.style.backgroundImage = `url("./assets/bg/${number}.jpg") cover center`;
  });
});

const treeCollection = document.querySelectorAll("input[name='tree']");

treeCollection.forEach((element) => {
  element.addEventListener("click", function (e: Event) {
    const number = (e.target as HTMLInputElement).value;

    const treeImg = document.createElement("img");
    treeImg.src = `./assets/tree/${number}.png`;
    treeImg.classList.add("tree-img");
    resultScreen.innerHTML = "";
    resultScreen.append(treeImg);
  });
});

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
  checkbox: HTMLInputElement;
  audio: HTMLAudioElement;
  constructor(music = false, snow = false, bg = "bg1", tree = "./assets/tree/1.png") {
    this.music = music;
    this.snow = snow;
    this.bg = bg;
    this.tree = tree;
    this.checkbox = document.querySelector("#toggle-button-music");
    this.audio = document.querySelector("audio");

    if (this.music) {
      this.checkbox.checked = true;
      this.audio.play();
    }
  }
  changeMusic(value: boolean) {
    this.music = value;
    if (this.music) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  changeSnow(value: boolean) {
    this.snow = value;
  }
}

const settings = new Settings();

const audioCheckbox = document.querySelector("#toggle-button-music");
audioCheckbox.addEventListener("change", function () {
  settings.changeMusic((audioCheckbox as HTMLInputElement).checked);
});
