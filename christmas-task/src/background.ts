import { saveSettings } from "./game";
import { GameTypes } from "./types";

export class Bg {
  bg: string;

  constructor(game: GameTypes) {
    this.bg = game.bg;

    document.addEventListener("click", (event) => {
      if ((event.target as HTMLElement).getAttribute("name") === "bg") {
        this.changeBg((event.target as HTMLInputElement).value);
      }
    });
  }
  changeBg(value: string) {
    this.bg = value;
    (document.querySelector(`input[value="${value}"]`) as HTMLInputElement).checked = true;
    saveSettings("bg", this.bg);
    document.querySelector(".result-screen").className = `result-screen bg ${value}`;
  }
}
