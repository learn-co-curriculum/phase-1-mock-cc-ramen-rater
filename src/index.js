console.log("hello");

// See all ramen images in the div with the id of ramen-menu.

// When the page loads,
// document.addEventListener("DOMContentLoaded", (event) => {

// });

// how to grab the ramen-menu div
const ramenMenu = document.getElementById("ramen-menu");

// request the data from the server to get all the ramen objects.
fetch("http://localhost:3000/ramens")
  .then((response) => response.json())
  .then((ramenArray) => {
    // Then, display the image for each of the ramen using an img tag inside the #ramen-menu div.
    // iterate through the data
    ramenArray.forEach((ramen) => {
      appendRamenToMenu(ramen);
    });
  });

function appendRamenToMenu(ramenObj) {
  // create image html element
  const imageDomElement = document.createElement("img");

  //  populate that with the image of the ramen
  imageDomElement.src = ramenObj.image;

  // add an event listener when the image is clicked...
  imageDomElement.addEventListener("click", () => {
    // CORE DELIVERABLE #2

    // Click on an image from the #ramen-menu div and see all the info about that ramen displayed inside the #ramen-detail div and where it says insert comment here and insert rating here.

    // 1.need to target the image, name, and restaurant tags in the center, as well rating and comments
    const posterImage = document.querySelector("#ramen-detail .detail-image");
    // or const ramenDetail = document.getElementById('ramen-detail')
    // ramenDetail.querySelector('img');
    // ramenDetail.querySelector('.detail-image');

    // individual tag elements
    // 2. modify the src or textContent
    posterImage.src = ramenObj.image;

    // how to target + update name?
    const posterName = document.querySelector("#ramen-detail .name");
    posterName.textContent = ramenObj.name;

    const posterRestaurant = document.querySelector(
      "#ramen-detail .restaurant"
    );
    posterRestaurant.textContent = ramenObj.restaurant;

    // rating
    const ratingDisplay = document.querySelector("#rating-display");
    ratingDisplay.textContent = ramenObj.rating;

    // comment
    const comment = document.querySelector("#comment-display");
    comment.textContent = ramenObj.comment;
  });

  //  append
  ramenMenu.append(imageDomElement);
}

// Core Deliverable #3
// Create a new ramen after submitting the new-ramen form.

// Target the form
const form = document.querySelector("#new-ramen");

// Attach Event Listener to form
form.addEventListener("submit", (event) => {
  // event is gonna hold the data i need to create a new ramen obj
  console.log("form submitted");
  event.preventDefault();
  // target by the input's "name"
  const newRamenName = event.target.name.value;

  // or, by id:
  // event.target['new-name'].value

  const newRestaurant = event.target["new-restaurant"].value;
  const newImage = event.target["new-image"].value;
  const newRating = event.target["new-rating"].value;
  const newComment = event.target["new-comment"].value;
  debugger;
  // create the ramen object
  const newRamen = {
    // ??
    name: newRamenName,
    restaurant: newRestaurant,
    image: newImage,
    rating: newRating,
    comment: newComment,
  };

  // append it to ramen-menu, ramenMenu
  // parent.append(newChild)
  // createElement
  // modify it accordingly....
  // ramenMenu.append(??)
  appendRamenToMenu(newRamen);
});

// Create new ramen whenever form is submitted
// Add this new ramen to the ramen-menu at the top

// The new ramen should be added to the#ramen-menu div. The new ramen does not need to persist; in other words, if you refresh the page, it's okay that the new ramen is no longer on the page.
