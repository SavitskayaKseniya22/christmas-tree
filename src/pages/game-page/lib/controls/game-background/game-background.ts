import './game-background.scss';

import img_1 from './assets/1.jpg';
import img_2 from './assets/2.jpg';
import img_3 from './assets/3.jpg';
import img_4 from './assets/4.jpg';
import img_5 from './assets/5.jpg';
import img_6 from './assets/6.jpg';
import img_7 from './assets/7.jpg';
import img_8 from './assets/8.jpg';
import AppStore from '../../../../../store';

export class GameBackground extends HTMLDivElement {
  constructor() {
    super();
    this.className = 'game__background';
  }

  render(): void {
    this.insertAdjacentHTML(
      'afterbegin',
      `
<h4>Choose a background</h4>
<ul class="background__container">
  <li>
    <label for="background-1">
      <img src="${img_1}" alt="Background" />
      <input
        id="background-1"
        type="radio"
        name="background"
        data-src="${img_1}"
      />
    </label>
  </li>

  <li>
    <label for="background-2">
      <img src="${img_2}" alt="Background" />
      <input
        id="background-2"
        type="radio"
        name="background"
        data-src="${img_2}"
      />
    </label>
  </li>
  <li>
    <label for="background-3">
      <img src="${img_3}" alt="Background" />
      <input
        id="background-3"
        type="radio"
        name="background"
        data-src="${img_3}"
      />
    </label>
  </li>
  <li>
    <label for="background-4">
      <img src="${img_4}" alt="Background" />
      <input
        id="background-4"
        type="radio"
        name="background"
        data-src="${img_4}"
      />
    </label>
  </li>
  <li>
    <label for="background-5">
      <img src="${img_5}" alt="Background" />
      <input
        id="background-5"
        type="radio"
        name="background"
        data-src="${img_5}"
      />
    </label>
  </li>
  <li>
    <label for="background-6">
      <img src="${img_6}" alt="Background" />
      <input
        id="background-6"
        type="radio"
        name="background"
        data-src="${img_6}"
      />
    </label>
  </li>
  <li>
    <label for="background-7">
      <img src="${img_7}" alt="Background" />
      <input
        id="background-7"
        type="radio"
        name="background"
        data-src="${img_7}"
      />
    </label>
  </li>
  <li>
    <label for="background-8">
      <img src="${img_8}" alt="Background" />
      <input
        id="background-8"
        type="radio"
        name="background"
        data-src="${img_8}"
      />
    </label>
  </li>
</ul>
    `
    );
  }

  connectedCallback(): void {
    this.render();
    this.querySelectorAll('input[name="background"]').forEach((elem) => {
      elem.addEventListener('click', (e) => {
        if (e.target !== null) {
          const src = (e.target as HTMLElement).dataset.src;
          if (src !== undefined) {
            AppStore.updateBackground({ src });
          }
        }
      });
    });
  }
}

customElements.define('game-background-custom', GameBackground, {
  extends: 'div',
});
