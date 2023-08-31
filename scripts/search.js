const searchButton = document.querySelector(".search-button");

searchButton.addEventListener("click", () => {
  searchEvent();
});

document.addEventListener("keyup", ({ key }) => {
  if (key === "Enter") {
    searchEvent();
  }
});
