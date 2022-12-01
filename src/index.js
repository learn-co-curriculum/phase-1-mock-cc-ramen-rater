document.addEventListener("DOMContentLoaded", () => {
    displayRamens();
    addSubmitListener();
})

// fetches ramens and puts them all on the menu
function displayRamens() {
    // fetch ramens from database
    fetch("http://localhost:3000/ramens")
        .then(res => res.json())
        // once fetched, render each ramen with renderOneRamen()
        .then(ramens => {
            ramens.forEach(ramen => renderOneRamen(ramen))
            // also, show the details of the first ramen in the array
            showRamenDetails(ramens[0]);
        })
}

// adds event listener to form for new ramen submission
function addSubmitListener() {
    const ramenForm = document.getElementById("new-ramen");

    ramenForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addNewRamen();
        ramenForm.reset();
    })
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
    ramenMenu.append(ramenDiv);
    ramenDiv.append(ramenImg);

    // add event listener to image to display ramen
    ramenImg.addEventListener("click", () => showRamenDetails(ramen));

    // build a delete button, append to ramenDiv
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.className = "delete-btn";
    ramenDiv.append(deleteButton);

    // we pass in the id of the ramen to identify it on the back end
    // and we pass in the ramenDiv to identify it on the front end
    deleteButton.addEventListener("click", () => deleteRamen(ramen.id, ramenDiv))
}

// displays ramen details in center when its menu image is clicked
function showRamenDetails(ramen) {
    // grab detail elements
    const detailImage = document.getElementById("detail-image");
    const detailName = document.getElementById("detail-name");
    const detailRestaurant = document.getElementById("detail-restaurant");
    const detailRating = document.getElementById("detail-rating");
    const detailComment = document.getElementById("detail-comment");


    // insert ramen info into those elements
    detailImage.src = ramen.image;
    detailName.textContent = ramen.name;
    detailRestaurant.textContent = ramen.restaurant;
    detailRating.textContent = ramen.rating;
    detailComment.textContent = ramen.comment;
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
