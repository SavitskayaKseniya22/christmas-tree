import { GameTypes, saveSettings } from "./game";
export class Music {
  music: boolean;
  checkboxMusic: HTMLInputElement;
  audio: HTMLAudioElement;
  constructor(game: GameTypes) {
    this.music = game.music;
    this.checkboxMusic = document.querySelector("#toggle-button-music");
    this.audio = document.querySelector("audio");

    this.checkboxMusic.addEventListener("change", () => {
      this.changeMusic(this.checkboxMusic.checked);
    });
  }
  changeMusic(value: boolean) {
    this.music = value;
    saveSettings("music", this.music);
    if (this.music) {
      this.checkboxMusic.checked = true;
      this.audio.play();
      document.addEventListener(
        "click",
        () => {
          this.audio.play();
        },
        { once: true },
      );
    } else {
      this.checkboxMusic.checked = false;
      this.audio.pause();
    }
  }
}
