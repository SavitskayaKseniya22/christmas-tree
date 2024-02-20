/* eslint-disable @typescript-eslint/no-floating-promises */
import './game-effects.scss';

import img_snow from './assets/snow.svg';
import img_audio from './assets/audio.svg';
import track_audio from './assets/audio.mp3';
import AppStore from '../../../../../../store';

export class GameEffects extends HTMLDivElement {
  constructor() {
    super();
    this.className = 'game-controls__effects';
  }

  render(): void {
    this.insertAdjacentHTML(
      'afterbegin',
      `
      <h4>Choose effects</h4>
<ul class="game-controls__effects-container">
  <li data-effect="music" class="game-controls__effects-music">
    <input id="game-controls__effects-music" type="checkbox" />
    <label for="game-controls__effects-music">
      <audio class="effects-music__audio" src="${track_audio}"></audio>
      <img src="${img_audio}" alt="audio icon" />
    </label>
  </li>
  <li data-effect="snow" class="game-controls__effects-snow">
    <input id="game-controls__effects-snow" type="checkbox" />
    <label for="game-controls__effects-snow">
      <img src="${img_snow}" alt="snow icon" />
    </label>
  </li>
</ul>
    `
    );
  }

  connectedCallback(): void {
    this.render();
    this.querySelector('#game-controls__effects-music')?.addEventListener(
      'change',
      (e) => {
        const checked = (e.target as HTMLInputElement).checked;

        AppStore.settings.isMusicPlaying = checked;

        const audio = this.querySelector('.effects-music__audio');

        if (audio !== null) {
          if (checked) {
            (audio as HTMLAudioElement).play();
          } else {
            (audio as HTMLAudioElement).pause();
          }
        }
      }
    );

    this.querySelector('#game-controls__effects-snow')?.addEventListener(
      'change',
      (e) => {
        AppStore.updateSnow({
          checked: (e.target as HTMLInputElement).checked,
        });
      }
    );
  }
}

customElements.define('game-effects-custom', GameEffects, {
  extends: 'div',
});
