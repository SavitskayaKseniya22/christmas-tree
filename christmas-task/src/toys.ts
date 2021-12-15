import data from "./data";
const mainContainer = document.querySelector(".toys-container") as HTMLElement;

type Toy = {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
};

class Card {
  src: string;
  element: string;
  favoriteString: string;
  selection: boolean;
  visible: boolean;
  toyData: Toy;

  constructor(toy: Toy) {
    this.selection = false;
    this.visible = true;
    this.toyData = toy;
    this.toyData.favorite ? this.favoriteString : this.favoriteString;
  }
  renderHTML() {
    return `<div class="toy-item" data-num=${this.toyData.num} data-selection=${this.selection} data-visible=${
      this.visible
    }>
    <h4 class="small-title">${this.toyData.name}</h4>
    <img class="toy-image" src=${`./assets/toys/${this.toyData.num}.png`} alt="toy" />
    <ul>
      <li>Количество: <span class="count-toy">${this.toyData.count}</span></li>
      <li>Год покупки: <span class="year-toy">${this.toyData.year}</span></li>
      <li>Форма: <span class="shape-toy">${this.toyData.shape}</span></li>
      <li>Цвет: <span class="color-toy">${this.toyData.color}</span></li>
      <li>Размер: <span class="size-toy">${this.toyData.size}</span></li>
      <li>Любимая: <span class="favorite-toy">${this.favoriteString}</span></li>
    </ul>
    <img class="star-image" src="./assets/svg/star-empty.svg" alt="star" />
  </div>`;
  }
}

export default function printAllCards(toys: Toy[]) {
  toys.forEach((toy) => (mainContainer.innerHTML += new Card(toy).renderHTML()));
}
const myStorage = window.localStorage;
export function getAllToys(toys: Toy[]) {
  const collectionData: Card[] = [];
  toys.map((toy) => collectionData.push(new Card(toy)));
  myStorage.setItem("allToys", JSON.stringify(collectionData));
}
getAllToys(data);
