import './toys-filters-selected.scss';

import AppStore from '../../../../../../store';
import img_star from '../../../../../../lib/toy/assets/icon-star-full.svg';

export class ToysFiltersSelected extends HTMLElement {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
    this.className = 'filter_selected';
  }

  render(): void {
    this.insertAdjacentHTML(
      'afterbegin',
      `
    <input type="checkbox" id="selected" />
    <label class="selected-label" for="selected" title="Select all selected toys"><img src=${img_star} alt="Star" width="20" height="20" /></label>
    `
    );
  }

  connectedCallback(): void {
    this.render();

    this.querySelector('#selected')?.addEventListener('change', (e) => {
      AppStore.filters.selected = (e.target as HTMLInputElement).checked;
      AppStore.renderData();
    });
  }
}

customElements.define('toys-filters-selected-custom', ToysFiltersSelected, {
  extends: 'section',
});
