import './main-page.scss';

export class MainPage extends HTMLElement {
  constructor() {
    super();
    this.className = 'main page_main';
  }

  render(): void {
    this.insertAdjacentHTML(
      'afterbegin',
      `
      <div class="page-main__container">
        <p>It's so long until Christmas... <br/> If you're tired of waiting, you can decorate the Christmas tree right now.</p>
        <a class="start-game" href="/#toys" title="Start decorating">Start decorating</a>
      </div>
    `
    );
  }

  connectedCallback(): void {
    this.render();
  }
}

customElements.define('main-page-custom', MainPage, { extends: 'main' });
