const mainContainer = document.querySelector(".toys-container") as HTMLElement;
const clearSearch = document.querySelector(
  ".clear-search"
) as HTMLButtonElement;
const searchInput = document.querySelector(".search-input") as HTMLInputElement;
const toyCollection = Array.from(document.querySelectorAll(".toy-item"));

function searchToy(arg: Element[]): void {
  // alert(searchInput.value);

  // alert(toyCollection.length);

  const filterToys = arg.filter((word) =>
    (word.children[0].textContent as string).includes(searchInput.value)
  );

  (mainContainer as HTMLElement).innerHTML = "";
  for (let item of filterToys) {
    mainContainer.append(item);
  }
}

clearSearch.addEventListener("click", (e: Event): void => {
  searchInput.value = "";
});

searchInput.addEventListener("input", (e: Event): void => {
  searchToy(toyCollection);
});
