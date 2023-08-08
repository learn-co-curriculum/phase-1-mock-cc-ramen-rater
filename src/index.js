const url = "http://localhost:3000";

//* Fetch Data & Call render functions to populate the DOM
getJSON(url + "/ramens").then((ramens) => {
  renderRamenReviewCard(ramens[0]);
});

//* Render Functions
function renderRamenReviewCard(ramenReview) {
  document.querySelector("h2.name").textContent = ramenReview.name;
  document.querySelector("h3.restaurant").textContent = ramenReview.restaurant;
  document.querySelector("#ramen-image").src = ramenReview.image;
  document.querySelector("#rating-display").textContent = ramenReview.rating;
  document.querySelector("#comment-display").textContent = ramenReview.comment;
}

// function renderRamenMenu(ramenMenu) {
//     forEach(ramenMenu) {

//     }
// }
