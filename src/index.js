// index.js

// Define global variables for later use
const ramenMenuDiv = document.getElementById("ramen-menu");
const detailImg = document.querySelector("#ramen-detail > .detail-image");
const detailName = document.querySelector("#ramen-detail > .name");
const detailRestaurant = document.querySelector("#ramen-detail > .restaurant");
const detailsRating = document.getElementById("rating-display");
const detailsComment = document.getElementById("comment-display");
const ramenForm = document.getElementById("new-ramen");

// Callbacks
const handleClick = (ramen, event) => {
  const detailImg = document.querySelector("#ramen-detail > .detail-image");
  const detailName = document.querySelector("#ramen-detail > .name");
  const detailRestaurant = document.querySelector("#ramen-detail > .restaurant");
  const detailsRating = document.getElementById("rating-display");
  const detailsComment = document.getElementById("comment-display");

  detailImg.src = ramen.image;
  detailImg.alt = ramen.image;
  detailName.innerText = ramen.name;
  detailRestaurant.innerText = ramen.restaurant;
  detailsRating.innerText = ramen.rating.toString();
  detailsComment.innerText = ramen.comment;
};

const displayRamen = (ramenObj) => {
  const ramenMenuDiv = document.getElementById("ramen-menu");
  const ramenImg = document.createElement("img");
  ramenImg.src = ramenObj.image;
  ramenImg.alt = ramenObj.name;
  ramenImg.classList.add("image-slider");
  ramenImg.addEventListener("click", (event) => handleClick(ramenObj, event));
  ramenMenuDiv.appendChild(ramenImg);
};

const handleSubmit = (event) => {
  console.log("handleSubmit FIRED")
  event.preventDefault();
  const name = event.target.name.value;
  const restaurant = event.target.restaurant.value;
  const image = event.target.image.value;
  const rating = event.target.rating.value;
  const comment = document.getElementById("new-comment").value;
  const newRamen = { name, restaurant, image, rating, comment };
  event.target.reset();
  displayRamen(newRamen);
};

// Fetch function
const displayRamens = () => {
  fetch("http://localhost:3000/ramens")
    .then((response) => response.json())
    .then((ramens) => ramens.forEach(displayRamen))
    .catch((error) => console.log(error));
};

// Start the logic
const addSubmitListener = (form) => form.addEventListener("submit", handleSubmit);

const main = (form) => {
    addSubmitListener(form);
    displayRamens();
}

document.addEventListener('DOMContentLoaded', main)
// main();

// Export functions for testing
module.exports = {
  displayRamens,
  displayRamen,
  addSubmitListener,
  handleSubmit,
  handleClick,
  main,
};
