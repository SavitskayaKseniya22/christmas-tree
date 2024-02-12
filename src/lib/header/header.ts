import './header.scss';
import ball from './assets/icon-ball.svg';

export default class Header extends HTMLElement {
  constructor() {
    super();
    this.className = 'header';
  }

  render(): void {
    this.insertAdjacentHTML(
      'afterbegin',
      `
      <a href="/#toys" class="nav_link ${window.location.hash === '#toys' ? 'active' : ''}">
      <h2>Toys</h2>
      </a>

      <a href="#">
       <img src=${ball} alt="ball" />
      </a>
     
      <a href="/#game" class="nav_link ${window.location.hash === '#game' ? 'active' : ''}">
      <h2>Game</h2>
      </a>
    
    `
    );
  }

  connectedCallback(): void {
    this.render();

    window.addEventListener(
      'hashchange',
      (e) => {
        this.querySelectorAll('.nav_link').forEach((elem) => {
          if (elem.getAttribute('href') === `/${window.location.hash}`) {
            elem.classList.add('active');
          } else {
            elem.classList.remove('active');
          }
        });
      },
      false
    );
  }
}

customElements.define('header-custom', Header, { extends: 'header' });
