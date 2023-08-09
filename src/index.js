const url = "http://localhost:3000";

//*GIMME DAT DATA
getJSON(url + "/ramens").then((ramens) => {
  ramens.forEach(renderMenu);
});

//* HTML Selectors
const ramenDetails = document.querySelector("#ramen-details");
const ramenForm = document.querySelector("#new-ramen");
const ramenDetailsName = document.querySelector("h2.name");
const ramenDetailsRestaurant = document.querySelector("h3.restaurant");
const ramenDetailsImage = document.querySelector("img");
const ramenDetailsRating = document.querySelector("#rating-display");
const ramenDetailsComment = document.querySelector("#comment-display");

//* Render Functions
const renderMenu = (ramen) => {
  const menu = document.querySelector("#ramen-menu");
  const img = document.createElement("img");

  img.id = `ramenImage-${ramen.id}`;
  img.className = "menu-Images";
  img.src = ramen.image;
  img.alt = `Picture of ${ramen.name}`;
  img.dataset.id = ramen.id;
  img.dataset.restaurant = ramen.restaurant;
  img.dataset.rating = ramen.rating;
  img.dataset.comment = ramen.comment;

  img.addEventListener("click", function () {
    ramenDetailsName.textContent = this.alt;
    ramenDetailsImage.src = this.src;
    ramenDetailsComment.textContent = this.dataset.comment;
    ramenDetailsRating.textContent = this.dataset.rating;
    ramenDetailsRestaurant.textContent = this.dataset.restaurant;
  });

  menu.append(img);
};
