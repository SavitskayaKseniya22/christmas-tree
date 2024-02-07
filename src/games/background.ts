import { saveSettings } from "../game";
import { GameTypes } from "../types";

export class Background {
  bg: string;

  constructor(gameOptions: GameTypes) {
    this.bg = gameOptions.bg;

    document.addEventListener("click", (event) => {
      if ((event.target as HTMLElement).getAttribute("name") === "bg") {
        this.changeBg((event.target as HTMLInputElement).value);
      }
    });
  }
  changeBg(bg: string) {
    this.bg = bg;
    (document.querySelector(`input[value="${bg}"]`) as HTMLInputElement).checked = true;
    saveSettings("bg", this.bg);
    document.querySelector(".result-screen").className = `result-screen bg ${bg}`;
  }
}
