import data from "./data";
import { Card } from "./toys";
import printAllCards from "./toys";

const filters: Ifilters = {
  color: {
    className: ".color-toy",
    options: {
      white: {
        value: false,
        name: "белый",
      },
      yellow: {
        value: false,
        name: "желтый",
      },
      red: {
        value: false,
        name: "красный",
      },
      blue: {
        value: false,
        name: "синий",
      },
      green: {
        value: false,
        name: "зелёный",
      },
    },
  },
  shape: {
    className: ".shape-toy",
    options: {
      round: {
        value: false,
        name: "шар",
      },
      bell: {
        value: false,
        name: "колокольчик",
      },
      cone: {
        value: false,
        name: "шишка",
      },
      snowflake: {
        value: false,
        name: "снежинка",
      },
      custom: {
        value: false,
        name: "фигурка",
      },
    },
  },

  size: {
    className: ".size-toy",
    options: {
      big: {
        value: false,
        name: "большой",
      },
      middle: {
        value: false,
        name: "средний",
      },
      small: {
        value: false,
        name: "малый",
      },
    },
  },
  favorite: {
    className: ".favorite-toy",
    options: false,
  },
};

interface Ifilters {
  color: {
    className: string;
    options: {
      [key: string]: {
        value: boolean;
        name: string;
      };
    };
  };
  shape: {
    className: string;
    options: {
      [key: string]: {
        value: boolean;
        name: string;
      };
    };
  };

  size: {
    className: string;
    options: {
      [key: string]: {
        value: boolean;
        name: string;
      };
    };
  };
  favorite: {
    className: string;
    options: boolean;
  };
}
const mainContainer = document.querySelector(".toys-container");
document.addEventListener("click", (e: Event) => {
  if ((e.target as HTMLElement).closest(".inner-section label")) {
    let sortingData = data.slice(); // сюда передать дату
    if ((e.target as HTMLElement).closest(".shape-label")) {
      const attrName = (e.target as HTMLElement).closest(".shape-label").getAttribute("for");
      filters.shape.options[attrName].value = !filters.shape.options[attrName].value;
    } else if ((e.target as HTMLElement).closest(".size-label")) {
      const attrName = (e.target as HTMLElement).closest(".size-label").getAttribute("for");
      filters.size.options[attrName].value = !filters.size.options[attrName].value;
    } else if ((e.target as HTMLElement).closest(".color-label")) {
      const attrName = (e.target as HTMLElement).closest(".color-label").getAttribute("for");
      filters.color.options[attrName].value = !filters.color.options[attrName].value;
    } else if ((e.target as HTMLElement).closest(".favorite-toy-input")) {
      filters.favorite.options = !filters.favorite.options;
    }

    let result = [];
    for (const option of Object.keys(filters.color.options)) {
      if (filters.color.options[option].value) {
        result.push(sortingData.filter((item) => item.color === filters.color.options[option].name));
      }
    }
    result = result.flat();

    if (result.length !== 0) {
      sortingData = result;
    }

    result = [];
    for (const option of Object.keys(filters.shape.options)) {
      if (filters.shape.options[option].value) {
        result.push(sortingData.filter((item) => item.shape === filters.shape.options[option].name));
      }
    }
    result = result.flat();

    if (result.length !== 0) {
      sortingData = result;
    }

    result = [];
    for (const option of Object.keys(filters.size.options)) {
      if (filters.size.options[option].value) {
        result.push(sortingData.filter((item) => item.size === filters.size.options[option].name));
      }
    }
    result = result.flat();
    if (result.length !== 0) {
      sortingData = result;
    }
    console.log(sortingData);
    mainContainer.innerHTML = "";
    for (const item of sortingData) {
      mainContainer.innerHTML += new Card(item).renderHTML();
    }
  }
});
