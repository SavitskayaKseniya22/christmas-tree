import { ToyCard } from "./toyCard";
import { data } from "./data";

function printSelection() {
  const collectionList = document.querySelector(".selection-options ul");
  const collection = JSON.parse(window.localStorage.getItem("selection")) as number[];
  collectionList.innerHTML = "";

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
  const collectionToys = document.querySelectorAll(".toy-preview");

  collectionToys.forEach((element) => {
    addSelectClassname(element);
  });
}
function addSelectClassname(element: Element) {
  element.addEventListener("dragstart", (e: Event) => {
    (e.target as HTMLElement).classList.add("selected");
  });
  element.addEventListener("dragend", (e: Event) => {
    (e.target as HTMLElement).classList.remove("selected");
  });
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
  doneList: HTMLUListElement;
  saveTreeButton: HTMLButtonElement;
  clearTreeButton: HTMLButtonElement;

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
    this.saveTreeButton = document.querySelector(".save-tree");
    this.doneList = document.querySelector(".done-list");
    this.clearTreeButton = document.querySelector(".clear-tree");

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
      printSelection();
    });

    this.clearTreeButton.addEventListener("click", () => {
      window.localStorage.removeItem("savedTrees");
      this.doneList.innerHTML = "";
    });

    this.saveTreeButton.addEventListener("click", () => {
      const gameSettings = JSON.parse(window.localStorage.getItem("gameSettings"));
      const savedTree = document.createElement("li");
      savedTree.className = `bg ${gameSettings[2]}`;
      savedTree.setAttribute("data-num", `${this.doneList.children.length}`);
      this.doneList.append(savedTree);

      if (window.localStorage.getItem("savedTrees")) {
        const savedTrees = JSON.parse(window.localStorage.getItem("savedTrees")) as string[][];
        savedTrees.push(gameSettings);
        window.localStorage.setItem("savedTrees", JSON.stringify(savedTrees));
      } else {
        window.localStorage.setItem("savedTrees", JSON.stringify([gameSettings]));
      }

      savedTree.addEventListener("click", () => {
        const savedTrees = JSON.parse(window.localStorage.getItem("savedTrees"));
        const num = savedTree.getAttribute("data-num");
        const data = savedTrees[Number(num)];
        this.callSettings(data[0], data[1], data[2], data[3], data[4], data[5]);
      });
    });

    if (window.localStorage.getItem("savedTrees")) {
      const savedTrees = JSON.parse(window.localStorage.getItem("savedTrees"));
      for (let i = 0; i <= savedTrees.length - 1; i++) {
        const savedTree = document.createElement("li");
        savedTree.className = `bg ${savedTrees[i][2]}`;
        savedTree.setAttribute("data-num", `${this.doneList.children.length}`);
        this.doneList.append(savedTree);
        savedTree.addEventListener("click", () => {
          const num = savedTree.getAttribute("data-num");
          const data = savedTrees[Number(num)];
          this.callSettings(data[0], data[1], data[2], data[3], data[4], data[5]);
        });
      }
    }
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
      const treeContainer = document.querySelector(".tree-container");

      const garlandContainer = document.createElement("div");
      garlandContainer.className = "garland-container";
      garlandContainer.innerHTML += this.printGarland(className);
      treeContainer.append(garlandContainer);
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
    document.querySelector(".garland-container")?.remove();
  }
  printGarland(className: string) {
    return `<ul id="garland-block-first" class="garland-block">
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
    
  </ul>
  
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

      const snowContainer = document.createElement("div");
      snowContainer.className = "snow-container";
      snowContainer.innerHTML = this.printSnow();
      this.resultScreen.append(snowContainer);
    } else {
      this.checkboxSnow.checked = false;
      document.querySelector(".snowfall")?.remove();
      document.querySelector(".snowfall2")?.remove();
      document.querySelector(".snowfall3")?.remove();
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
  <ul class="snowfall2">
    <li><img src="./assets/svg/snow.svg" alt="snowflake" /></li>
    <li><img src="./assets/svg/snow.svg" alt="snowflake" /></li>
    <li><img src="./assets/svg/snow.svg" alt="snowflake" /></li>
    <li><img src="./assets/svg/snow.svg" alt="snowflake" /></li>
    <li><img src="./assets/svg/snow.svg" alt="snowflake" /></li>
    <li><img src="./assets/svg/snow.svg" alt="snowflake" /></li>
    <li><img src="./assets/svg/snow.svg" alt="snowflake" /></li>
    <li><img src="./assets/svg/snow.svg" alt="snowflake" /></li>
  </ul>
  <ul class="snowfall3">
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
    document.querySelector(".map-tree")?.remove();
    document.querySelector(".tree-image")?.remove();

    const treeImg = document.createElement("img");
    treeImg.src = `./assets/tree/${value}.png`;
    treeImg.useMap = "#image-map";
    treeImg.alt = "tree";
    treeImg.classList.add("tree-image");

    const treeBlock = document.querySelector(".tree-container");
    treeBlock.append(treeImg);
    this.resultScreen.append(treeBlock);
    treeBlock.innerHTML += `<map name="image-map" class="map-tree">
    <area target="" alt="tree" title="" href="#" coords="247,3,481,616,363,702,87,691,7,618" shape="poly">
</map>`;

    const mapTree = document.querySelector(".map-tree");
    mapTree.addEventListener(`dragover`, (e) => {
      e.preventDefault();
    });

    mapTree.addEventListener("drop", (e) => {
      e.preventDefault();
      const activeElement = document.querySelector(".selected") as HTMLElement;
      const count = activeElement.nextElementSibling?.textContent;
      if (Number(count) > 0) {
        const dupActiveElement = activeElement.cloneNode() as HTMLElement;
        dupActiveElement.classList.remove("selected");
        mapTree.append(dupActiveElement);
        this.setCoords(dupActiveElement, e, mapTree);
        activeElement.nextElementSibling.textContent = String(+count - 1);
        addSelectClassname(dupActiveElement);
      } else if (activeElement.parentElement.className == "map-tree") {
        this.setCoords(activeElement, e, mapTree);
      }
    });
    printSelection();
  }

  setCoords(element: HTMLElement, e: Event, block: Element) {
    element.style.left = ` ${
      (e as MouseEvent).pageX - (block.getBoundingClientRect().left + 20 + window.pageXOffset)
    }px`;
    element.style.top = `${(e as MouseEvent).pageY - (block.getBoundingClientRect().top + 20 + window.pageYOffset)}px`;
  }

  saveCheckedState(value: string) {
    const item = document.querySelector(`input[value="${value}"]`) as HTMLInputElement;
    item.checked = true;
  }

  callSettings(music: boolean, snow: boolean, bg: string, tree: string, garland: boolean, garlandType: string) {
    this.changeBg(bg);
    this.changeSnow(snow);
    this.changeGarland(garland, garlandType);
    this.changeTree(tree);
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
