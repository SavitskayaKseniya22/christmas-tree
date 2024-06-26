import './game-field.scss';
import './lib/game-snowfall/game-snowfall';
import './lib/game-background-image/game-background-image';
import './lib/game-tree-image/game-tree-image';
import './lib/game-garland-container/game-garland-container';

export class GameField extends HTMLDivElement {
  constructor() {
    super();
    this.className = 'game__field';
  }

  render(): void {
    this.insertAdjacentHTML(
      'afterbegin',
      `
        <ul is="game-snow-custom"></ul>
        <img is="game-background-image-custom" />
        
        <div class="game-field__container">
          <img is="game-tree-image-custom" />
          <div is="game-garland-container-custom"></div>
        </div>
          
        <map name="image-map" class="game-field__drop-map">
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
