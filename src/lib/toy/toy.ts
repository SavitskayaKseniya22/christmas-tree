import { ToyViewType, type ToyType } from '../../types';
import icon__star_empty from './assets/icon-star-empty.svg';
import icon__star_full from './assets/icon-star-full.svg';
import icon__heart from './assets/icon-heart.svg';
import img_toy from '../../assets/toys/1.png';
import './toy.scss';
import AppStore from '../../store';
import './lib/toy-ref/toy-ref';

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
    <img class="toy-image" src=${img_toy} alt="${this.data.title}" />
    <ul class="toy__features">
      <li class="toy__feature">${this.data.quantity}</li>
    <li class="toy__feature">${this.data.year}</li>
    </ul>
    
    <div is="toy-ref-custom" size='${this.data.size}' color="${this.data.color}" shape='${this.data.shape}'></div>
    <div class="toy__status"> 
    ${this.data.favorite ? `<img src=${icon__heart} alt="Heart" />` : ''}
    ${this.data.selected ? `<img class="star-image" src=${icon__star_full} alt="Star" />` : `<img class="star-image" src=${icon__star_empty} alt="Star" />`}
    </div>
   
  `;

      case ToyViewType.preview:
        return `<li class="toy-preview" draggable="true" data-num=${this.data.num}>
    <span class="count-toy">${this.data.quantity}</span>
    <img class="toy-image" data-count=${this.data.quantity} data-num=${this.data.num} src=./assets/toys/${this.data.num}.png alt=${this.data.title} /></li>`;
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
