interface IObjShape {
  "round-shape": string;
  "bell-shape": string;
  "cone-shape": string;
  "snowflake-shape": string;
  "custom-shape": string;
}

const objShape: IObjShape = {
  "round-shape": "шар",
  "bell-shape": "колокольчик",
  "cone-shape": "шишка",
  "snowflake-shape": "снежинка",
  "custom-shape": "фигурка",
};

interface IObjSize {
  "big-size": string;
  "middle-size": string;
  "small-size": string;
}

const objSize: IObjSize = {
  "big-size": "большой",
  "middle-size": "средний",
  "small-size": "малый",
};

interface IObjColor {
  "white-color": string;
  "yellow-color": string;
  "red-color": string;
  "blue-color": string;
  "green-color": string;
}

const objColor: IObjColor = {
  "white-color": "белый",
  "yellow-color": "желтый",
  "red-color": "красный",
  "blue-color": "синий",
  "green-color": "зелёный",
};

const filters = {
  color: {
    "white-color": false,
    "yellow-color": false,
    "red-color": false,
    "blue-color": false,
    "green-color": false,
  },
  shape: {
    "round-shape": false,
    "bell-shape": false,
    "cone-shape": false,
    "snowflake-shape": false,
    "custom-shape": false,
  },
  favorite: false,
  size: {
    "big-size": false,
    "middle-size": false,
    "small-size": false,
  },
};

document.addEventListener("click", (e: Event) => {
  let toyCollection = Array.from(document.querySelectorAll(".toy-item"));

  if ((e.target as HTMLElement).closest(".shape-label")) {
    // eslint-disable-next-line no-restricted-syntax
    for (const elem of Object.keys(objShape)) {
      const element = (e.target as HTMLElement).closest(`[for=${elem}]`);
      if (element) {
        if (!filters.shape[elem]) {
          alert(1);
          filters.shape[elem] = true;
          element.classList.add("active");
          /* toyCollection = toyCollection.filter(
            (item) =>
              item.querySelector(".shape-toy")?.textContent === objShape[elem]
          );
          console.log(toyCollection); */
        } else {
          alert(2);
          filters.shape[elem] = false;
          element.classList.remove("active");
        }
      }
    }
  }

  if ((e.target as HTMLElement).closest(".size-label")) {
    // eslint-disable-next-line no-restricted-syntax
    for (const elem of Object.keys(objSize)) {
      if ((e.target as HTMLElement).closest(`[for=${elem}]`)) {
        toyCollection = toyCollection.filter(
          (item) =>
            item.querySelector(".size-toy")?.textContent === objSize[elem]
        );
        console.log(toyCollection);
      }
    }
  }

  if ((e.target as HTMLElement).closest(".color-label")) {
    // eslint-disable-next-line no-restricted-syntax
    for (const elem of Object.keys(objColor)) {
      if ((e.target as HTMLElement).closest(`[for=${elem}]`)) {
        toyCollection = toyCollection.filter(
          (item) =>
            item.querySelector(".color-toy")?.textContent === objColor[elem]
        );
        console.log(toyCollection);
      }
    }
  }

  if ((e.target as HTMLElement).closest(".favorite-label")) {
    toyCollection = toyCollection.filter(
      (item) => item.querySelector(".favorite-toy")?.textContent === "да"
    );
    console.log(toyCollection);
  }
});

/*

document.addEventListener("click", (e: Event) => {
  let toyCollection = Array.from(document.querySelectorAll(".toy-item"));
  let activeFilter = [];

  if ((e.target as HTMLElement).closest(".shape-label")) {
    if (!filters.shape) {
      filters.shape = true;
      console.log(filters);
    }
  }

  if ((e.target as HTMLElement).closest(".size-label")) {
    if (!filters.size) {
      filters.size = true;
      console.log(filters);
    }
  }

  if ((e.target as HTMLElement).closest(".color-label")) {
    if (!filters.color) {
      filters.color = true;
      console.log(filters);
    }
  }

  if ((e.target as HTMLElement).closest(".favorite-label")) {
    if (!filters.color) {
      filters.favorite = true;
      console.log(filters);
    }
  }
}); */
