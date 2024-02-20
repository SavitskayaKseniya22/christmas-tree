import './lib/game-trees/game-trees';
import './lib/game-background/game-background';
import './lib/game-garland/game-garland';
import './lib/game-effects/game-effects';
import AppStore from '../../../../store';
import './game-controls.scss';

export class GameControls extends HTMLDivElement {
  constructor() {
    super();
    this.className = 'game__column_left';
  }

  render(): void {
    this.innerHTML = `
        <div is="game-trees-custom"></div>
        <div is="game-background-custom"></div>
        <div is="game-garland-custom"></div>
        <div is="game-effects-custom"></div>
        <button class="default-button game__button_reset">Reset</button>  
    `;
  }

  connectedCallback(): void {
    this.render();

    this.querySelector('.game__button_reset')?.addEventListener('click', () => {
      AppStore.clearSettings();
    });
  }
}

customElements.define('game-controls-custom', GameControls, {
  extends: 'div',
});
