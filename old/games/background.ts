import { saveSettings } from '../game';
import { type GameSettingsType } from '../types';

export class Background {
  bg: string;

  constructor(gameOptions: GameSettingsType) {
    this.bg = gameOptions.bg;

    document.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).getAttribute('name') === 'bg') {
        this.changeBg((event.target as HTMLInputElement).value);
      }
    });
  }

  changeBg(bg: string) {
    this.bg = bg;
    document.querySelector(`input[value="${bg}"]`).checked = true;
    saveSettings('bg', this.bg);
    const container = document.querySelector('.result-screen');
    if (container) {
      container.className = `result-screen bg ${bg}`;
    }
  }
}
