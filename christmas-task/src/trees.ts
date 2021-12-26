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
  checkboxGarland: HTMLInputElement;
  garland: boolean;
  garlandTypes: NodeListOf<Element>;
  garlandType: string;

  constructor(music = false, snow = false, bg = "bg1", tree = "1", garland = false, garlandType = "5") {
    this.music = music;
    this.snow = snow;
    this.bg = bg;
    this.tree = tree;
    this.garland = garland;
    this.garlandType = garlandType;
    this.checkboxMusic = document.querySelector("#toggle-button-music");
    this.audio = document.querySelector("audio");
    this.checkboxSnow = document.querySelector("#toggle-button-snow");
    this.bgCollection = document.querySelectorAll("input[name='bg']");
    this.resultScreen = document.querySelector(".result-screen");
    this.treeCollection = document.querySelectorAll("input[name='tree']");
    this.resetButton = document.querySelector(".reset-storage");
    this.checkboxGarland = document.querySelector(".garland-enabler");
    this.garlandTypes = document.querySelectorAll("input[name='garland']");

    this.callSettings(this.music, this.snow, this.bg, this.tree, this.garland, this.garlandType);

    this.checkboxGarland.addEventListener("change", () => {
      this.changeGarland(this.checkboxGarland.checked, this.garlandType);
    });
    this.checkboxMusic.addEventListener("change", () => {
      this.changeMusic(this.checkboxMusic.checked);
    });
    this.checkboxSnow.addEventListener("change", () => {
      this.changeSnow(this.checkboxSnow.checked);
    });

    this.garlandTypes.forEach((element) => {
      element.addEventListener("click", (e: Event) => {
        this.changeGarland(
          this.checkboxGarland.checked,
          (document.querySelector('input[name="garland"]:checked') as HTMLInputElement).value,
        );
      });
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
      this.callSettings(false, false, "bg1", "1", false, "5");
    });
  }

  changeGarland(value: boolean, index: string) {
    this.garland = value;
    this.garlandType = index;
    this.saveSettings();
    const i = Number(index) - 1;

    if (this.garland) {
      this.removeGarland();
      this.checkboxGarland.checked = true;
      (this.garlandTypes[i] as HTMLInputElement).checked = true;
      const className = (this.garlandTypes[i] as HTMLInputElement).getAttribute("data-color");
      this.resultScreen.innerHTML += this.printGarland(className);
    } else {
      this.checkboxGarland.checked = false;
      this.removeGarland();
      (this.garlandTypes[i] as HTMLInputElement).checked = false;
    }
  }
  removeGarland() {
    this.garlandTypes.forEach((element) => {
      (element as HTMLInputElement).checked = false;
    });
    const garlandBlockCollection = document.querySelectorAll(".garland-block");
    garlandBlockCollection.forEach((element) => {
      element.remove();
    });
  }
  printGarland(className: string) {
    return `<div class="garland-container"><ul id="garland-block-first" class="garland-block">
    <li class=${className}></li>
    <li class=${className}></li>
    <li class=${className}></li>
    <li class=${className}></li>
    <li class=${className}></li>
    <li class=${className}></li>
    <li class=${className}></li>
    <li class=${className}></li>
  </ul>
  <ul id="garland-block-second" class="garland-block">
  <li class=${className}></li>
  <li class=${className}></li>
  <li class=${className}></li>
  <li class=${className}></li>
  <li class=${className}></li>
  <li class=${className}></li>
  <li class=${className}></li>
  <li class=${className}></li>
  </ul>
  <ul id="garland-block-third" class="garland-block">
  <li class=${className}></li>
  <li class=${className}></li>
  <li class=${className}></li>
  <li class=${className}></li>
  <li class=${className}></li>
  <li class=${className}></li>
  <li class=${className}></li>
  <li class=${className}></li>
  </ul>
  <ul id="garland-block-fourth" class="garland-block">
  <li class=${className}></li>
    <li class=${className}></li>
    <li class=${className}></li>
    <li class=${className}></li>
    <li class=${className}></li>
    <li class=${className}></li>
    <li class=${className}></li>
  </ul>
  <ul id="garland-block-fifth" class="garland-block">
  <li class=${className}></li>
    <li class=${className}></li>
    <li class=${className}></li>
    <li class=${className}></li>
    <li class=${className}></li>
    <li class=${className}></li>
    
  </ul></div>
  
  `;
  }

  changeMusic(value: boolean) {
    this.music = value;
    this.saveSettings();
    if (this.music) {
      this.checkboxMusic.checked = true;
      this.audio.play();
      document.addEventListener(
        "click",
        () => {
          this.audio.play();
        },
        { once: true },
      );
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
      this.resultScreen.innerHTML += this.printSnow();
    } else {
      this.checkboxSnow.checked = false;
      document.querySelector(".snowfall")?.remove();
    }
  }
  printSnow() {
    return `<ul class="snowfall">
    <li><img src="./assets/svg/snow.svg" alt="snowflake" /></li>
    <li><img src="./assets/svg/snow.svg" alt="snowflake" /></li>
    <li><img src="./assets/svg/snow.svg" alt="snowflake" /></li>
    <li><img src="./assets/svg/snow.svg" alt="snowflake" /></li>
    <li><img src="./assets/svg/snow.svg" alt="snowflake" /></li>
    <li><img src="./assets/svg/snow.svg" alt="snowflake" /></li>
    <li><img src="./assets/svg/snow.svg" alt="snowflake" /></li>
    <li><img src="./assets/svg/snow.svg" alt="snowflake" /></li>
  </ul>
  `;
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
    document.querySelector(".tree-img")?.remove();
    this.resultScreen.append(treeImg);
  }
  saveCheckedState(value: string) {
    const item = document.querySelector(`input[value="${value}"]`) as HTMLInputElement;
    item.checked = true;
  }

  callSettings(music: boolean, snow: boolean, bg: string, tree: string, garland: boolean, garlandType: string) {
    this.changeBg(bg);
    this.changeSnow(snow);
    this.changeTree(tree);
    this.changeGarland(garland, garlandType);
    this.changeMusic(music);
  }

  saveSettings() {
    window.localStorage.setItem(
      "gameSettings",
      JSON.stringify([this.music, this.snow, this.bg, this.tree, this.garland, this.garlandType]),
    );
  }
}
let settings: Settings;
if (window.localStorage.getItem("gameSettings")) {
  const arr = JSON.parse(window.localStorage.getItem("gameSettings"));
  settings = new Settings(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]);
} else {
  settings = new Settings();
}

const collectionToys = document.querySelectorAll(".toy-preview");
const resultScreen = document.querySelector(".result-screen");
/*
collectionToys.forEach((element) => {
  element.addEventListener("dragstart", (e: Event) => {
    (e.target as HTMLElement).classList.add("selected");
  });
  element.addEventListener("dragend", (e: Event) => {
    (e.target as HTMLElement).classList.remove("selected");
  });
});

resultScreen.addEventListener(`dragover`, (evt) => {
  evt.preventDefault();
});

resultScreen.addEventListener("drop", function (event) {
  //console.log((event as DragEvent).dataTransfer.getData("text"));
  event.preventDefault();
  const activeElement = document.querySelector(".selected");
  const count = activeElement.nextElementSibling.textContent;
  if (count != "0") {
    const dupActiveElement = activeElement.cloneNode();
    (dupActiveElement as HTMLElement).classList.remove("selected");
    resultScreen.append(dupActiveElement);
    activeElement.nextElementSibling.textContent = String(+count - 1);
  }
});*/

collectionToys.forEach((element) => {
  element.addEventListener("mousedown", (e: Event) => {
    function moveAt(pageX: number, pageY: number) {
      (dupActiveElement as HTMLElement).style.left = pageX - shiftX + "px";
      (dupActiveElement as HTMLElement).style.top = pageY - shiftY + "px";
    }

    const activeElement = e.target as HTMLElement;
    const dupActiveElement = activeElement.cloneNode();
    const shiftX = (e as MouseEvent).clientX - (element as HTMLElement).getBoundingClientRect().left;
    const shiftY = (e as MouseEvent).clientY - (element as HTMLElement).getBoundingClientRect().top;
    const body = document.querySelector(".body");

    body.append(dupActiveElement);
    console.log(body);

    moveAt((e as MouseEvent).pageX, (e as MouseEvent).pageY);

    function onMouseMove(e: MouseEvent) {
      moveAt(e.pageX, e.pageY);
    }
    document.addEventListener("mousemove", onMouseMove);

    (resultScreen as HTMLElement).onmouseup = function () {
      document.removeEventListener("mousemove", onMouseMove);
      (element as HTMLElement).onmouseup = null;
    };
  });
  (element as HTMLElement).ondragstart = function () {
    return false;
  };
});
