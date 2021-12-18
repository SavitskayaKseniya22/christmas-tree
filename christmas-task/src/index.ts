import "./styles.scss";
import "./search.ts";
import "./filter-form.ts";
import "./search-order.ts";
import "./slider.ts";
import "./reset.ts";
import { filterAndRender } from "./filter-form";
import data from "./data";

export const myStorage = window.localStorage;
if (!myStorage.getItem("data")) {
  myStorage.setItem("data", JSON.stringify(data));
}

filterAndRender();
