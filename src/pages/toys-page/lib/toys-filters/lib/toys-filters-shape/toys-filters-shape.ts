import './toys-filters-shape.scss';

import img_ball from '../../../../../../assets/toy-shapes/ball.svg';
import img_bell from '../../../../../../assets/toy-shapes/bell.svg';
import img_cone from '../../../../../../assets/toy-shapes/cone.svg';
import img_snowflake from '../../../../../../assets/toy-shapes/snowflake.svg';
import img_toy from '../../../../../../assets/toy-shapes/toy.svg';
import { ToyShapeType } from '../../../../../../types';
import AppStore from '../../../../../../store';

export class ToysFiltersShape extends HTMLElement {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  render(): void {
    this.insertAdjacentHTML(
      'afterbegin',
      `
          
            <ul class="shape-list">
              <li>
                <input type="checkbox" id=${ToyShapeType.BALL} class="shape__input" />
                <label class="shape-label" for=${ToyShapeType.BALL}>
                  <img src=${img_ball} alt="ball shape toy" />
                </label>
              </li>
              <li>
                <input type="checkbox" id=${ToyShapeType.BELL} class="shape__input" />
                <label class="shape-label" for=${ToyShapeType.BELL}>
                  <img src=${img_bell} alt="bell shape toy" />
                </label>
              </li>
              <li>
                <input type="checkbox" id=${ToyShapeType.CONE} class="shape__input" />
                <label class="shape-label" for=${ToyShapeType.CONE}>
                  <img src=${img_cone} alt="cone shapetoy" />
                </label>
              </li>
              <li>
                <input type="checkbox" id=${ToyShapeType.SNOWFLAKE} class="shape__input" />
                <label class="shape-label" for=${ToyShapeType.SNOWFLAKE}>
                  <img
                    src=${img_snowflake}
                    alt="snowflake shape toy"
                  />
                </label>
              </li>
              <li>
                <input type="checkbox" id=${ToyShapeType.TOY} class="shape__input" />
                <label class="shape-label" for=${ToyShapeType.TOY}>
                  <img src=${img_toy} alt="custom shape toy" />
                </label>
              </li>
            </ul>
    `
    );
  }

  connectedCallback(): void {
    this.render();

    this.querySelectorAll('.shape__input').forEach((item) => {
      item.addEventListener('click', (e) => {
        const { id, checked } = e.target as HTMLInputElement;
        if (checked) {
          AppStore.filters.shape.push(id as ToyShapeType);
        } else {
          AppStore.filters.shape = AppStore.filters.shape.filter(
            (item) => item !== id
          );
        }
        AppStore.renderData();
      });
    });
  }
}

customElements.define('toys-filters-shape-custom', ToysFiltersShape, {
  extends: 'section',
});
