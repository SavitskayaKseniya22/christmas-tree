import "./styles.scss";
import "./normalize.scss";
import data from "./data";
import printAllCards from "./toys";

const mainContainer = document.querySelector(".toys-container");

if (mainContainer) {
  printAllCards(data, mainContainer);
}
