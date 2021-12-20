import data from "./data";
import { filterAndRender } from "./render";
export const mainContainer = document.querySelector(".toys-container");
export const myStorage = window.localStorage;

export const filtersSource: Ifilters = {
  color: {
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
  shape: {
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

  size: {
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
  favorite: false,
  count: {
    min: 1,
    max: 12,
  },
  year: {
    min: 1940,
    max: 2020,
  },
};
export interface Ifilter {
  [key: string]: {
    value: boolean;
    name: string;
  };
}
interface Ilimit {
  min: number;
  max: number;
}
export interface Ifilters {
  [k: string]: Ifilter | Ilimit | boolean;
  color: Ifilter;
  shape: Ifilter;
  size: Ifilter;
  favorite: boolean;
  count: Ilimit;
  year: Ilimit;
}
//сброс чекбоксов
export function uncheck() {
  document.querySelectorAll("input[type='checkbox']").forEach((element) => {
    (element as HTMLInputElement).checked = false;
  });
}

// установить дефолтные значения и применить их/вывести на страницу
export function setDefaultSettings() {
  if (!myStorage.getItem("data")) {
    myStorage.setItem("data", JSON.stringify(data));
  }
  if (!myStorage.getItem("filters")) {
    myStorage.setItem("filters", JSON.stringify(filtersSource));
  }
  if (!myStorage.getItem("order")) {
    myStorage.setItem("order", "nameUp");
  }
  uncheck();
  filterAndRender();
}
setDefaultSettings();
