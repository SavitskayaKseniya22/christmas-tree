import { GameTypes, saveSettings } from "./game";

export class Bg {
  bg: string;
  bgCollection: NodeListOf<Element>;
  constructor(game: GameTypes) {
    this.bg = game.bg;
    this.bgCollection = document.querySelectorAll("input[name='bg']");
    this.bgCollection.forEach((element) => {
      element.addEventListener("click", (e: Event) => {
        this.changeBg((e.target as HTMLInputElement).value);
      });
    });
  }
  changeBg(value: string) {
    this.bg = value;
    (document.querySelector(`input[value="${value}"]`) as HTMLInputElement).checked = true;
    saveSettings("bg", this.bg);
    document.querySelector(".result-screen").className = `result-screen bg ${value}`;
  }
}
