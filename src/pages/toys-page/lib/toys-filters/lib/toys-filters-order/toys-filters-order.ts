import AppStore from '../../../../../../store';
import { OrderType } from '../../../../../../types';
import './toys-filters-order.scss';

export class ToysFiltersOrder extends HTMLElement {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  render(): void {
    this.insertAdjacentHTML(
      'afterbegin',
      `
          <select size="1" id="filter_order" class="btn_default">
            <option value=${OrderType.TITLEUP}>By title &uarr;</option>
            <option value=${OrderType.TITLEDOWN}>By title &darr;</option>
            <option value=${OrderType.YEARUP}>By year &uarr;</option>
            <option value=${OrderType.YEARDOWN}>By year &darr;</option>
            <option value=${OrderType.QUANTITYUP}>By quantity &uarr;</option>
            <option value=${OrderType.QUANTITYDOWN}>By quantity &darr;</option>
          </select>
    `
    );
  }

  connectedCallback(): void {
    this.render();

    this.querySelector('#filter_order')?.addEventListener('change', (e) => {
      AppStore.filters.order = (e.target as HTMLSelectElement)
        .value as OrderType;
      AppStore.renderData();
    });
  }
}

customElements.define('toys-filters-order-custom', ToysFiltersOrder, {
  extends: 'section',
});
