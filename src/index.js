// write your code here
const URL = "http://localhost:3000/ramens";

// See all ramen images
//in the div with the id of ramen-menu.
// When the page loads,
// document.addEventListener("DOMContentLoaded", () => {
const ramenMenu = document.getElementById("ramen-menu");
const ramenImage = document.querySelector(".detail-image");
const ramenName = document.querySelector(".name");
const ramenRestaurant = document.querySelector(".restaurant");
const ramenRating = document.querySelector("#rating-display");
const ramenComment = document.querySelector("#comment-display");
const form = document.getElementById("new-ramen");

// request the data from the server to get all the ramen objects.
fetch(URL)
  .then((res) => res.json())
  .then((data) => renderRamens(data));

// Then, display the image for each of the ramen using an img tag inside the #ramen-menu div.
function renderRamens(ramenArray) {
  ramenArray.forEach((ramen) => renderSingleRamenToMenu(ramen));
}

function renderSingleRamenToMenu(ramenObj) {
  const newRamenImg = document.createElement("img");
  newRamenImg.src = ramenObj.image;

  // Click on an image from the #ramen-menu div
  newRamenImg.addEventListener("click", () => {
    // and see all the info about that ramen displayed inside the #ramen-detail div
    ramenImage.src = ramenObj.image;
    ramenName.textContent = ramenObj.name;
    ramenRestaurant.textContent = ramenObj.restaurant;

    //  and where it says insert comment here and insert rating here.
    ramenRating.textContent = ramenObj.rating;
    ramenComment.textContent = ramenObj.comment;
  });

  // append to the ramen menu
  ramenMenu.append(newRamenImg);
}

// Create a new ramen after submitting the new-ramen form.
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const newRamenObj = {
    name: event.target.name.value,
    restaurant: event.target.restaurant.value,
    image: event.target.image.value,
    rating: event.target.rating.value,
    comment: event.target["new-comment"].value,
  };
  renderSingleRamenToMenu(newRamenObj);
});
// });