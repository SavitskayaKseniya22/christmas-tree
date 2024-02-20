import './game-garland.scss';

import img_cross from './assets/close-white.svg';
import AppStore from '../../../../../../store';

export class GameGarland extends HTMLDivElement {
  constructor() {
    super();
    this.className = 'game-controls__garland';
  }

  render(): void {
    this.insertAdjacentHTML(
      'afterbegin',
      `
<h4>Choose a garland's color</h4>
<ul class="game-controls__garlands-container">
  <li>
    <input id="garland-1" type="radio" name="garland" data-color="white" />
    <label for="garland-1" class="garland_white"></label>
  </li>
  <li>
    <input id="garland-2" type="radio" name="garland" data-color="yellow" />
    <label for="garland-2" class="garland_yellow"></label>
  </li>
  <li>
    <input id="garland-3" type="radio" name="garland" data-color="red" />
    <label for="garland-3" class="garland_red"></label>
  </li>
  <li>
    <input id="garland-4" type="radio" name="garland" data-color="blue" />
    <label for="garland-4" class="garland_blue"></label>
  </li>
  <li>
    <input id="garland-5" type="radio" name="garland" data-color="green" />
    <label for="garland-5" class="garland_green"></label>
  </li>
  <li>
    <input
      id="garland-6"
      type="radio"
      name="garland"
      data-color="none"
      checked
    />
    <label for="garland-6" class="garland_none">
      <img src="${img_cross}" alt="cross" />
    </label>
  </li>
</ul>
    `
    );
  }

  connectedCallback(): void {
    this.render();
    this.querySelectorAll('input[name="garland"]').forEach((elem) => {
      elem.addEventListener('click', (e) => {
        if (e.target !== null) {
          const color = (e.target as HTMLElement).dataset.color;
          if (color !== undefined) {
            AppStore.updateGarland({ color });
          }
        }
      });
    });
  }
}

customElements.define('game-garland-custom', GameGarland, {
  extends: 'div',
});
