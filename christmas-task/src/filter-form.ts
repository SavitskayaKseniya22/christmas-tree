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
  const toyCollection = Array.from(document.querySelectorAll(".toy-item"));

  const mainContainer = document.querySelector(
    ".toys-container"
  ) as HTMLElement;

  if ((e.target as HTMLElement).closest(".shape-label")) {
    const element = (e.target as HTMLElement)
      .closest(".shape-label")
      ?.getAttribute("for") as string;
    if (!filters.shape.variant[element]) {
      filters.shape.variant[element] = true;
    } else {
      filters.shape.variant[element] = false;
    }
  } else if ((e.target as HTMLElement).closest(".size-label")) {
    const element = (e.target as HTMLElement)
      .closest(".size-label")
      ?.getAttribute("for") as string;
    if (!filters.size.variant[element]) {
      filters.size.variant[element] = true;
    } else {
      filters.size.variant[element] = false;
    }
  } else if ((e.target as HTMLElement).closest(".color-label")) {
    const element = (e.target as HTMLElement)
      .closest(".color-label")
      ?.getAttribute("for") as string;
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
    if (
      filters.color.variant.hasOwnProperty(key) &&
      filters.color.variant[key] === true
    ) {
      arrColor.push(
        toyCollection.filter(
          (item) =>
            item.querySelector(filters.color.className)?.textContent ===
            filters.color.object[key]
        )
      );
    }
  }

  console.log(arrColor.flat());

  const arrShape: Element[][] = [];

  for (const key in filters.shape.variant) {
    if (
      filters.shape.variant.hasOwnProperty(key) &&
      filters.shape.variant[key] === true
    ) {
      arrShape.push(
        toyCollection.filter(
          (item) =>
            item.querySelector(filters.shape.className)?.textContent ===
            filters.shape.object[key]
        )
      );
    }
  }

  const totalResult = arrShape.flat().concat(arrColor.flat());

  console.log(totalResult);
});
