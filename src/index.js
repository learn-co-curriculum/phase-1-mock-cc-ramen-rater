//* HTML Selectors
const ramenMenu = document.querySelector("#ramen-name");
const ramenDetails = document.querySelector("#ramen-details");
const ramenForm = document.querySelector("#new-ramen");

const url = "http://localhost:3000";

getJSON(url + "/ramens").then((ramens) => {
  ramens.forEach((ramen) => renderMenu(ramen));
});

//* Render Functions

function renderMenu(ramen) {
  const img = document.createElement("img");
  img.src = ramen.image;
  img.alt = `Picture of ${ramen.name}`;
  ramenMenu.appendChild(img);
}
function renderMenuDetails(ramen) {
  //* put selected ramen on page
}
