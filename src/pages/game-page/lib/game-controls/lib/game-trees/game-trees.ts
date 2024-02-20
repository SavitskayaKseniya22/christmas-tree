import './game-trees.scss';

import img_1 from '../../../../../../assets/trees/1.png';
import img_2 from '../../../../../../assets/trees/2.png';
import img_3 from '../../../../../../assets/trees/3.png';
import img_4 from '../../../../../../assets/trees/4.png';
import img_5 from '../../../../../../assets/trees/5.png';
import img_6 from '../../../../../../assets/trees/6.png';
import AppStore from '../../../../../../store';

export class GameTrees extends HTMLDivElement {
  constructor() {
    super();
    this.className = 'game-controls__tree';
  }

  render(): void {
    this.insertAdjacentHTML(
      'afterbegin',
      `
      <h4>Choose a tree</h4>
      <ul class="game-controls__trees-container">

      <li data-src=${img_1}>
      <label for="tree-1">
      <img src=${img_1} alt="Tree" />
      <input id="tree-1" type="radio" name="tree" data-src=${img_1}>
      </label>
      </li>

       <li>
      <label for="tree-2">
      <img src=${img_2} alt="Tree" />
      <input id="tree-2" type="radio" name="tree" data-src=${img_2}>
      </label>
      </li>
       <li>
      <label for="tree-3">
      <img src=${img_3} alt="Tree" />
      <input id="tree-3" type="radio" name="tree" data-src=${img_3}>
      </label>
      </li>
       <li>
      <label for="tree-4">
      <img src=${img_4} alt="Tree" />
      <input id="tree-4" type="radio" name="tree" data-src=${img_4}>
      </label>
      </li>
       <li>
      <label for="tree-5">
      <img src=${img_5} alt="Tree" />
      <input id="tree-5" type="radio" name="tree" data-src=${img_5}>
      </label>
      </li>
       <li>
      <label for="tree-6">
      <img src=${img_6} alt="Tree" />
      <input id="tree-6" type="radio" name="tree" data-src=${img_6}>
      </label>
      </li>
      </ul>
    `
    );
  }

  connectedCallback(): void {
    this.render();
    this.querySelectorAll('input[name="tree"]').forEach((elem) => {
      elem.addEventListener('click', (e) => {
        if (e.target !== null) {
          const src = (e.target as HTMLElement).dataset.src;
          if (src !== undefined) {
            AppStore.updateTree({ src });
          }
        }
      });
    });
  }
}

customElements.define('game-trees-custom', GameTrees, { extends: 'div' });
