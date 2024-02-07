import { saveSettings } from "../game";
import { GameTypes } from "../types";

export class Music {
  music: boolean;
  checkboxMusic: HTMLInputElement;
  audio: HTMLAudioElement;

  constructor(gameOptions: GameTypes) {
    this.music = gameOptions.isMusicPlaying;
    this.checkboxMusic = document.querySelector("#toggle-button-music");
    this.audio = document.querySelector("audio");

    this.checkboxMusic.addEventListener("change", () => {
      this.changeMusic(this.checkboxMusic.checked);
    });
  }

  changeMusic(isMusicPlaying: boolean) {
    this.music = isMusicPlaying;
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
