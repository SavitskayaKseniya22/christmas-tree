import './game-snowfall.scss';

export class GameSnow extends HTMLUListElement {
  static observedAttributes = ['data-enabled'];

  content: string;
  constructor() {
    super();
    this.className = 'game-field__snowfall';
    this.content = `
      
  <li class="snowflake">
    <div class="inner">&#10052;</div>
  </li>
  <li class="snowflake">
    <div class="inner">&#10052;</div>
  </li>
  <li class="snowflake">
    <div class="inner">&#10052;</div>
  </li>
  <li class="snowflake">
    <div class="inner">&#10052;</div>
  </li>
  <li class="snowflake">
    <div class="inner">&#10052;</div>
  </li>
  <li class="snowflake">
    <div class="inner">&#10052;</div>
  </li>
  <li class="snowflake">
    <div class="inner">&#10052;</div>
  </li>
  <li class="snowflake">
    <div class="inner">&#10052;</div>
  </li>
  <li class="snowflake">
    <div class="inner">&#10052;</div>
  </li>
  <li class="snowflake">
    <div class="inner">&#10052;</div>
  </li>
  <li class="snowflake">
    <div class="inner">&#10052;</div>
  </li>
  <li class="snowflake">
    <div class="inner">&#10052;</div>
  </li>
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
    if (name === 'data-enabled') {
      this.innerHTML = newValue === 'true' ? this.content : '';
    }
  }
}

customElements.define('game-snow-custom', GameSnow, { extends: 'ul' });
