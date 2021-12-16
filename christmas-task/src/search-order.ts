const sortSelect = document.querySelector(".sort-select") as HTMLSelectElement;
const myStorage = window.localStorage;

export function changeOrder() {
  const data = Array.from(document.querySelectorAll(".toy-item"));
  if (!myStorage.getItem("order")) {
    myStorage.setItem("order", "nameUp");
  }
  const value = myStorage.getItem("order");

  const selectedOption = document.querySelector(`[value=${value}]`);
  selectedOption.setAttribute("selected", "true");
  let sortedData;
  switch (value) {
    case "nameUp":
      sortedData = data.sort((a: Element, b: Element) => {
        return Number(
          (a.querySelector(".small-title")?.textContent as string) >
            (b.querySelector(".small-title")?.textContent as string),
        );
      });

      break;
    case "nameDown":
      sortedData = data.sort((a: Element, b: Element) => {
        return Number(
          (a.querySelector(".small-title")?.textContent as string) <
            (b.querySelector(".small-title")?.textContent as string),
        );
      });
      break;
    case "valueUp":
      sortedData = data.sort((a: Element, b: Element) => {
        return Number(
          Number(a.querySelector(".year-toy")?.textContent) > Number(b.querySelector(".year-toy")?.textContent),
        );
      });
      break;
    case "valueDown":
      sortedData = data.sort((a: Element, b: Element) => {
        return Number(
          Number(a.querySelector(".year-toy")?.textContent) < Number(b.querySelector(".year-toy")?.textContent),
        );
      });
      break;
    default:
      return sortedData;
  }

  const mainContainer = document.querySelector(".toys-container");
  mainContainer.innerHTML = "";
  for (const item of sortedData) {
    mainContainer.append(item);
  }
  return sortedData;
}

sortSelect.addEventListener("change", () => {
  myStorage.setItem("order", sortSelect.value);
  changeOrder();
});
