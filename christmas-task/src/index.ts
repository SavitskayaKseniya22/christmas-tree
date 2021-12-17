import "./styles.scss";

import "./search.ts";
import "./filter-form.ts";
import "./search-order.ts";
import data from "./data";
import { filterAll } from "./filter-form";
import { changeOrder } from "./search-order";
import { renderData } from "./filter-form";
import { restoreSelection, selectToy } from "./selection";

export const myStorage = window.localStorage;
if (!myStorage.getItem("data")) {
  myStorage.setItem("data", JSON.stringify(data));
}

filterAll();
changeOrder();
renderData();
restoreSelection();
selectToy();
