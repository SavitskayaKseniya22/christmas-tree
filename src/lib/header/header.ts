import './header.scss';
import ball from './assets/icon-ball-Copy.svg';

export default class Header extends HTMLElement {
  constructor() {
    super();
    this.className = `header ${window.location.hash === '' ? 'header_main' : ''}`;
  }

  render(): void {
    this.insertAdjacentHTML(
      'afterbegin',
      `
      <a href="/#toys" class="nav__link ${window.location.hash === '#toys' ? 'nav__link_active' : ''}" title="Choose and sort toys">
        <h2>Choose and sort toys</h2>
      </a>
      <a href="#" title="Go to main page">
       <img src=${ball} alt="ball" width="42" height="56" />
      </a>
      <a href="/#game" class="nav__link ${window.location.hash === '#game' ? 'nav__link_active' : ''}" title="Decorate the tree">
        <h2>Decorate the tree</h2>
      </a>
    `
    );
  }

  connectedCallback(): void {
    this.render();

    window.addEventListener(
      'hashchange',
      (e) => {
        this.querySelectorAll('.nav__link').forEach((elem) => {
          if (elem.getAttribute('href') === `/${window.location.hash}`) {
            elem.classList.add('nav__link_active');
          } else {
            elem.classList.remove('nav__link_active');
          }
        });
        if (window.location.hash === '') {
          this.classList.add('header_main');
        } else {
          this.classList.remove('header_main');
        }
      },
      false
    );
  }
}

customElements.define('header-custom', Header, { extends: 'header' });
