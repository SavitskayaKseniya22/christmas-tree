import data from "./data";
import { Card } from "./toys";
import printAllCards from "./toys";

const objShape = {
  "round-shape": "шар",
  "bell-shape": "колокольчик",
  "cone-shape": "шишка",
  "snowflake-shape": "снежинка",
  "custom-shape": "фигурка",
};

const objSize = {
  "big-size": "большой",
  "middle-size": "средний",
  "small-size": "малый",
};

const objColor = {
  "white-color": "белый",
  "yellow-color": "желтый",
  "red-color": "красный",
  "blue-color": "синий",
  "green-color": "зелёный",
};

const filters = {
  color: {
    object: objColor,
    className: ".color-toy",
    options: {
      "white-color": false,
      "yellow-color": false,
      "red-color": false,
      "blue-color": false,
      "green-color": false,
    },
  },
  shape: {
    object: objShape,
    className: ".shape-toy",
    options: {
      "round-shape": false,
      "bell-shape": false,
      "cone-shape": false,
      "snowflake-shape": false,
      "custom-shape": false,
    },
  },

  size: {
    object: objSize,
    className: ".size-toy",
    options: { "big-size": false, "middle-size": false, "small-size": false },
  },
  favorite: {
    className: ".favorite-toy",
    options: false,
  },
};
let sortingData = data.slice();
document.addEventListener("click", (e: Event) => {
  const mainContainer = document.querySelector(".toys-container") as HTMLElement;

  if ((e.target as HTMLElement).closest(".inner-section label")) {
    if ((e.target as HTMLElement).closest(".shape-label")) {
      const attrName = (e.target as HTMLElement).closest(".shape-label").getAttribute("for");
      filters.shape.options[attrName] = !filters.shape.options[attrName];
    } else if ((e.target as HTMLElement).closest(".size-label")) {
      const attrName = (e.target as HTMLElement).closest(".size-label").getAttribute("for");
      filters.size.options[attrName] = !filters.size.options[attrName];
    } else if ((e.target as HTMLElement).closest(".color-label")) {
      const attrName = (e.target as HTMLElement).closest(".color-label").getAttribute("for");
      filters.color.options[attrName] = !filters.color.options[attrName];
    } else if ((e.target as HTMLElement).closest(".favorite-toy-input")) {
      filters.favorite.options = !filters.favorite.options;
    }

    let result = [];
    for (const option of Object.keys(filters.color.options)) {
      if (filters.color.options[option]) {
        result.push(sortingData.filter((item) => item.color === objColor[option]));
      }
    }
    result = result.flat();

    if (result.length !== 0) {
      sortingData = result;
    }

    for (const option of Object.keys(filters.shape.options)) {
      if (filters.shape.options[option]) {
        result.push(sortingData.filter((item) => item.shape === objShape[option]));
      }
    }
    console.log(result.flat());

    if (result.flat().length > 0) {
      mainContainer.innerHTML = "";
      for (const item of result.flat()) {
        mainContainer.innerHTML += new Card(item).renderHTML();
      }
    } else {
      mainContainer.innerHTML = "";
      printAllCards(data);
    }
  }
});
