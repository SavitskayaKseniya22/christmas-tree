import { Toy } from "./types";
export class ToyCard {
  src: string;
  element: string;
  favoriteString: string;
  selection: boolean;
  toyData: Toy;

  constructor(toy: Toy) {
    this.selection = false;
    this.toyData = toy;
    this.toyData.favorite ? (this.favoriteString = "да") : (this.favoriteString = "нет");
  }
  renderHTML() {
    return `<li class="toy-item" data-num=${this.toyData.num} data-selection=${this.selection}>
    <h4 class="small-title">${this.toyData.name}</h4>
    <img class="toy-image" src=../assets/toys/${this.toyData.num}.png alt="toy" />
    <ul>
      <li>Количество: <span class="count-toy">${this.toyData.count}</span></li>
      <li>Год покупки: <span class="year-toy">${this.toyData.year}</span></li>
      <li>Форма: <span class="shape-toy">${this.toyData.shape}</span></li>
      <li>Цвет: <span class="color-toy">${this.toyData.color}</span></li>
      <li>Размер: <span class="size-toy">${this.toyData.size}</span></li>
      <li>Любимая: <span class="favorite-toy">${this.favoriteString}</span></li>
    </ul>
    <img class="star-image" src="../assets/svg/star-empty.svg" alt="star" />
  </li>`;
  }
  renderSelectionHTML() {
    return `<li class="toy-item toy-item_selected" data-num=${this.toyData.num}>
    <h4 class="small-title">${this.toyData.name}</h4>
    <img class="toy-image" src=../assets/toys/${this.toyData.num}.png alt="toy" />
    <span class="count-toy">${this.toyData.count}</span>
    <button class="remove-selection"><img src="../assets/svg/close-white.svg" alt="close" /></button>
  </li>`;
  }
  renderPreview() {
    return `<li class="toy-preview" draggable="true" data-num=${this.toyData.num}>
    <img class="toy-image" data-num=${this.toyData.num} src=./assets/toys/${this.toyData.num}.png alt="toy" />
    <span class="count-toy">${this.toyData.count}</span>
  </li>`;
  }
}
