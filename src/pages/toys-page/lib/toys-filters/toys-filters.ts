import './lib/toys-filters-order/toys-filters-order';
import './lib/toys-filters-shape/toys-filters-shape';
import './lib/toys-filters-color/toys-filters-color';
import './lib/toys-filters-size/toys-filters-size';
import './lib/toys-filters-selected/toys-filters-selected';
import './lib/toys-filters-favorite/toys-filters-favorite';
import './lib/toys-filters-year/toys-filters-year';
import './lib/toys-filters-quantity/toys-filters-quantity';
import './lib/toys-search/toys-search';
import './toys-filters.scss';
import AppStore from '../../../../store';

export class ToysFilters extends HTMLDivElement {
  static observedAttributes = ['rerender'];

  constructor() {
    super();
    this.className = 'filters';
  }

  render(): void {
    this.innerHTML = `<div class="filters__container">
      <section is="toys-filters-search-custom"></section>
       <section is="toys-filters-order-custom"></section>
      <section class="filters_detailed">
       <h3>Filters</h3>
       <section is="toys-filters-shape-custom"></section>
       <section is="toys-filters-color-custom"></section>
       <section is="toys-filters-size-custom"></section>
       <section is="toys-filters-selected-custom"></section>
       <section is="toys-filters-favorite-custom"></section>
       <section is="toys-filters-year-custom"></section>
       <section is="toys-filters-quantity-custom"></section>
      </section>
      <section>
      <button class="btn_default btn_drop-filters" title="Drop all filters">Drop all filters</button>
      </section>
      <section >
      <button class="btn_default btn_clear-selection" title="Clear the selection">Clear the selection</button>
      </section>
      </div>`;
  }

  connectedCallback(): void {
    this.render();

    this.querySelector('.btn_drop-filters')?.addEventListener('click', (e) => {
      AppStore.clearFilters();
    });

    this.querySelector('.btn_clear-selection')?.addEventListener(
      'click',
      (e) => {
        AppStore.clearSelection();
      }
    );
  }

  attributeChangedCallback(): void {
    this.connectedCallback();
  }
}

customElements.define('toys-filters-custom', ToysFilters, { extends: 'div' });
