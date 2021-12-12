const toyCollection = document.querySelectorAll(".toy-item");
const sortSelect = document.querySelector(".sort-select") as HTMLSelectElement;

sortSelect.addEventListener("change", function (e: Event) {
  alert(sortSelect.value);
});
