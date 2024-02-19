import './game-snowfall.scss';
import img_snow from '../../controls/game-effects/assets/snow.svg';

export class GameSnow extends HTMLDivElement {
  static observedAttributes = ['rerender'];
  content: string;
  constructor() {
    super();
    this.className = 'game__snowfall';
    this.content = `
      <ul class="snowfall">${`<li><img src=${img_snow} alt="snowflake" /></li>`.repeat(5)}</ul>
      <ul class="snowfall">${`<li><img src=${img_snow} alt="snowflake" /></li>`.repeat(5)}</ul>
      <ul class="snowfall">${`<li><img src=${img_snow} alt="snowflake" /></li>`.repeat(5)}</ul>
   
    `;
  }

  render(): void {
    this.innerHTML = '';
  }

  connectedCallback(): void {
    this.render();
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    this.innerHTML =
      name === 'rerender' && newValue === 'true' ? this.content : '';
  }
}

customElements.define('game-snow-custom', GameSnow, { extends: 'div' });
