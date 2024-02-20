import './game-background-image.scss';
import AppStore from '../../../../../../store';

export class GameBackgroundImage extends HTMLImageElement {
  static observedAttributes = ['rerender'];
  constructor() {
    super();
    this.alt = 'Background';
    this.className = 'game-field__background';
  }

  render(): void {
    this.src = AppStore.settings.bg;
  }

  connectedCallback(): void {
    this.render();
  }

  attributeChangedCallback(): void {
    this.connectedCallback();
  }
}

customElements.define('game-background-image-custom', GameBackgroundImage, {
  extends: 'img',
});
