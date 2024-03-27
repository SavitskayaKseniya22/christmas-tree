import './toys-filters-favorite.scss';
import AppStore from '../../../../../../store';
import img_heart from '../../../../../../lib/toy/assets/icon-heart.svg';

export class ToysFiltersFavorite extends HTMLElement {
  constructor() {
    super();
    this.className = 'filter_favorite';
  }

  render(): void {
    this.insertAdjacentHTML(
      'afterbegin',
      `
     <input type="checkbox" id="favorite" />
     <label class="favorite-label" for="favorite" title="Select all favorite toys">
       <img src=${img_heart} alt="Heart" width="20" height="20" />
     </label>
    `
    );
  }

  connectedCallback(): void {
    this.render();
    this.querySelector('#favorite')?.addEventListener('change', (e) => {
      AppStore.filters.favorite = (e.target as HTMLInputElement).checked;
      AppStore.renderData();
    });
  }
}

customElements.define('toys-filters-favorite-custom', ToysFiltersFavorite, {
  extends: 'section',
});
