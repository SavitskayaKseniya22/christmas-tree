import './toys-filters-color.scss';

import { ToyColorType } from '../../../../../../types';
import AppStore from '../../../../../../store';

export class ToysFiltersColor extends HTMLElement {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  render(): void {
    this.insertAdjacentHTML(
      'afterbegin',
      `
         
            <ul class="color-list">
              <li>
                <input type="checkbox" id=${ToyColorType.BLUE} class="color__input" />
                <label class="color-label" for=${ToyColorType.BLUE}>
                  
                </label>
              </li>
              <li>
                <input type="checkbox" id=${ToyColorType.GREEN} class="color__input" />
                <label class="color-label" for=${ToyColorType.GREEN}>
                  
                </label>
              </li>
              <li>
                <input type="checkbox" id=${ToyColorType.RED} class="color__input" />
                <label class="color-label" for=${ToyColorType.RED}>
                  
                </label>
              </li>
              <li>
                <input type="checkbox" id=${ToyColorType.WHITE} class="color__input" />
                <label class="color-label" for=${ToyColorType.WHITE}>
                 
                </label>
              </li>
              <li>
                <input type="checkbox" id=${ToyColorType.YELLOW} class="color__input" />
                <label class="color-label" for=${ToyColorType.YELLOW}>
                  
                </label>
              </li>
            </ul>
    `
    );
  }

  connectedCallback(): void {
    this.render();

    this.querySelectorAll('.color__input').forEach((item) => {
      item.addEventListener('click', (e) => {
        const { id, checked } = e.target as HTMLInputElement;
        if (checked) {
          AppStore.filters.color.push(id as ToyColorType);
        } else {
          AppStore.filters.color = AppStore.filters.color.filter(
            (item) => item !== id
          );
        }
        AppStore.renderData();
      });
    });
  }
}

customElements.define('toys-filters-color-custom', ToysFiltersColor, {
  extends: 'section',
});
