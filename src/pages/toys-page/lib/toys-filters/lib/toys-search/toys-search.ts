import AppStore from '../../../../../../store';
import './toys-search.scss';

export class ToysSearch extends HTMLElement {
  constructor() {
    super();
    this.className = 'search';
  }

  render(): void {
    this.insertAdjacentHTML(
      'afterbegin',
      `
       <label for="search" class="label-title">
          <h3>Search</h3>
          </label>
          <input
            type="text"
            name="search"
            class="default-button"
            id="search"
            placeholder="Search"
            autocomplete="off"
            autofocus
          />
          <button class="default-button button_search-clear">
              Clear the search
      </button>
         
    `
    );
  }

  connectedCallback(): void {
    this.render();
    const searchElem = this.querySelector('#search');
    if (searchElem !== null) {
      searchElem.addEventListener('input', (e) => {
        AppStore.filters.search = (e.target as HTMLInputElement).value;
        AppStore.renderData();
      });
      this.querySelector('.button_search-clear')?.addEventListener(
        'click',
        (e) => {
          (searchElem as HTMLInputElement).value = '';
          AppStore.filters.search = '';
          AppStore.renderData();
        }
      );
    }
  }
}

customElements.define('toys-filters-search-custom', ToysSearch, {
  extends: 'section',
});
