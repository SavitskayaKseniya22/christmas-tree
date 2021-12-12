const sortSelect = document.querySelector(".sort-select") as HTMLSelectElement;

sortSelect.addEventListener("change", (): Element[] => {
  let toyCollection = Array.from(document.querySelectorAll(".toy-item"));

  switch (sortSelect.value) {
    case "nameUp":
      toyCollection = toyCollection.sort((a: Element, b: Element) => {
        if (
          (a.querySelector(".small-title")?.textContent as string) >
          (b.querySelector(".small-title")?.textContent as string)
        ) {
          return 1;
        }
        return 0;
      });
      break;
    case "nameDown":
      toyCollection = toyCollection.sort((a: Element, b: Element) => {
        if (
          (a.querySelector(".small-title")?.textContent as string) <
          (b.querySelector(".small-title")?.textContent as string)
        ) {
          return 1;
        }
        return 0;
      });
      break;
    case "valueUp":
      toyCollection = toyCollection.sort((a: Element, b: Element) => {
        if (
          Number(a.querySelector(".year-toy")?.textContent) >
          Number(b.querySelector(".year-toy")?.textContent)
        ) {
          return 1;
        }
        return 0;
      });
      break;
    case "valueDown":
      toyCollection = toyCollection.sort((a: Element, b: Element) => {
        if (
          Number(a.querySelector(".year-toy")?.textContent) <
          Number(b.querySelector(".year-toy")?.textContent)
        ) {
          return 1;
        }
        return 0;
      });
      break;
    default:
      return toyCollection;
  }

  const mainContainer = document.querySelector(
    ".toys-container"
  ) as HTMLElement;
  mainContainer.innerHTML = "";
  // eslint-disable-next-line no-restricted-syntax
  for (const item of toyCollection) {
    mainContainer.append(item);
  }
  return toyCollection;
});
