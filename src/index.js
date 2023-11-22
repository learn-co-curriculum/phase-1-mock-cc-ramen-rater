url = "http://localhost:3000";

//* HTML Selectors
const ramenMenu = document.querySelector("#ramen-menu");
const ramenDetails = document.querySelector("#ramen-details");
const ramenDetailImage = document.querySelector("#ramen-image");
const ramenDetailName = document.querySelector(".name");
const ramenDetailRestaurant = document.querySelector(".restaurant");
const ramenDetailRating = document.querySelector("#rating-display");
const ramenDetailComment = document.querySelector("#comment-display");
const form = document.querySelector("#new-ramen");

//* GIMME DAT DATA
getJSON(url + "/ramens").then((ramens) => {
  ramens.forEach(renderMenu);
  renderDetails(ramens[0]);
});

//* Render Functions
const renderMenu = (ramen) => {
  const img = document.createElement("img");
  img.src = ramen.image;
  img.addEventListener("click", () => {
    renderDetails(ramen);
  });
  ramenMenu.append(img);
};

const renderDetails = (ramen) => {
  ramenDetailName.innerText = ramen.name;
  ramenDetailImage.src = ramen.image;
  ramenDetailRestaurant.innerText = ramen.restaurant;
  ramenDetailRating.innerText = ramen.rating;
  ramenDetailComment.innerText = ramen.comment;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const ramen = {
    image: form.image.value,
    name: form.name.value,
    restaurant: form.restaurant.value,
    rating: parseInt(form.rating.value),
    comment: form["new-comment"].value,
  };
  renderMenu(ramen);
  form.reset();
});
