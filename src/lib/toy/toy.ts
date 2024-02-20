import { ToyViewType, type ToyType, SliderType } from '../../types';
import icon__star_empty from './assets/icon-star-empty.svg';
import icon__star_full from './assets/icon-star-full.svg';
import icon__heart from './assets/icon-heart.svg';

import AppStore from '../../store';
import './lib/toy-ref/toy-ref';
import './toy.scss';

export class Toy {
  data: ToyType & { selected: boolean };
  count: number;

  constructor(toy: ToyType) {
    this.data = { ...toy, selected: false };
    this.count = this.data[SliderType.QUANTITY];
  }

  getView({ type, toy }: { type: ToyViewType; toy: Toy }): string {
    const { count, data } = toy;
    const {
      num,
      size,
      shape,
      year,
      quantity,
      title,
      color,
      favorite,
      selected,
    } = data;
    switch (type) {
      case ToyViewType.full:
        return `
    <h4>${title}</h4>
    <img class="toy-image" src="https://raw.githubusercontent.com/SavitskayaKseniya22/christmas-tree/5be0f234ea6fa4b689ad2752d11deafecf0897ee/src/assets/toys/${num}.png" alt="${title}" />
    <ul class="toy__features">
    <li class="toy__feature">Quantity: ${quantity}</li>
    <li class="toy__feature">Year of manufacture: ${year}</li>
    </ul>
    
    <div is="toy-ref-custom" size='${size}' color="${color}" shape='${shape}'></div>
    <div class="toy__status"> 
    ${favorite ? `<img src=${icon__heart} alt="Heart" />` : ''}
    ${selected ? `<img class="star-image" src=${icon__star_full} alt="Star" />` : `<img class="star-image" src=${icon__star_empty} alt="Star" />`}
    </div>
   
  `;

      case ToyViewType.preview:
        return `
    <div class="count-toy">${count}</div>
    <img draggable="true" class="toy-image" data-count=${count} data-num=${num} src="https://raw.githubusercontent.com/SavitskayaKseniya22/christmas-tree/5be0f234ea6fa4b689ad2752d11deafecf0897ee/src/assets/toys/${this.data.num}.png" alt="${this.data.title}" />`;
    }
  }
}

export class ToyElement extends HTMLLIElement {
  toy: Toy;

  constructor() {
    super();
    const num = this.dataset.num;
    this.toy =
      num === undefined
        ? AppStore.toys[0]
        : AppStore.filteredToys.find((toy) => {
            return toy.data.num === +num;
          }) ?? AppStore.toys[0];
    this.className = 'toy-item';
  }

  render(): void {
    this.innerHTML = `
      ${this.toy.getView({ type: ToyViewType.full, toy: this.toy })}
    `;
  }

  connectedCallback(): void {
    this.render();

    this.addEventListener('click', () => {
      this.toy.data.selected = !this.toy.data.selected;

      const image = this.querySelector('.star-image');

      if (image != null) {
        (image as HTMLImageElement).outerHTML = this.toy.data.selected
          ? `<img class="star-image" src=${icon__star_full} alt="Звездочка полная" />`
          : `<img class="star-image" src=${icon__star_empty} alt="Звездочка пустая" />`;
      }
    });
  }
}

customElements.define('toys-element-custom', ToyElement, { extends: 'li' });

export class ToyElementPreview extends HTMLLIElement {
  static observedAttributes = ['data-count'];
  toy: Toy;

  constructor() {
    super();
    const num = this.dataset.num;
    this.toy =
      num === undefined
        ? AppStore.toys[0]
        : AppStore.filteredToys.find((toy) => {
            return toy.data.num === +num;
          }) ?? AppStore.toys[0];
    this.className = 'toy-preview';
    this.dataset.count = String(this.toy.count);
  }

  render(): void {
    this.innerHTML = `
      ${this.toy.getView({ type: ToyViewType.preview, toy: this.toy })}
    `;
  }

  attributeChangedCallback(
    title: string,
    oldValue: string,
    newValue: string
  ): void {
    this.toy.count = +newValue;
    this.render();
  }

  connectedCallback(): void {
    this.render();
  }
}

customElements.define('toys-element-preview-custom', ToyElementPreview, {
  extends: 'li',
});
