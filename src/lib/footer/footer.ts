import './footer.scss';
import img_github from './assets/github-mark.svg';

export default class Footer extends HTMLElement {
  constructor() {
    super();
    this.className = 'footer';
  }

  render(): void {
    this.insertAdjacentHTML(
      'afterbegin',
      `
        <a href="https://github.com/SavitskayaKseniya22" target="_blank">
          <img src=${img_github} alt="GitHub" width="30" height="30" />
        </a>
      <span>2021-2024</span>
    `
    );
  }

  connectedCallback(): void {
    this.render();
  }
}

customElements.define('footer-custom', Footer, { extends: 'footer' });
