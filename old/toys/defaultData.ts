import toys from '../assets/toys.json';
import { filterAndRender } from './render';

export const mainContainer = document.querySelector('.toys-container');
export const storage = window.localStorage;
console.log();
export const filtersSource = {
  color: {
    white: {
      value: false,
      name: 'белый',
    },
    yellow: {
      value: false,
      name: 'желтый',
    },
    red: {
      value: false,
      name: 'красный',
    },
    blue: {
      value: false,
      name: 'синий',
    },
    green: {
      value: false,
      name: 'зелёный',
    },
  },
  shape: {
    round: {
      value: false,
      name: 'шар',
    },
    bell: {
      value: false,
      name: 'колокольчик',
    },
    cone: {
      value: false,
      name: 'шишка',
    },
    snowflake: {
      value: false,
      name: 'снежинка',
    },
    custom: {
      value: false,
      name: 'фигурка',
    },
  },

  size: {
    big: {
      value: false,
      name: 'большой',
    },
    middle: {
      value: false,
      name: 'средний',
    },
    small: {
      value: false,
      name: 'малый',
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

// сброс чекбоксов
export function uncheck(): void {
  document.querySelectorAll("input[type='checkbox']").forEach((element) => {
    (element as HTMLInputElement).checked = false;
  });
}
// установить дефолтные значения и применить их/вывести на страницу
export function setDefaultSettings(): void {
  if (storage.getItem('data') == null) {
    storage.setItem('data', JSON.stringify(toys));
  }
  if (storage.getItem('filters') == null) {
    storage.setItem('filters', JSON.stringify(filtersSource));
  }
  if (storage.getItem('order') == null) {
    storage.setItem('order', 'nameUp');
  }

  filterAndRender();
}

setDefaultSettings();