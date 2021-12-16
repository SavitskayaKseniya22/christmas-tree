import "./styles.scss";

import "./search.ts";
import "./filter-form.ts";
import "./search-order.ts";
import data from "./data";
import printAllCards from "./toys";
import { filterAll } from "./filter-form";

import { restoreSelection, selectToy } from "./selection";

export const myStorage = window.localStorage;
myStorage.setItem("data", JSON.stringify(data));

filterAll();

restoreSelection();
selectToy();
