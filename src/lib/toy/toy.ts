import { ToyViewType, type ToyType } from '../../types';
import icon__star_empty from './assets/icon-star-empty.svg';
import icon__star_full from './assets/icon-star-full.svg';
import icon__heart from './assets/icon-heart.svg';

import AppStore from '../../store';
import './lib/toy-ref/toy-ref';
import './toy.scss';

export class Toy {
  data: ToyType & { selected: boolean };

  constructor(toy: ToyType) {
    this.data = { ...toy, selected: false };
  }

  getView({ type }: { type: ToyViewType }): string {
    switch (type) {
      case ToyViewType.full:
        return `
    <h4>${this.data.title}</h4>
    <img class="toy-image" src="https://raw.githubusercontent.com/SavitskayaKseniya22/christmas-tree/5be0f234ea6fa4b689ad2752d11deafecf0897ee/src/assets/toys/${this.data.num}.png" alt="${this.data.title}" />
    <ul class="toy__features">
    <li class="toy__feature">Quantity: ${this.data.quantity}</li>
    <li class="toy__feature">Year of manufacture: ${this.data.year}</li>
    </ul>
    
    <div is="toy-ref-custom" size='${this.data.size}' color="${this.data.color}" shape='${this.data.shape}'></div>
    <div class="toy__status"> 
    ${this.data.favorite ? `<img src=${icon__heart} alt="Heart" />` : ''}
    ${this.data.selected ? `<img class="star-image" src=${icon__star_full} alt="Star" />` : `<img class="star-image" src=${icon__star_empty} alt="Star" />`}
    </div>
   
  `;

      case ToyViewType.preview:
        return `<li class="toy-preview"  data-num=${this.data.num}>
    <div class="count-toy">${this.data.quantity}</div>
    <img draggable="true" class="toy-image" data-count=${this.data.quantity} data-num=${this.data.num} src="https://raw.githubusercontent.com/SavitskayaKseniya22/christmas-tree/5be0f234ea6fa4b689ad2752d11deafecf0897ee/src/assets/toys/${this.data.num}.png" alt="${this.data.title}" /></li>`;
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
      ${this.toy.getView({ type: ToyViewType.full })}
   
    
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
