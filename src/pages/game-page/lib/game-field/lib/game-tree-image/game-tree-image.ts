import AppStore from '../../../../../../store';
import './game-tree-image.scss';

export class GameTreeImage extends HTMLImageElement {
  static observedAttributes = ['rerender'];
  constructor() {
    super();
    this.alt = 'Tree';
    this.className = 'game-field__tree';
    this.useMap = '#image-map';
    this.src = AppStore.settings.tree;
  }

  attributeChangedCallback(): void {
    this.src = AppStore.settings.tree;
  }
}

customElements.define('game-tree-image-custom', GameTreeImage, {
  extends: 'img',
});
