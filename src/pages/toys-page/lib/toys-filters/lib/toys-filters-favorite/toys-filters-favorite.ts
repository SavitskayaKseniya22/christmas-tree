import './toys-filters-favorite.scss';

import AppStore from '../../../../../../store';
import img_heart from '../../../../../../lib/toy/assets/icon-heart.svg';

export class ToysFiltersFavorite extends HTMLElement {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
    this.className = 'filter_favorite';
  }

  render(): void {
    this.insertAdjacentHTML(
      'afterbegin',
      `
         
            <input type="checkbox" id="favorite" />
                <label class="favorite-label" for="favorite">
                  <img src=${img_heart} alt="Star" />
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
