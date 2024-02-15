import AppStore from '../../../../store';
import './toys-container.scss';

export class ToysContainer extends HTMLUListElement {
  static observedAttributes = ['rerender'];

  constructor() {
    super();
    this.className = 'toys-container';
  }

  render(): void {
    this.innerHTML = `
         ${AppStore.filteredToys
           .map((item) => {
             return `<li is="toys-element-custom" data-num=${item.data.num}></li>`;
           })
           .join(' ')}
    `;
  }

  connectedCallback(): void {
    this.render();
  }

  attributeChangedCallback(): void {
    this.render();
  }
}

customElements.define('toys-container-custom', ToysContainer, {
  extends: 'ul',
});
