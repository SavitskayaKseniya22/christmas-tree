/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import toys from './assets/toys.json';
import { Toy } from './lib/toy/toy';
import {
  OrderType,
  type FiltersType,
  type ToyType,
  ArrayOfFeaturesType,
  BooleanFeaturesType,
  SliderType,
  type GameSettingsType,
} from './types';

import img_bg from './assets/backgrounds/1.jpg';
import img_tree from './assets/trees/1.png';

export const initStoreData = {
  color: [],
  shape: [],
  size: [],
  favorite: false,
  selected: false,
  quantity: null,
  year: null,
  order: OrderType.titleUp,
  search: '',
};

export const initSettingsData = {
  isMusicPlaying: false,
  isSnowing: false,
  tree: img_tree,
  bg: img_bg,
  garlandType: null,
};

class AppStore {
  static filters: FiltersType = JSON.parse(JSON.stringify(initStoreData));

  static settings: GameSettingsType = JSON.parse(
    JSON.stringify(initSettingsData)
  );

  static data: ToyType[] = toys as ToyType[];

  static toys: Toy[] = this.data.map((item) => {
    return new Toy(item);
  });

  static filteredToys: Toy[] = this.filter({ data: this.toys });

  static updateGarland({ color }: { color: string }): void {
    if (color !== 'none') {
      AppStore.settings.garlandType = color;
    } else {
      AppStore.settings.garlandType = null;
    }
    document
      .querySelector('.game-field__garland')
      ?.setAttribute('rerender', 'true');
  }

  static updateSnow({ checked }: { checked: boolean }): void {
    AppStore.settings.isSnowing = checked;
    document
      .querySelector('.game-field__snowfall')
      ?.setAttribute('rerender', checked.toString());
  }

  static updateBackground({ src }: { src: string }): void {
    AppStore.settings.bg = src;

    document
      .querySelector('.game-field__background')
      ?.setAttribute('rerender', 'true');
  }

  static updateTree({ src }: { src: string }): void {
    AppStore.settings.tree = src;

    document
      .querySelector('.game-field__tree')
      ?.setAttribute('rerender', 'true');
  }

  static getSelectedToys(): Toy[] {
    const selectedToys = this.toys.filter((toy) => {
      return toy.data.selected;
    });
    return selectedToys.length > 0 ? selectedToys : this.toys;
  }

  static clearSettings(): void {
    this.settings = JSON.parse(JSON.stringify(initSettingsData));
    document.querySelector('.game-page')?.setAttribute('rerender', 'true');
  }

  static clearFilters(): void {
    this.filters = JSON.parse(JSON.stringify(initStoreData));
    document.querySelector('.filters')?.setAttribute('rerender', 'true');

    this.renderData();
  }

  static clearSelection(): void {
    this.toys = this.data.map((item) => {
      return new Toy(item);
    });
    this.renderData();
  }

  static sortByOrder({
    toys,
    orderType,
  }: {
    toys: Toy[];
    orderType: OrderType;
  }): Toy[] {
    switch (orderType) {
      case OrderType.titleUp:
        return toys.sort((a, b) => {
          return a.data.title.localeCompare(b.data.title);
        });

      case OrderType.titleDown:
        return toys.sort((a, b) => {
          return b.data.title.localeCompare(a.data.title);
        });

      case OrderType.yearUp:
        return toys.sort((a, b) => {
          return a.data.year - b.data.year;
        });

      case OrderType.yearDown:
        return toys.sort((a, b) => {
          return b.data.year - a.data.year;
        });
      case OrderType.QUANTITYUP:
        return toys.sort((a, b) => {
          return a.data.quantity - b.data.quantity;
        });

      case OrderType.QUANTITYDOWN:
        return toys.sort((a, b) => {
          return b.data.quantity - a.data.quantity;
        });

      default:
        return toys;
    }
  }

  static isValueSearchRelevant({ toy }: { toy: Toy }): boolean {
    if (this.filters.search === '') {
      return true;
    }
    return toy.data.title.toLowerCase().includes(this.filters.search);
  }

  static isValueInArray({
    toy,
    typeOfFilter,
  }: {
    toy: Toy;
    typeOfFilter: ArrayOfFeaturesType;
  }): boolean {
    if (this.filters[typeOfFilter].length > 0) {
      return this.filters[typeOfFilter].includes(
        toy.data[typeOfFilter] as never
      );
    }

    return true;
  }

  static isValueTrue({
    toy,
    typeOfFilter,
  }: {
    toy: Toy;
    typeOfFilter: BooleanFeaturesType;
  }): boolean {
    if (this.filters[typeOfFilter]) {
      return toy.data[typeOfFilter];
    }

    return true;
  }

  static isValueInPeriod({
    toy,
    typeOfFilter,
  }: {
    toy: Toy;
    typeOfFilter: SliderType;
  }): boolean {
    const valuesInFilters = this.filters[typeOfFilter];
    if (valuesInFilters != null) {
      const before = valuesInFilters[0];
      const after = valuesInFilters[1];

      return (
        toy.data[typeOfFilter] >= before && toy.data[typeOfFilter] <= after
      );
    }

    return true;
  }

  static filter({ data }: { data: Toy[] }): Toy[] {
    const sortedData = this.sortByOrder({
      toys: data,
      orderType: this.filters.order,
    });

    return sortedData.filter((toy) => {
      return (
        this.isValueSearchRelevant({ toy }) &&
        this.isValueTrue({
          toy,
          typeOfFilter: BooleanFeaturesType.FAVORITE,
        }) &&
        this.isValueTrue({
          toy,
          typeOfFilter: BooleanFeaturesType.SELECTED,
        }) &&
        this.isValueInArray({
          toy,
          typeOfFilter: ArrayOfFeaturesType.COLOR,
        }) &&
        this.isValueInArray({
          toy,
          typeOfFilter: ArrayOfFeaturesType.SHAPE,
        }) &&
        this.isValueInArray({
          toy,
          typeOfFilter: ArrayOfFeaturesType.SIZE,
        }) &&
        this.isValueInPeriod({
          toy,
          typeOfFilter: SliderType.YEAR,
        }) &&
        this.isValueInPeriod({
          toy,
          typeOfFilter: SliderType.QUANTITY,
        })
      );
    });
  }

  static renderData(): void {
    this.filteredToys = this.filter({ data: this.toys });
    document.querySelector('.toys-container')?.setAttribute('rerender', 'true');
  }
}

export default AppStore;
