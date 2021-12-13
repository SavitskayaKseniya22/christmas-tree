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
};

document.addEventListener("click", (e: Event) => {
  let toyCollection = Array.from(document.querySelectorAll(".toy-item"));
  const mainContainer = document.querySelector(
    ".toys-container"
  ) as HTMLElement;

  if ((e.target as HTMLElement).closest(".shape-label")) {
    const element = (e.target as HTMLElement)
      .closest(".shape-label")
      ?.getAttribute("for") as string;
    if (!filters.shape.variant[element]) {
      filters.shape.variant[element] = true;

      toyCollection = toyCollection.filter(
        (item) =>
          item.querySelector(filters.shape.className)?.textContent ===
          filters.shape.object[element]
      );
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
  }
  /*
  for (let i = 0; i < Object.keys(filters).length; i++) {
    console.log(Object.keys(filters[i]).variant);
  } */
  let arr: Element[][] = [];
  for (const key in filters) {
    if (filters.hasOwnProperty(key)) {
      for (const k in filters[key].variant) {
        if (
          filters[key].variant.hasOwnProperty(k) &&
          filters[key].variant[k] === true
        ) {
          // console.log(filters[key].variant[k]);
          arr.push(
            toyCollection.filter(
              (item) =>
                item.querySelector(filters[key].className)?.textContent ===
                filters[key].object[k]
            )
          );
        }
      }
    }
  }
  mainContainer.innerHTML = "";
  let totalArr = new Set(arr.flat());
  console.log(totalArr);
  for (let uu of totalArr) {
    mainContainer.append(uu);
  }
});

/*
document.addEventListener("click", (e: Event) => {
  let toyCollection = Array.from(document.querySelectorAll(".toy-item"));
  const mainContainer = document.querySelector(
    ".toys-container"
  ) as HTMLElement;

  if ((e.target as HTMLElement).closest(".shape-label")) {
    // eslint-disable-next-line no-restricted-syntax
    for (const elem of Object.keys(objShape)) {
      const element = (e.target as HTMLElement).closest(`[for=${elem}]`);
      if (element) {
        if (!filters.shape[elem]) {
          filters.shape[elem] = true;
          element.classList.add("active");

          toyCollection = toyCollection.filter(
            (item) =>
              item.querySelector(".shape-toy")?.textContent === objShape[elem]
          );

          mainContainer.innerHTML = "";
          // eslint-disable-next-line no-restricted-syntax
          for (const item of toyCollection) {
            mainContainer.append(item);
          }
        } else {
          filters.shape[elem] = false;
          element.classList.remove("active");
        }
      }
    }
  }

  if ((e.target as HTMLElement).closest(".size-label")) {
    // eslint-disable-next-line no-restricted-syntax
    for (const elem of Object.keys(objSize)) {
      const element = (e.target as HTMLElement).closest(`[for=${elem}]`);
      if (element) {
        if (!filters.size[elem]) {
          filters.size[elem] = true;
          element.classList.add("active");
          toyCollection = toyCollection.filter(
            (item) =>
              item.querySelector(".size-toy")?.textContent === objSize[elem]
          );
          mainContainer.innerHTML = "";
          // eslint-disable-next-line no-restricted-syntax
          for (const item of toyCollection) {
            mainContainer.append(item);
          }
        } else {
          filters.size[elem] = false;
          element.classList.remove("active");
        }
      }
    }
  }

  if ((e.target as HTMLElement).closest(".color-label")) {
    // eslint-disable-next-line no-restricted-syntax
    for (const elem of Object.keys(objColor)) {
      const element = (e.target as HTMLElement).closest(`[for=${elem}]`);
      if (element) {
        if (!filters.color[elem]) {
          filters.color[elem] = true;
          element.classList.add("active");
          toyCollection = toyCollection.filter(
            (item) =>
              item.querySelector(".color-toy")?.textContent === objColor[elem]
          );
          mainContainer.innerHTML = "";
          // eslint-disable-next-line no-restricted-syntax
          for (const item of toyCollection) {
            mainContainer.append(item);
          }
        } else {
          filters.color[elem] = false;
          element.classList.remove("active");
        }
      }
    }
  }

  if ((e.target as HTMLElement).closest(".favorite-toy-input")) {
    const element = (e.target as HTMLElement).closest(".favorite-toy-input");
    if (!filters.favorite) {
      filters.favorite = true;
      element?.classList.add("active");
      toyCollection = toyCollection.filter(
        (item) => item.querySelector(".favorite-toy")?.textContent === "да"
      );
      mainContainer.innerHTML = "";
      // eslint-disable-next-line no-restricted-syntax
      for (const item of toyCollection) {
        mainContainer.append(item);
      }
    } else {
      filters.favorite = false;
      element?.classList.remove("active");
    }
  }
}); */
