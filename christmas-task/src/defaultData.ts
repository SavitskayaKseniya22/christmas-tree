import data from "./data";
export const mainContainer = document.querySelector(".toys-container");
export const myStorage = window.localStorage;

export const filtersSource: Ifilters = {
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
  amount: {
    min: 1,
    max: 12,
  },
  year: {
    min: 1940,
    max: 2020,
  },
};

export interface Ifilters {
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
  amount: {
    min: number;
    max: number;
  };
  year: {
    min: number;
    max: number;
  };
}
if (!myStorage.getItem("data")) {
  myStorage.setItem("data", JSON.stringify(data));
}
if (!myStorage.getItem("filters")) {
  myStorage.setItem("filters", JSON.stringify(filtersSource));
}
if (!myStorage.getItem("order")) {
  myStorage.setItem("order", "nameUp");
}
