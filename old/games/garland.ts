import { saveSettings } from '../game';
import { type GameSettingsType } from '../types';

export class Garland {
  garland: boolean;
  garlandType: string;
  checkboxGarland: HTMLInputElement;
  garlandButtons: NodeListOf<Element>;

  constructor(gameOptions: GameSettingsType) {
    this.garland = gameOptions.isGarlandEnabled;
    this.garlandType = gameOptions.garlandType;
    this.checkboxGarland = document.querySelector('.garland-enabler');
    this.garlandButtons = document.querySelectorAll("input[name='garland']");

    this.checkboxGarland.addEventListener('change', () => {
      this.changeGarland(this.checkboxGarland.checked, this.garlandType);
    });

    document.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).getAttribute('name') === 'garland') {
        this.changeGarland(
          this.checkboxGarland.checked,
          document.querySelector('input[name="garland"]:checked').value
        );
      }
    });
  }

  changeGarland(isGarlandEnabled: boolean, garlandType: string) {
    this.garland = isGarlandEnabled;
    this.garlandType = garlandType;
    saveSettings('garland', this.garland);
    saveSettings('garlandType', this.garlandType);
    const i = Number(garlandType) - 1;
    this.removeGarland();
    if (this.garland) {
      this.checkboxGarland.checked = true;
      (this.garlandButtons[i] as HTMLInputElement).checked = true;
      const className = (
        this.garlandButtons[i] as HTMLInputElement
      ).getAttribute('data-color');
      const treeContainer = document.querySelector('.tree-container');
      const garlandContainer = document.createElement('div');
      garlandContainer.className = 'garland-container';
      garlandContainer.innerHTML += this.printGarland(className);
      treeContainer.append(garlandContainer);
    } else {
      this.checkboxGarland.checked = false;
      (this.garlandButtons[i] as HTMLInputElement).checked = false;
    }
  }

  removeGarland() {
    this.garlandButtons.forEach((element) => {
      (element as HTMLInputElement).checked = false;
    });
    document.querySelector('.garland-container')?.remove();
  }

  printGarland(className: string) {
    return `<ul id="garland-block-first" class="garland-block">
    ${`<li class=${className}></li>`.repeat(8)}
  </ul>
  <ul id="garland-block-second" class="garland-block">
  ${`<li class=${className}></li>`.repeat(8)}
  </ul>
  <ul id="garland-block-third" class="garland-block">
  ${`<li class=${className}></li>`.repeat(8)}
  </ul>
  <ul id="garland-block-fourth" class="garland-block">
 ${`<li class=${className}></li>`.repeat(8)}
  </ul>
  <ul id="garland-block-fifth" class="garland-block">
  ${`<li class=${className}></li>`.repeat(8)}
  </ul>`;
  }
}