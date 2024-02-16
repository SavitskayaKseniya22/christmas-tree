import './game-page.scss';
import './lib/game-trees/game-trees';
import './lib/game-background/game-background';
import './lib/game-garland/game-garland';
import './lib/game-effects/game-effects';

export class GamePage extends HTMLElement {
  constructor() {
    super();
    this.className = 'main game-page';
  }

  render(): void {
    this.insertAdjacentHTML(
      'afterbegin',
      `
      <div class="game__column_left">
      <div is="game-trees-custom"></div>
      <div is="game-background-custom"></div>
      <div is="game-garland-custom"></div>
      <div is="game-effects-custom"></div>
      </div>
      <div class="game__field"></div>
      <div class="game__column_right"></div>
      
    `
    );
  }

  connectedCallback(): void {
    this.render();
  }
}

customElements.define('game-page-custom', GamePage, { extends: 'main' });
