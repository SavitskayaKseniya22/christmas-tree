const sortSelect = document.querySelector(".sort-select") as HTMLSelectElement;

sortSelect.addEventListener("change", (): Element[] => {
  let toyCollection = Array.from(document.querySelectorAll(".toy-item"));

  switch (sortSelect.value) {
    case "nameUp":
      toyCollection = toyCollection.sort((a: Element, b: Element) => {
        return Number(
          (a.querySelector(".small-title")?.textContent as string) >
            (b.querySelector(".small-title")?.textContent as string),
        );
      });

      break;
    case "nameDown":
      toyCollection = toyCollection.sort((a: Element, b: Element) => {
        return Number(
          (a.querySelector(".small-title")?.textContent as string) <
            (b.querySelector(".small-title")?.textContent as string),
        );
      });
      break;
    case "valueUp":
      toyCollection = toyCollection.sort((a: Element, b: Element) => {
        return Number(
          Number(a.querySelector(".year-toy")?.textContent) > Number(b.querySelector(".year-toy")?.textContent),
        );
      });
      break;
    case "valueDown":
      toyCollection = toyCollection.sort((a: Element, b: Element) => {
        return Number(
          Number(a.querySelector(".year-toy")?.textContent) < Number(b.querySelector(".year-toy")?.textContent),
        );
      });
      break;
    default:
      return toyCollection;
  }

  const mainContainer = document.querySelector(".toys-container") as HTMLElement;
  mainContainer.innerHTML = "";
  for (const item of toyCollection) {
    mainContainer.append(item);
  }
  return toyCollection;
});
