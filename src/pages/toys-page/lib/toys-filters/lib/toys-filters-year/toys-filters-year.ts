import { SliderType } from '../../../../../../types';
import './toys-filters-year.scss';
import '../slider/slider';

export class ToysFiltersYear extends HTMLElement {
  constructor() {
    super();
    this.className = 'filters__year';
  }

  render(): void {
    this.insertAdjacentHTML(
      'afterbegin',
      `
          <h4>Year of manufacture</h4>
          <div is="slider-custom" min="1940" max="2020" type=${SliderType.YEAR} title="Limit the search period by year"></div>
    `
    );
  }

  connectedCallback(): void {
    this.render();
  }
}

customElements.define('toys-filters-year-custom', ToysFiltersYear, {
  extends: 'section',
});
