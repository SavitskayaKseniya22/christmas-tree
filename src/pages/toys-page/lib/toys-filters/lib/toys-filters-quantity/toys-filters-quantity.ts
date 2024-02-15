import { SliderType } from '../../../../../../types';
import './toys-filters-quantity.scss';

export class ToysFiltersQuantity extends HTMLElement {
  constructor() {
    super();
    this.className = 'filters__quantity';
  }

  render(): void {
    this.insertAdjacentHTML(
      'afterbegin',
      `
          <h4>Quantity</h4>
          <div is="slider-custom" min="1" max="12" type=${SliderType.QUANTITY}></div>
    `
    );
  }

  connectedCallback(): void {
    this.render();
  }
}

customElements.define('toys-filters-quantity-custom', ToysFiltersQuantity, {
  extends: 'section',
});
