import * as noUiSlider from 'nouislider';
import AppStore from '../../../../../../store';
import { SliderType } from '../../../../../../types';
import 'nouislider/dist/nouislider.css';
import './slider.scss';

export class Slider extends HTMLDivElement {
  min: number;
  max: number;
  type: string;

  constructor() {
    super();
    this.min = Number(this.getAttribute('min'));
    this.max = Number(this.getAttribute('max'));
    const attr = this.getAttribute('type');

    this.type =
      attr === SliderType.QUANTITY || attr === SliderType.YEAR
        ? attr
        : SliderType.YEAR;

    noUiSlider.create(this, {
      start: [this.min, this.max],
      behaviour: 'drag',
      connect: true,
      tooltips: true,
      format: {
        to: function (value) {
          return parseInt(String(value));
        },
        from: function (value) {
          return Number(value);
        },
      },
      range: {
        min: this.min,
        max: this.max,
      },
    });
  }

  render(): void {
    this.insertAdjacentHTML(
      'afterbegin',
      `   
    `
    );
  }

  connectedCallback(): void {
    this.render();

    (this as noUiSlider.target).noUiSlider?.on('change', (e) => {
      if (this.type === SliderType.YEAR) {
        AppStore.filters.year = e as [number, number];
      } else if (this.type === SliderType.QUANTITY) {
        AppStore.filters.quantity = e as [number, number];
      }
      AppStore.renderData();
    });
  }
}

customElements.define('slider-custom', Slider, {
  extends: 'div',
});
