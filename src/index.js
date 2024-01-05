// write your code here
// document.addEventListener("DOMContentLoaded", () => {
//     displayRamens();
//     addSubmitListener();
// })

// fetches ramens and puts them all on the menu
function displayRamens() {
    // fetch ramens from database
    fetch("http://localhost:3000/ramens")
        .then(res => res.json())
        .then(ramens => {
            ramens.forEach(ramen => renderOneRamen(ramen));
            showRamenDetails(ramens[0]);
        });
}

function addSubmitListener() {
    const ramenForm = document.getElementById("new-ramen");

    ramenForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addNewRamen();
        ramenForm.reset();
    });
}

// adds one ramen at a time to the menu
// adds event listeners to each individual ramen for display and delete
function renderOneRamen(ramen) {
    // create ramen image element
    // create ramen div element (to contain img + delete button)
    // grab ramen menu div
    const ramenImg = document.createElement("img");
    const ramenDiv = document.createElement("div");
    const ramenMenu = document.getElementById("ramen-menu");
    
    // give ramenImg a src from the ramen object passed in
    ramenImg.src = ramen.image;

    // append ramenDiv to menuDiv
    ramenMenu.appendChild(ramenDiv); // Replace append with appendChild
    ramenDiv.appendChild(ramenImg);  // Replace append with appendChild

    // add event listener to image to display ramen
    ramenImg.addEventListener("click", () => showRamenDetails(ramen));

    // build a delete button, append to ramenDiv
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.className = "delete-btn";
    ramenDiv.appendChild(deleteButton);

    // we pass in the id of the ramen to identify it on the back end
    // and we pass in the ramenDiv to identify it on the front end
    deleteButton.addEventListener("click", () => deleteRamen(ramen.id, ramenDiv))
}

// displays ramen details in center when its menu image is clicked
function showRamenDetails(ramen) {
    // Correctly grab detail elements
    const detailImage = document.querySelector(".detail-image");
    const detailName = document.querySelector(".name");
    const detailRestaurant = document.querySelector(".restaurant");
    const detailRating = document.getElementById("rating-display");
    const detailComment = document.getElementById("comment-display");

    // Check if elements exist before setting their properties
    if (detailImage && detailName && detailRestaurant && detailRating && detailComment) {
        // Insert ramen info into those elements
        detailImage.src = ramen.image;
        detailName.textContent = ramen.name;
        detailRestaurant.textContent = ramen.restaurant;
        detailRating.textContent = ramen.rating;
        detailComment.textContent = ramen.comment;
    } else {
        // Handle the case where one or more elements are not found
        console.error("One or more detail elements not found.");
    }
}

// gets new ramen from form, then adds it to database, then adds to menu
function addNewRamen() {
    // build newRamen object from form inputs
    const newName = document.getElementById("new-name").value;
    const newRestaurant = document.getElementById("new-restaurant").value;
    const newImage = document.getElementById("new-image").value;
    const newRating = document.getElementById("new-rating").value;
    const newComment = document.getElementById("new-comment").value;

    const newRamen = {
        "name": newName,
        "restaurant": newRestaurant,
        "image": newImage,
        "rating": newRating,
        "comment": newComment
    }
    // POST new ramen to db
    fetch("http://localhost:3000/ramens", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRamen)
    })

    // add new ramen to menu by calling renderOneRamen()
    renderOneRamen(newRamen);

    // display the details of the new ramen (nifty!)
    showRamenDetails(newRamen);
}

// deletes ramen from db and from ramen menu
// we pass in the id of the ramen to identify it on the back end
// and we pass in the ramenDiv to identify it on the front end
function deleteRamen(id, ramenDiv) {
    // delete ramen from database
    fetch(`http://localhost:3000/ramens/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    // delete corresponding ramen image from menu
    ramenDiv.remove();

    // reset the displayed ramen info
    const placeholderInfo = {
        "name": "Click a ramen!",
        "restaurant": ":3",
        "image": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Wn3NuoGzrYA99hHdlJPyqgHaGH%26pid%3DApi&f=1&ipt=eed45238f4853904989af4839e855d4e6fe2094fd1b7640d14dd66bdb6a301da&ipo=images",
        "rating": "Select a ramen to display its rating!",
        "comment": "Same deal."
    }

    showRamenDetails(placeholderInfo);
}

module.exports = {
    displayRamens,
    addSubmitListener,
    renderOneRamen,
    showRamenDetails,
    addNewRamen,
    deleteRamen
};
