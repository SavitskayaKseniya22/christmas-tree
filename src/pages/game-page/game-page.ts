import './game-page.scss';
import './lib/controls/game-trees/game-trees';
import './lib/controls/game-background/game-background';
import './lib/controls/game-garland/game-garland';
import './lib/controls/game-effects/game-effects';
import './lib/containers/game-snowfall/game-snowfall';
import './lib/containers/game-background-image/game-background-image';
import './lib/containers/game-tree-image/game-tree-image';
import './lib/containers/game-garland-container/game-garland-container';
import AppStore from '../../store';
import { ToyViewType } from '../../types';

export class GameField extends HTMLDivElement {
  constructor() {
    super();
    this.className = 'game__field';
  }

  render(): void {
    this.insertAdjacentHTML(
      'afterbegin',
      `
        <div is="game-snow-custom"></div>
        <div is="game-garland-container-custom"></div>
        <img is="game-background-image-custom" />
        <img is="game-tree-image-custom" />
          
          
       
        <map name="image-map" class="map-tree">
            <area
              target=""
              alt="tree"
              title=""
              href=""
              coords="247,3,481,616,363,702,87,691,7,618"
              shape="poly"
            />
          </map>
    `
    );
  }

  connectedCallback(): void {
    this.render();
  }
}

customElements.define('game-field-custom', GameField, { extends: 'div' });

export class GamePage extends HTMLElement {
  static observedAttributes = ['rerender'];
  constructor() {
    super();
    this.className = 'main game-page';
  }

  render(): void {
    this.innerHTML = `
      <div class="game__column_left">
        <div is="game-trees-custom"></div>
        <div is="game-background-custom"></div>
        <div is="game-garland-custom"></div>
        <div is="game-effects-custom"></div>
        <button class="default-button game__button_reset">Reset</button>
      </div>
      <div is="game-field-custom"></div>
      <div class="game__column_right">
      <ul class="game__toys-list">
      
      ${AppStore.getSelectedToys()
        .map((toy) => {
          return toy.getView({ type: ToyViewType.preview });
        })
        .join(' ')}
      </ul>

      </div>
      
    `;
  }

  attributeChangedCallback(): void {
    this.connectedCallback();
  }

  connectedCallback(): void {
    this.render();

    this.querySelector('.game__button_reset')?.addEventListener('click', () => {
      this.setAttribute('rerender', 'true');
    });
  }
}

customElements.define('game-page-custom', GamePage, { extends: 'main' });
