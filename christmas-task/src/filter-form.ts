import data from "./data";
import { Card } from "./toys";
import { changeOrder } from "./search-order";

const filtersSource: Ifilters = {
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

const myStorage = window.localStorage;

if (!myStorage.getItem("filters")) {
  myStorage.setItem("filters", JSON.stringify(filtersSource));
}

const filters = JSON.parse(myStorage.getItem("filters"));
const mainContainer = document.querySelector(".toys-container");

export function filterAll() {
  let filteredData = data.slice(); // сюда передать дату
  // по цвету
  let result = [];
  let isChanged = false;
  for (const option of Object.keys(filters.color.options)) {
    if (filters.color.options[option].value) {
      isChanged = true;
      result.push(filteredData.filter((item) => item.color === filters.color.options[option].name));
    }
  }
  result = result.flat();

  if (result.length !== 0) {
    filteredData = result;
  }
  if (result.length === 0 && isChanged) {
    mainContainer.innerHTML = "";
    filteredData = [];
  }
  // по форме
  result = [];
  isChanged = false;
  for (const option of Object.keys(filters.shape.options)) {
    if (filters.shape.options[option].value) {
      isChanged = true;
      result.push(filteredData.filter((item) => item.shape === filters.shape.options[option].name));
    }
  }
  result = result.flat();

  if (result.length !== 0) {
    filteredData = result;
  }
  if (result.length === 0 && isChanged) {
    mainContainer.innerHTML = "";
    filteredData = [];
  }
  // по размеру
  result = [];
  isChanged = false;
  for (const option of Object.keys(filters.size.options)) {
    if (filters.size.options[option].value) {
      isChanged = true;
      result.push(filteredData.filter((item) => item.size === filters.size.options[option].name));
    }
  }
  result = result.flat();
  if (result.length !== 0) {
    filteredData = result;
  }
  if (result.length === 0 && isChanged) {
    mainContainer.innerHTML = "";
    filteredData = [];
  }

  //любимые

  result = [];
  isChanged = false;

  if (filters.favorite.options) {
    isChanged = true;
    result.push(filteredData.filter((item) => item.favorite === filters.favorite.options));
  }

  result = result.flat();
  if (result.length !== 0) {
    filteredData = result;
  }
  if (result.length === 0 && isChanged) {
    mainContainer.innerHTML = "";
    alert(1111);
    filteredData = [];
  }

  myStorage.setItem("data", JSON.stringify(filteredData));
}

document.addEventListener("click", (e: Event) => {
  if ((e.target as HTMLElement).closest(".inner-section label")) {
    if ((e.target as HTMLElement).closest(".shape-label")) {
      const attrName = (e.target as HTMLElement).closest(".shape-label").getAttribute("for");
      filters.shape.options[attrName].value = !filters.shape.options[attrName].value;
    } else if ((e.target as HTMLElement).closest(".size-label")) {
      const attrName = (e.target as HTMLElement).closest(".size-label").getAttribute("for");
      filters.size.options[attrName].value = !filters.size.options[attrName].value;
    } else if ((e.target as HTMLElement).closest(".color-label")) {
      const attrName = (e.target as HTMLElement).closest(".color-label").getAttribute("for");
      filters.color.options[attrName].value = !filters.color.options[attrName].value;
    } else if ((e.target as HTMLElement).closest(".favorite-label")) {
      filters.favorite.options = !filters.favorite.options;
      console.log(filters);
    }
    myStorage.setItem("filters", JSON.stringify(filters));
    filterAll();
    changeOrder();
    renderData();
  }
});

export function renderData() {
  const readedData = JSON.parse(myStorage.getItem("data"));

  mainContainer.innerHTML = "";
  for (const item of readedData) {
    mainContainer.innerHTML += new Card(item).renderHTML();
  }
}
