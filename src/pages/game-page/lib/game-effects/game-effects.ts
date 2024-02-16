import './game-effects.scss';

import img_snow from './assets/snow.svg';
import img_audio from './assets/audio.svg';

import AppStore from '../../../../store';

export class GameEffects extends HTMLDivElement {
  constructor() {
    super();
    this.className = 'game__effects';
  }

  render(): void {
    this.insertAdjacentHTML(
      'afterbegin',
      `
      <h4>Choose effects</h4>
      <ul class="effects__container">
      <li data-effect="music" class="effects_music">
      <label for="effects_music">
      <img src=${img_audio} alt="audio icon" />
      <input id="effects_music" type="checkbox">
      </label>
      
      </li>
      <li data-effect="snow" class="effects_snow">
      <label for="effects_snow">
      <img src=${img_snow} alt="snow icon" />
      <input id="effects_snow" type="checkbox">
      </label></li>
      
      </ul>
    `
    );
  }

  connectedCallback(): void {
    this.render();
    this.querySelector('#effects_music')?.addEventListener('change', (e) => {
      AppStore.gameSettings.isMusicPlaying = (
        e.target as HTMLInputElement
      ).checked;
    });

    this.querySelector('#effects_snow')?.addEventListener('change', (e) => {
      AppStore.gameSettings.isSnowing = (e.target as HTMLInputElement).checked;
    });
  }
}

customElements.define('game-effects-custom', GameEffects, {
  extends: 'div',
});
