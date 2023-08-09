const url = "http://localhost:3000";

//* HTML Selectors
const ramenDetails = document.querySelector("#ramen-details");
const ramenForm = document.querySelector("#new-ramen");
const ramenDetailsName = document.querySelector("h2.name");
const ramenDetailsRestaurant = document.querySelector("h3.restaurant");
const ramenDetailsImage = document.querySelector("img");
const ramenDetailsRating = document.querySelector("#rating-display");
const ramenDetailsComment = document.querySelector("#comment-display");
const ramenMenu = document.querySelector("#ramen-menu");

//*GIMME DAT DATA
getJSON(url + "/ramens").then((ramens) => {
  ramens.forEach(renderMenu);
  renderDetails(ramens[0]);
});

//* Render Functions
const renderDetails = (ramen) => {
  ramenDetailsName.textContent = ramen.name;
  ramenDetailsImage.src = ramen.image;
  ramenDetailsComment.textContent = ramen.comment;
  ramenDetailsRating.textContent = ramen.rating;
  ramenDetailsRestaurant.textContent = ramen.restaurant;
};

const renderMenu = (ramen) => {
  const img = document.createElement("img");
  img.id = `ramenImage-${ramen.id}`;
  img.className = "menu-Images";
  img.src = ramen.image;
  img.alt = `Picture of ${ramen.name}`;
  img.addEventListener("click", () => renderDetails(ramen));
  ramenMenu.append(img);
};


