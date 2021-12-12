import "./styles.scss";
import "./normalize.scss";
import "./search.ts";
import "./search-order.ts";
import data from "./data";
import printAllCards from "./toys";

import { restoreSelection, selectToy } from "./selection";

const myStorage = window.localStorage;
export default myStorage;

const mainContainer = document.querySelector(".toys-container") as HTMLElement;

printAllCards(data, mainContainer);
restoreSelection();
selectToy();
