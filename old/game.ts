import { Snow } from './games/snow';
import { Music } from './games/music';
import { Background } from './games/background';
import { Garland } from './games/garland';
import { Tree } from './games/tree';
import { DecorateTree } from './games/decorateTree';
import { DoneList } from './games/doneList';
import { type GameSettingsType } from '../src/types';

export function saveSettings(
  settingsType: string,
  settingsValue: string | boolean
) {
  const storedGameSettings = window.localStorage.getItem('gameSettings');

  const gameSettings = storedGameSettings
    ? JSON.parse(storedGameSettings)
    : gameDefault;

  gameSettings[settingsType] = settingsValue;
  window.localStorage.setItem('gameSettings', JSON.stringify(gameSettings));
}

const gameDefault = {
  isMusicPlaying: false,
  isSnowing: false,
  bg: 'bg1',
  tree: '1',
  isGarlandEnabled: false,
  garlandType: '5',
};

export class Game {
  snow: Snow;
  music: Music;
  bg: Background;
  garland: Garland;
  tree: Tree;
  decorateTree: DecorateTree;

  constructor(gameOptions = gameDefault) {
    this.snow = new Snow(gameOptions);
    this.music = new Music(gameOptions);
    this.bg = new Background(gameOptions);
    this.garland = new Garland(gameOptions);
    this.tree = new Tree(gameOptions);
    this.decorateTree = new DecorateTree();

    this.decorateTree.printSelection();
    this.restoreSettings(gameOptions);

    document.querySelector('.reset-storage')?.addEventListener('click', () => {
      this.restoreSettings(gameDefault);
      this.decorateTree.printSelection();
    });
  }

  restoreSettings(gameOptions: GameSettingsType) {
    this.bg.changeBg(gameOptions.bg);
    this.snow.changeSnow(gameOptions.isSnowing);
    this.garland.changeGarland(
      gameOptions.isGarlandEnabled,
      gameOptions.garlandType
    );
    this.tree.changeTree(gameOptions.tree);
    this.music.changeMusic(gameOptions.isMusicPlaying);
  }
}

const gameSettings = window.localStorage.getItem('gameSettings');

gameSettings ? new Game(JSON.parse(gameSettings)) : new Game();
new DoneList();
