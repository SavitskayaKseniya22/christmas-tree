/* eslint-disable @typescript-eslint/no-floating-promises */
import './game-effects.scss';

import img_snow from './assets/snow.svg';
import img_audio from './assets/audio.svg';
import track_audio from './assets/audio.mp3';
import AppStore from '../../../../../../store';

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
    <input id="effects_music" type="checkbox" />
    <label for="effects_music">
      <audio class="effects-music__audio" src="${track_audio}"></audio>
      <img src="${img_audio}" alt="audio icon" />
    </label>
  </li>
  <li data-effect="snow" class="effects_snow">
    <input id="effects_snow" type="checkbox" />
    <label for="effects_snow">
      <img src="${img_snow}" alt="snow icon" />
    </label>
  </li>
</ul>
    `
    );
  }

  connectedCallback(): void {
    this.render();
    this.querySelector('#effects_music')?.addEventListener('change', (e) => {
      const checked = (e.target as HTMLInputElement).checked;

      AppStore.gameSettings.isMusicPlaying = checked;

      const audio = this.querySelector('.effects-music__audio');

      if (audio !== null) {
        if (checked) {
          (audio as HTMLAudioElement).play();
        } else {
          (audio as HTMLAudioElement).pause();
        }
      }
    });

    this.querySelector('#effects_snow')?.addEventListener('change', (e) => {
      AppStore.updateSnow({ checked: (e.target as HTMLInputElement).checked });
    });
  }
}

customElements.define('game-effects-custom', GameEffects, {
  extends: 'div',
});
