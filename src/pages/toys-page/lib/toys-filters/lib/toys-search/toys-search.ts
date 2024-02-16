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
       
          <div class="default-button search__input-container">
          <input
            type="text"
            name="search"
           
            id="search"
            placeholder="Search"
            autocomplete="off"
            autofocus
          />
          <button class="button_search-clear">
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
