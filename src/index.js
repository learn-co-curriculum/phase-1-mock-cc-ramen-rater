//assigning variables in global to have access to them from anywhere
const ramenMenu = document.querySelector("#ramen-menu");
let ramenName = document.getElementsByClassName("name")[0];
let restaurantName = document.getElementsByClassName("restaurant")[0];
let rating = document.getElementById("rating-display");
let comment = document.getElementById("comment-display");
let eachImg = document.getElementsByClassName("detail-image")[0];

// getting data from a local server(using fetch)
//also calling even listener on load to get default ramen loaded
function fetchRamen() {
  return fetch("http://localhost:3000/ramens")
    .then((response) => response.json())
    .then((data) => {
      window.addEventListener("load", defaultPage(data));
      renderRamen(data);
    })
    .catch((err) => console.log(err)); //catching an error if there is one
}

//adding default info on the first load of the page
function defaultPage(ramen) {
  eachImg.src = ramen[0].image;
  ramenName.textContent = ramen[0].name;
  restaurantName.textContent = ramen[0].restaurant;
  rating.textContent = ramen[0].rating;
  comment.textContent = ramen[0].comment;
}

//function that loops each ramen and lists all the menu on top
function renderRamen(ramenList) {
  ramenList.map((ramen) => {
    let img = document.createElement("img");
    img.src = ramen.image;
    ramenMenu.appendChild(img);

    //adding event listener to each photo
    img.addEventListener("click", () => {
      eachImg.src = ramen.image;
      ramenName.textContent = ramen.name;
      restaurantName.textContent = ramen.restaurant;
      rating.textContent = ramen.rating;
      comment.textContent = ramen.comment;
    });
  });
}

//submitting the form and creating new ramen
const form = document.querySelector("#new-ramen");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let newRamenInfo = {
    name: e.target["new-name"].value,
    restaurant: e.target["new-restaurant"].value,
    image: e.target["new-image"].value,
    rating: e.target["new-rating"].value,
    comment: e.target["new-comment"].value,
  };

  createNewRamen(newRamenInfo);
  form.reset();
});

//Using fetch and method POST to save data on the server
function createNewRamen(info) {
  img.src = info.image;
  ramenMenu.append(img);
  fetch("http://localhost:3000/ramens", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(info),
  })
    .then((response) => response.json())
    .then((ramen) => console.log(ramen)); //just logging to see the result
}

fetchRamen();
