/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import './game-page.scss';
import './lib/game-controls/game-controls';
import './lib/game-field/game-field';
import AppStore from '../../store';

export class GamePage extends HTMLElement {
  static observedAttributes = ['rerender'];
  constructor() {
    super();
    this.className = 'main page_game';
  }

  render(): void {
    this.innerHTML = `
      <div is="game-controls-custom"></div>
      <div is="game-field-custom"></div>
      <div class="game__toys-container">
      <ul class="game__toys-list">
      
      ${AppStore.getSelectedToys()
        .map((toy) => {
          return `<li is="toys-element-preview-custom" data-num=${toy.data.num}></li>`;
        })
        .join(' ')}
      </ul>

      </div>
      
    `;
  }

  static setCoords(element: HTMLElement, e: Event, block: Element): void {
    const { pageX, pageY } = e as MouseEvent;
    element.style.left = ` ${pageX - (block.getBoundingClientRect().left + 20 + window.scrollX)}px`;
    element.style.top = `${pageY - (block.getBoundingClientRect().top + 20 + window.scrollY)}px`;
  }

  attributeChangedCallback(): void {
    this.render();
  }

  static drop(event: DragEvent) {
    const target = event.target as HTMLElement;

    if (
      target.tagName === 'AREA' &&
      event.dataTransfer !== null &&
      event.dataTransfer.effectAllowed !== 'uninitialized'
    ) {
      const { num, parent } = JSON.parse(event.dataTransfer.getData('text'));

      const draggableElement = document.querySelector(
        `.${parent} img[data-num="${num}"]`
      );
      const dropzone = document.querySelector('.game-field__container');

      if (draggableElement !== null && dropzone !== null) {
        if (parent === 'toy_preview') {
          const draggableElementDup =
            draggableElement.cloneNode() as HTMLElement;
          draggableElementDup.classList.add('toy-image__separate');

          GamePage.setCoords(
            draggableElementDup,
            event,
            dropzone as HTMLElement
          );

          dropzone.append(draggableElementDup);
          const count = draggableElement.getAttribute('data-count');

          if (count !== null && draggableElement.parentElement !== null) {
            draggableElement.parentElement.setAttribute(
              'data-count',
              String(+count - 1)
            );
          }

          draggableElementDup.addEventListener('dblclick', () => {
            draggableElementDup.remove();

            const parentElement = document.querySelector(
              `.${parent}[data-num="${num}"]`
            );

            if (count !== null && parentElement !== null) {
              const parentCount = parentElement.getAttribute('data-count');
              if (parentCount !== null) {
                parentElement.setAttribute(
                  'data-count',
                  String(+parentCount + 1)
                );
              }
            }
          });
        } else if (parent === 'game-field__container') {
          GamePage.setCoords(
            draggableElement as HTMLElement,
            event,
            dropzone as HTMLElement
          );
        }
      }
    }
  }

  static dragover(event: DragEvent) {
    const target = event.target as HTMLElement;

    if (target.tagName === 'AREA' && event.dataTransfer !== null) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
    }
  }

  static dragstart(event: DragEvent) {
    if (
      event.target !== null &&
      (event.target as HTMLElement).classList.contains('toy-image') &&
      event.dataTransfer !== null
    ) {
      event.dataTransfer.clearData();
      const element = event.target as HTMLImageElement;
      const num = element.dataset.num;

      event.dataTransfer.effectAllowed = 'copy';
      if (num !== undefined) {
        event.dataTransfer.setData(
          'text/plain',
          JSON.stringify({
            num,
            parent: element.parentElement?.className,
          })
        );

        const img = element;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        if (ctx !== null) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }

        event.dataTransfer.setDragImage(canvas, 10, 10);
      }
    }
  }

  disconnectedCallback(): void {
    this.removeEventListener('dragstart', GamePage.dragstart);
    this.removeEventListener('dragover', GamePage.dragover);
    document.removeEventListener('drop', GamePage.drop);
  }

  connectedCallback(): void {
    this.render();

    this.addEventListener('dragover', GamePage.dragover);
    this.addEventListener('dragstart', GamePage.dragstart);
    document.addEventListener('drop', GamePage.drop);
  }
}

customElements.define('game-page-custom', GamePage, { extends: 'main' });
