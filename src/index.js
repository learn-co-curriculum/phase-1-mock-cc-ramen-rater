//* HTML Selectors
const ramenMenu = document.querySelector("#ramen-name");
const ramenDetails = document.querySelector("#ramen-details");
const ramenForm = document.querySelector("#new-ramen");

const url = "http://localhost:3000";

getJSON(url + "/ramens").then((ramens) => {});

//* Render Functions

function renderMenu() {}
function renderMenuDetails() {}
