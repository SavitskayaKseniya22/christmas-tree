import myStorage from "./index";

class Card {
  name: string;

  count: string;

  year: string;

  shape: string;

  color: string;

  size: string;

  favorite: boolean;

  num: string;

  src: string;

  element: string;

  favoriteString: string;

  selection: boolean;

  visible: boolean;

  constructor(obj: {
    num: string;
    name: string;
    count: string;
    year: string;
    shape: string;
    color: string;
    size: string;
    favorite: boolean;
  }) {
    this.selection = false;
    this.visible = true;
    this.name = obj.name;
    this.count = obj.count;
    this.year = obj.year;
    this.shape = obj.shape;
    this.color = obj.color;
    this.size = obj.size;
    this.favorite = obj.favorite;
    this.num = obj.num;
    this.src = `./assets/toys/${this.num}.png`;
    if (this.favorite) {
      this.favoriteString = "да";
    } else {
      this.favoriteString = "нет";
    }
    this.element = `<div class="toy-item" data-num=${this.num} data-selection=${this.selection} data-visible=${this.visible}>
    <h4>${this.name}</h4>
    <img class="toy-image" src=${this.src} alt="toy" />
    <ul>
      <li>Количество: <span>${this.count}</span></li>
      <li>Год покупки: <span>${this.year}</span></li>
      <li>Форма: <span>${this.shape}</span></li>
      <li>Цвет: <span>${this.color}</span></li>
      <li>Размер: <span>${this.size}</span></li>
      <li>Любимая: <span>${this.favoriteString}</span></li>
    </ul>
    <img class="star-image" src="./assets/svg/star-empty.svg" alt="star" />
  </div>`;
  }
}

function printCard(obj: { element: string }, container: Element) {
  // eslint-disable-next-line no-param-reassign
  container.innerHTML += obj.element;
}

export default function printAllCards(
  arr: {
    num: string;
    name: string;
    count: string;
    year: string;
    shape: string;
    color: string;
    size: string;
    favorite: boolean;
  }[],
  container: Element
) {
  // eslint-disable-next-line no-restricted-syntax
  for (const item of arr) {
    printCard(new Card(item), container);
  }
}

export function getAllToys(
  arr: {
    num: string;
    name: string;
    count: string;
    year: string;
    shape: string;
    color: string;
    size: string;
    favorite: boolean;
  }[]
) {
  const collectionData: object[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const item of arr) {
    collectionData.push(new Card(item));
  }
  myStorage.setItem("allToys", JSON.stringify(collectionData));
  return collectionData;
}
