import AppStore from '../../../../../../store';
import './toys-search.scss';
import img_cross from '../../../../../../assets/svg/close.svg';

export class ToysSearch extends HTMLElement {
  constructor() {
    super();
    this.className = 'search';
  }

  render(): void {
    this.insertAdjacentHTML(
      'afterbegin',
      `
        <div class="btn_default search__input-container">
          <input
            type="text"
            name="search"
            title="Search a toy by a name"
            id="search"
            placeholder="Search"
            autocomplete="off"
            autofocus
          />
          <button class="btn_search-clear" title="Clear the search field">
              <img src=${img_cross} alt="cross">
          </button>
        </div>  
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
      this.querySelector('.btn_search-clear')?.addEventListener(
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
