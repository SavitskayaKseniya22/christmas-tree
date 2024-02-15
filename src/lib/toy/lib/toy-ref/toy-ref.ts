import './toy-ref.scss';

import img_ball from '../../../../assets/toy-shapes/ball.svg';
import img_bell from '../../../../assets/toy-shapes/bell.svg';
import img_cone from '../../../../assets/toy-shapes/cone.svg';
import img_snowflake from '../../../../assets/toy-shapes/snowflake.svg';
import img_toy from '../../../../assets/toy-shapes/toy.svg';

import { ToyShapeType } from '../../../../types';

export class ToyRef extends HTMLDivElement {
  size: string | null;
  color: string | null;
  shape: string | null;

  constructor() {
    super();
    this.size = this.getAttribute('size');
    this.color = this.getAttribute('color');
    this.shape = this.getAttribute('shape');
    this.className = `toy-ref color_${this.color}`;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  checkSRC({ shape }: { shape: string | null }) {
    switch (shape) {
      case ToyShapeType.BALL:
        return img_ball;

      case ToyShapeType.BELL:
        return img_bell;

      case ToyShapeType.CONE:
        return img_cone;

      case ToyShapeType.TOY:
        return img_toy;

      case ToyShapeType.SNOWFLAKE:
        return img_snowflake;

      default:
        return img_ball;
    }
  }

  render(): void {
    this.insertAdjacentHTML(
      'afterbegin',
      `<img src='${this.checkSRC({ shape: this.shape })}' class='size_${this.size}' alt="${this.shape != null || 'toy'}"></img>
      
    `
    );
  }

  connectedCallback(): void {
    this.render();
  }
}

customElements.define('toy-ref-custom', ToyRef, { extends: 'div' });
