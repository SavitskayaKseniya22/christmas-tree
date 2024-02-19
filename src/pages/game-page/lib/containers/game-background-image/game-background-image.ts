import AppStore from '../../../../../store';
import './game-background-image.scss';
import img_bg from '../../controls/game-background/assets/1.jpg';

export class GameBackgroundImage extends HTMLImageElement {
  static observedAttributes = ['rerender'];
  constructor() {
    super();
    this.alt = 'Background';
    this.className = 'game-field__background';
  }

  render(): void {
    this.src = AppStore.gameSettings.bg ?? img_bg;
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
