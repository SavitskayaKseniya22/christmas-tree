import { Game } from '../game';
import { type GameSettingsType } from '../types';

export class DoneList {
  doneList: HTMLUListElement;

  constructor() {
    this.doneList = document.querySelector('.done-list');

    const savedTrees = window.localStorage.getItem('savedTrees');

    if (savedTrees) {
      const savedTreesParsed = JSON.parse(savedTrees) as GameSettingsType[];
      savedTreesParsed.forEach((element) => {
        this.makeSavedTree(element);
      });
    }

    document.querySelector('.clear-tree')?.addEventListener('click', () => {
      window.localStorage.removeItem('savedTrees');
      this.doneList.innerHTML = '';
    });

    document.querySelector('.save-tree')?.addEventListener('click', () => {
      const gameSettings = JSON.parse(
        window.localStorage.getItem('gameSettings')
      ) as GameSettingsType;

      this.makeSavedTree(gameSettings);

      if (window.localStorage.getItem('savedTrees')) {
        const savedTrees = JSON.parse(
          window.localStorage.getItem('savedTrees')
        );
        savedTrees.push(gameSettings);
        window.localStorage.setItem('savedTrees', JSON.stringify(savedTrees));
      } else {
        window.localStorage.setItem(
          'savedTrees',
          JSON.stringify([gameSettings])
        );
      }
    });

    document.addEventListener('click', (event) => {
      if (
        (event.target as HTMLElement).parentElement.classList.contains(
          'done-list'
        )
      ) {
        const savedTrees = JSON.parse(
          window.localStorage.getItem('savedTrees')
        );
        const num = (event.target as HTMLElement).getAttribute('data-num');
        const data = savedTrees[Number(num)];
        new Game(data);
      }
    });
  }

  makeSavedTree(settings: GameSettingsType) {
    const savedTree = document.createElement('li');
    savedTree.className = `bg ${settings.bg}`;
    savedTree.setAttribute('data-num', `${this.doneList.children.length}`);
    this.doneList.append(savedTree);
  }
}
