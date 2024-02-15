import { OrderType, type ToyType } from '../types';
import { storage } from './defaultData';
import { renderData } from './render';
import { searchToy } from './search';
import { restoreSelection } from './selection';

export function changeOrder() {
  const readedData = JSON.parse(storage.getItem('data')) as ToyType[];
  const value = storage.getItem('order');
  document
    .querySelectorAll('#sort-select option')
    .forEach((element) => ((element as HTMLOptionElement).selected = false));
  document.querySelector(`[value=${value}]`).selected = true;

  let sortedData;
  switch (value) {
    case OrderType.nameUp:
      sortedData = readedData.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      break;
    case OrderType.nameDown:
      sortedData = readedData.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
      break;
    case OrderType.valueUp:
      sortedData = readedData.sort((a, b) => {
        return a.year.localeCompare(b.year);
      });
      break;
    case OrderType.valueDown:
      sortedData = readedData.sort((a, b) => {
        return b.year.localeCompare(a.year);
      });
      break;
    default:
      return (sortedData = readedData);
  }

  storage.setItem('data', JSON.stringify(sortedData));
}

const sortSelect = document.querySelector('.sort-select');
sortSelect?.addEventListener('change', () => {
  storage.setItem('order', sortSelect.value);
  changeOrder();
  if (storage.getItem('searchedData')) {
    searchToy();
  }
  renderData();
  restoreSelection();
});
