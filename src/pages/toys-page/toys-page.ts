import './toys-page.scss';
import './lib/toys-container/toys-container';
import './lib/toys-filters/toys-filters';

export class ToysPage extends HTMLElement {
  constructor() {
    super();
    this.className = 'main';
  }

  render(): void {
    this.insertAdjacentHTML(
      'afterbegin',
      `
      <div is="toys-filters-custom"></div>
      <ul is="toys-container-custom"></ul>
    `
    );
  }

  connectedCallback(): void {
    this.render();
  }
}

customElements.define('toys-page-custom', ToysPage, { extends: 'main' });
