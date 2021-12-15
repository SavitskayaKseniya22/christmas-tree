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
    variant: {
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
    variant: {
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
    variant: { "big-size": false, "middle-size": false, "small-size": false },
  },
  favorite: {
    className: ".favorite-toy",
    variant: false,
  },
};

document.addEventListener("click", (e: Event) => {
  const mainContainer = document.querySelector(".toys-container") as HTMLElement;
  const toyCollection = Array.from(document.querySelectorAll(".toy-item"));

  if ((e.target as HTMLElement).closest(".shape-label")) {
    const element = (e.target as HTMLElement).closest(".shape-label")?.getAttribute("for") as string;
    if (!filters.shape.variant[element]) {
      filters.shape.variant[element] = true;
    } else {
      filters.shape.variant[element] = false;
    }
  } else if ((e.target as HTMLElement).closest(".size-label")) {
    const element = (e.target as HTMLElement).closest(".size-label")?.getAttribute("for") as string;
    if (!filters.size.variant[element]) {
      filters.size.variant[element] = true;
    } else {
      filters.size.variant[element] = false;
    }
  } else if ((e.target as HTMLElement).closest(".color-label")) {
    const element = (e.target as HTMLElement).closest(".color-label")?.getAttribute("for") as string;
    if (!filters.color.variant[element]) {
      filters.color.variant[element] = true;
    } else {
      filters.color.variant[element] = false;
    }
  } else if ((e.target as HTMLElement).closest(".favorite-toy-input")) {
    if (!filters.favorite.variant) {
      filters.favorite.variant = true;
    } else {
      filters.favorite.variant = false;
    }
  }

  const arrColor: Element[][] = [];

  for (const key in filters.color.variant) {
    if (filters.color.variant.hasOwnProperty(key) && filters.color.variant[key] === true) {
      arrColor.push(
        toyCollection.filter(
          (item) => item.querySelector(filters.color.className)?.textContent === filters.color.object[key],
        ),
      );
    }
  }

  const arrShape: Element[][] = [];

  for (const key in filters.shape.variant) {
    if (filters.shape.variant.hasOwnProperty(key) && filters.shape.variant[key] === true) {
      arrShape.push(
        toyCollection.filter(
          (item) => item.querySelector(filters.shape.className)?.textContent === filters.shape.object[key],
        ),
      );
    }
  }
  const arrSize: Element[][] = [];

  for (const key in filters.size.variant) {
    if (filters.size.variant.hasOwnProperty(key) && filters.size.variant[key] === true) {
      arrSize.push(
        toyCollection.filter(
          (item) => item.querySelector(filters.size.className)?.textContent === filters.size.object[key],
        ),
      );
    }
  }
  let num = 0;
  if (arrShape.length > 0) {
    num++;
  }
  if (arrColor.length > 0) {
    num++;
  }
  if (arrSize.length > 0) {
    num++;
  }

  /* const totalResult = arrShape
    .flat()
    .concat(arrColor.flat())
    .concat(arrSize.flat()); */

  const totalResult: Element[][] = [];

  totalResult.push(arrShape.flat());
  totalResult.push(arrColor.flat());
  totalResult.push(arrSize.flat());

  console.log(totalResult.flat());

  const tot: Element[] = [];
  const totalResultFlat = totalResult.flat();
  // eslint-disable-next-line no-restricted-syntax
  console.log(toyCollection.length);
  for (const el of toyCollection) {
    const result = totalResultFlat.filter((word) => word === el);
    if (result.length === num) {
      tot.push(el);
    }
  }
  console.log(tot);
  console.log(num);

  const mainContainerFake = document.querySelector(".toys-containerFake") as HTMLElement;
  mainContainerFake.innerHTML = "";
  for (const yy of tot) {
    mainContainerFake.append(yy);
  }

  console.log(filters);
});
