import { saveSettings } from "../game";
import { GameTypes } from "../types";

export class Snow {
  checkboxSnow: HTMLInputElement;
  snow: boolean;

  constructor(gameOptions: GameTypes) {
    this.snow = gameOptions.isSnowing;
    this.checkboxSnow = document.querySelector("#toggle-button-snow");

    this.checkboxSnow.addEventListener("change", () => {
      this.changeSnow(this.checkboxSnow.checked);
    });
  }

  changeSnow(isSnowing: boolean) {
    this.snow = isSnowing;
    saveSettings("snow", this.snow);
    const snowContainer = document.querySelector(".snow-container");
    if (this.snow) {
      this.checkboxSnow.checked = true;
      snowContainer.innerHTML = this.printSnow();
    } else {
      this.checkboxSnow.checked = false;
      snowContainer.innerHTML = "";
    }
  }

  printSnow() {
    return `<ul class="snowfall">
      ${`<li><img src="./assets/svg/snow.svg" alt="snowflake" /></li>`.repeat(8)}
    </ul>
    <ul class="snowfall2">
    ${`<li><img src="./assets/svg/snow.svg" alt="snowflake" /></li>`.repeat(8)}
    </ul>
    <ul class="snowfall3">
    ${`<li><img src="./assets/svg/snow.svg" alt="snowflake" /></li>`.repeat(8)} 
    </ul>
    `;
  }
}
