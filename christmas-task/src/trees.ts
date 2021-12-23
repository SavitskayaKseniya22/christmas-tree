import { storage } from "./defaultData";
import { ToyCard } from "./toyCard";
import { data } from "./data";

const collectionList = document.querySelector(".selection-options ul");

const collection = JSON.parse(storage.getItem("selection")) as number[];
if (collection && collection.length > 0) {
  collection.forEach((element) => {
    collectionList.innerHTML += new ToyCard(data[element - 1]).renderSelectionHTML();
  });
} else {
  collectionList.textContent = "Нет игрушек, добавленных в избранное";
}
alert(2);
