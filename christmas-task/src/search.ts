const clearSearch = document.querySelector(".clear-search") as HTMLButtonElement;
const searchInput = document.querySelector(".search-input") as HTMLInputElement;
const searchWarning = document.querySelector(".search-warning") as HTMLSpanElement;
function searchToy(): void {
  const toyCollection = document.querySelectorAll(".toy-item");

  for (const item of toyCollection) {
    item.setAttribute("data-visible", "true");
    if (!(item.children[0].textContent as string).toLowerCase().includes(searchInput.value.toLowerCase())) {
      item.setAttribute("data-visible", "false");

      const arr = document.querySelectorAll("[data-visible='false']");
      if (arr.length === toyCollection.length) {
        searchWarning.textContent = "Извините, совпадений не обнаружено";
      } else {
        searchWarning.textContent = "";
      }
    }
  }
}

clearSearch.addEventListener("click", (): void => {
  searchInput.value = "";
  searchWarning.textContent = "";
  searchToy();
});

searchInput.addEventListener("input", (): void => {
  searchToy();
});
