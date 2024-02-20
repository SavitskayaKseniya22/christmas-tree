import AppStore from '../../../../../../store';
import './game-garland-container.scss';

export class GameGarlandContainer extends HTMLDivElement {
  static observedAttributes = ['rerender'];
  color: string | null;

  constructor() {
    super();

    this.className = 'game-field__garland';
    this.color = AppStore.settings.garlandType;
  }

  render(): void {
    this.innerHTML = '';
  }

  connectedCallback(): void {
    this.render();
  }

  attributeChangedCallback(): void {
    this.color = AppStore.settings.garlandType;
    if (this.color !== null) {
      this.innerHTML = `<ul class="garland-block garland-block_first">
    ${`<li class="garland_${this.color}"></li>`.repeat(8)}
  </ul>
  <ul class="garland-block garland-block_second">
  ${`<li class="garland_${this.color}"></li>`.repeat(8)}
  </ul>
  <ul class="garland-block garland-block_third">
  ${`<li class="garland_${this.color}"></li>`.repeat(8)}
  </ul>
  <ul class="garland-block garland-block_fourth">
 ${`<li class="garland_${this.color}"></li>`.repeat(8)}
  </ul>
  <ul class="garland-block garland-block_fifth">
  ${`<li class="garland_${this.color}"></li>`.repeat(8)}
  </ul>`;
    } else {
      this.render();
    }
  }
}

customElements.define('game-garland-container-custom', GameGarlandContainer, {
  extends: 'div',
});
