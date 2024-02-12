import './main-page.scss';

export class MainPage extends HTMLElement {
  constructor() {
    super();
    this.className = 'main';
  }

  render(): void {
    this.insertAdjacentHTML(
      'afterbegin',
      `
      <button class="start-game">
        <a href="/#toys">Наряжать ёлку!</a>
      </button>
    `
    );
  }

  connectedCallback(): void {
    this.render();
  }
}

customElements.define('main-page-custom', MainPage, { extends: 'main' });
