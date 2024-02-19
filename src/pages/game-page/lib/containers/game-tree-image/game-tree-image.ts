import AppStore from '../../../../../store';
import './game-tree-image.scss';

import img_tree from '../../controls/game-trees/assets/1.png';

export class GameTreeImage extends HTMLImageElement {
  static observedAttributes = ['rerender'];
  constructor() {
    super();
    this.alt = 'Tree';
    this.className = 'tree-container';
    this.useMap = '#image-map';
  }

  render(): void {
    this.src = AppStore.gameSettings.tree ?? img_tree;
  }

  connectedCallback(): void {
    this.render();
  }

  attributeChangedCallback(): void {
    this.connectedCallback();
  }
}

customElements.define('game-tree-image-custom', GameTreeImage, {
  extends: 'img',
});
