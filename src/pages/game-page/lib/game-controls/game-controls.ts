import './lib/game-trees/game-trees';
import './lib/game-background/game-background';
import './lib/game-garland/game-garland';
import './lib/game-effects/game-effects';
import AppStore from '../../../../store';
import './game-controls.scss';

export class GameControls extends HTMLDivElement {
  constructor() {
    super();
    this.className = 'game__controls';
  }

  render(): void {
    this.innerHTML = `
        <div is="game-trees-custom"></div>
        <div is="game-background-custom"></div>
        <div is="game-garland-custom"></div>
        <div is="game-effects-custom"></div>
        <button class="btn_default btn_reset-settings" title="Reset the field">Reset</button>  
    `;
  }

  connectedCallback(): void {
    this.render();

    this.querySelector('.btn_reset-settings')?.addEventListener('click', () => {
      AppStore.clearSettings();
    });
  }
}

customElements.define('game-controls-custom', GameControls, {
  extends: 'div',
});
