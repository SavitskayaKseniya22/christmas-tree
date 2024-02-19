import './game-page.scss';
import './lib/controls/game-trees/game-trees';
import './lib/controls/game-background/game-background';
import './lib/controls/game-garland/game-garland';
import './lib/controls/game-effects/game-effects';
import './lib/containers/game-snowfall/game-snowfall';
import './lib/containers/game-background-image/game-background-image';
import './lib/containers/game-tree-image/game-tree-image';
import './lib/containers/game-garland-container/game-garland-container';
import AppStore from '../../store';
import { ToyViewType } from '../../types';

export class GameField extends HTMLDivElement {
  constructor() {
    super();
    this.className = 'game__field';
  }

  render(): void {
    this.insertAdjacentHTML(
      'afterbegin',
      `
        <div is="game-snow-custom"></div>
        
        <img is="game-background-image-custom" />
        
        <div class="game-field-container">
        <img is="game-tree-image-custom" />
        <div is="game-garland-container-custom"></div>
        <div class="game-toy-container"></div>
        </div>
          
        <map name="image-map" class="map-tree">
            <area
              target=""
              alt="tree"
              title=""
              href=""
              coords="247,3,481,616,363,702,87,691,7,618"
              shape="poly"
            />
          </map>
    `
    );
  }

  connectedCallback(): void {
    this.render();
  }
}

customElements.define('game-field-custom', GameField, { extends: 'div' });

export class GamePage extends HTMLElement {
  static observedAttributes = ['rerender'];
  constructor() {
    super();
    this.className = 'main game-page';
  }

  render(): void {
    this.innerHTML = `
      <div class="game__column_left">
        <div is="game-trees-custom"></div>
        <div is="game-background-custom"></div>
        <div is="game-garland-custom"></div>
        <div is="game-effects-custom"></div>
        <button class="default-button game__button_reset">Reset</button>
      </div>
      <div is="game-field-custom"></div>
      <div class="game__column_right">
      <ul class="game__toys-list">
      
      ${AppStore.getSelectedToys()
        .map((toy) => {
          return toy.getView({ type: ToyViewType.preview });
        })
        .join(' ')}
      </ul>

      </div>
      
    `;
  }

  attributeChangedCallback(): void {
    this.connectedCallback();
  }

  connectedCallback(): void {
    this.render();

    this.querySelector('.game__button_reset')?.addEventListener('click', () => {
      this.setAttribute('rerender', 'true');
    });

    this.addEventListener('dragover', (event) => {
      const target = event.target as HTMLElement;

      if (target.tagName === 'AREA' && event.dataTransfer !== null) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
      }
    });

    this.addEventListener('dragstart', (event) => {
      if (event.target !== null && event.dataTransfer !== null) {
        event.dataTransfer.clearData();

        const num = (event.target as HTMLElement).dataset.num;
        event.dataTransfer.effectAllowed = 'copy';
        if (num !== undefined) {
          event.dataTransfer.setData('text/plain', num);

          const img = event.target as HTMLImageElement;

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
    });

    document.addEventListener('drop', (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'AREA' && event.dataTransfer !== null) {
        const targetNum = event.dataTransfer.getData('text');

        console.log(event.target, targetNum);

        const draggableElement = document.querySelector(
          `img[data-num="${targetNum}"]`
        );
        const dropzone = this.querySelector('.game-toy-container');

        console.log(draggableElement, dropzone);
        if (draggableElement !== null && dropzone !== null) {
          const draggableElementDup =
            draggableElement.cloneNode() as HTMLElement;
          draggableElementDup.classList.add('toy-image__separate');
          dropzone.append(draggableElementDup);
          const { pageX, pageY } = event as MouseEvent;
          draggableElementDup.style.left = ` ${pageX - (dropzone.getBoundingClientRect().left + 20 + window.scrollY)}px`;
          draggableElementDup.style.top = `${pageY - (dropzone.getBoundingClientRect().top + 20 + window.scrollY)}px`;
          draggableElementDup.addEventListener('dblclick', () => {
            draggableElementDup.remove();
          });
        }

        /*
        let count = draggableElement.dataset.count;
        if (targetSelector.includes('toy-preview') && +count > 0) {
         
          count = String(+count - 1);
          draggableElement.dataset.count = count;
          draggableElementDup.dataset.count = count;
          draggableElement.previousElementSibling.textContent = count;
          draggableElement.parentNode.append(draggableElement);
          dropzone.append(draggableElementDup);
          this.setCoords(draggableElementDup, event, dropzone as HTMLElement);
          draggableElementDup.addEventListener('dblclick', () => {
            this.returnToy(draggableElementDup);
          });
          event.dataTransfer.clearData();
        } else if (targetSelector.includes('tree-container')) {
          dropzone.append(draggableElement);
          this.setCoords(draggableElement, event, dropzone as HTMLElement);
        } */
      }
    });
  }
}

customElements.define('game-page-custom', GamePage, { extends: 'main' });
