import './toys-filters-size.scss';

import img_ball from '../../../../../../assets/toy-shapes/ball.svg';

import AppStore from '../../../../../../store';
import { ToySizeType } from '../../../../../../types';

export class ToysFiltersSize extends HTMLElement {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  render(): void {
    this.insertAdjacentHTML(
      'afterbegin',
      `
          
            <ul class="size-list">
              <li>
                <input type="checkbox" id=${ToySizeType.BIG} class="size__input" />
                <label class="size-label size-label_big" for=${ToySizeType.BIG} title="Select all big toys">
                  <img src=${img_ball} alt="ball size toy" />
                </label>
              </li>
              <li>
                <input type="checkbox" id=${ToySizeType.MEDIUM} class="size__input" />
                <label class="size-label size-label_medium" for=${ToySizeType.MEDIUM} title="Select all medium toys">
                  <img src=${img_ball} alt="ball size toy" />
                </label>
              </li>
              <li>
                <input type="checkbox" id=${ToySizeType.SMALL} class="size__input" />
                <label class="size-label size-label_small" for=${ToySizeType.SMALL} title="Select all small toys">
                  <img src=${img_ball} alt="ball size toy" />
                </label>
              </li>
              
            </ul>
    `
    );
  }

  connectedCallback(): void {
    this.render();

    this.querySelectorAll('.size__input').forEach((item) => {
      item.addEventListener('click', (e) => {
        const { id, checked } = e.target as HTMLInputElement;
        if (checked) {
          AppStore.filters.size.push(id as ToySizeType);
        } else {
          AppStore.filters.size = AppStore.filters.size.filter(
            (item) => item !== id
          );
        }
        AppStore.renderData();
      });
    });
  }
}

customElements.define('toys-filters-size-custom', ToysFiltersSize, {
  extends: 'section',
});
