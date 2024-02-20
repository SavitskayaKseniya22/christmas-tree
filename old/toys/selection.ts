import { storage } from './defaultData';
import { ToyCard } from '../toyCard';
import toys from '../assets/toys.json';

const selectionCount = document.querySelector('.selection-count');
const selectionRest = document.querySelector('.selection-rest');
const selectionWarning = document.querySelector('.selection-warning');
const container = document.querySelector('.selection-container');
const containerInner = document.querySelector('.selection-inner');

export function restoreSelection() {
  document.querySelectorAll('.star-image').forEach((element) => {
    element.classList.remove('golden-star-image');
  });
  document.querySelectorAll("[data-selection='true']").forEach((element) => {
    element.setAttribute('data-selection', 'false');
  });

  if (storage.getItem('selection')) {
    const selection = JSON.parse(storage.getItem('selection')) as string[];
    selectionCount.textContent = String(selection.length);
    selectionRest.textContent = String(20 - selection.length);

    selection.length === 20
      ? (selectionWarning.textContent = 'Все слоты заполнены')
      : (selectionWarning.textContent = '');

    selection.forEach(function (element) {
      const choosenToy = document.querySelector(
        `.toys-container [data-num="${element}"]`
      );
      if (choosenToy) {
        choosenToy.setAttribute('data-selection', 'true');
        choosenToy
          .querySelector('.star-image')
          .classList.add('golden-star-image');
      }
    });
  } else {
    selectionCount.textContent = String(0);
    selectionRest.textContent = String(20);
    selectionWarning.textContent = '';
  }
}

document.addEventListener('click', (e: Event) => {
  const targetElement = e.target as HTMLElement;
  if (targetElement.closest('.toys-container .toy_full')) {
    let selection: string[] = [];
    const toy = targetElement.closest('.toy_full');
    if (storage.getItem('selection')) {
      selection = JSON.parse(storage.getItem('selection'));
    }
    if (
      toy.getAttribute('data-selection') === 'false' &&
      selection.length === 20
    ) {
      toy.classList.add('active');
      selectionWarning.classList.add('active');
      setTimeout(() => {
        toy.classList.remove('active');
        selectionWarning.classList.remove('active');
      }, 200);
    }
    if (
      toy.getAttribute('data-selection') === 'false' &&
      selection.length < 20
    ) {
      selection.push(toy.getAttribute('data-num'));
      toy.querySelector('.star-image').classList.add('scale');
      setTimeout(() => {
        toy.querySelector('.star-image').classList.remove('scale');
      }, 200);
    } else {
      selection = selection.filter(
        (elem) => elem !== toy.getAttribute('data-num')
      );
    }

    storage.setItem('selection', JSON.stringify(selection));
    restoreSelection();
  } else if (targetElement.closest('.open-selected')) {
    container.classList.add('active');
    containerInner.classList.add('active');
    const collection = JSON.parse(storage.getItem('selection')) as number[];
    if (collection && collection.length > 0) {
      collection.forEach((element) => {
        containerInner.innerHTML += new ToyCard(
          toys[element - 1]
        ).renderSelectionHTML();
      });
    } else {
      containerInner.textContent = 'Нет игрушек, добавленных в избранное';
    }
  } else if (targetElement.closest('.selection__close')) {
    container.classList.remove('active');
    containerInner.classList.remove('active');
    containerInner.innerHTML = '';
  } else if (targetElement.closest('.remove-selection')) {
    let selection = JSON.parse(storage.getItem('selection')) as string[];
    selection = selection.filter(
      (elem) =>
        elem !==
        targetElement
          .closest('.remove-selection')
          .parentElement.getAttribute('data-num')
    );
    storage.setItem('selection', JSON.stringify(selection));
    restoreSelection();
    targetElement.closest('.remove-selection').parentElement.remove();
    if (containerInner.innerHTML === '') {
      containerInner.textContent = 'Нет игрушек, добавленных в избранное';
    }
  } else if (targetElement.closest('.clear-selected')) {
    storage.removeItem('selection');
    restoreSelection();
  }
});
