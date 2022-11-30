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
        .then(ramens => ramens.forEach(ramen => renderOneRamen(ramen)))
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
function renderOneRamen(ramen) {
    // create ramen image element
    // grab ramen menu div
    const ramenImg = document.createElement("img")
    const ramenMenu = document.getElementById("ramen-menu")
    
    // give ramenImg a src from the ramen object passed in
    ramenImg.src = ramen.image

    // append ramen image to div
    ramenMenu.append(ramenImg)

    // add event listener to image to display ramen
    ramenImg.addEventListener("click", () => showRamenDetails(ramen))
}

// displays ramen details in center when its menu image is clicked
function showRamenDetails(ramen) {
    // grab detail elements
    const detailImage = document.getElementById("detail-image")
    const detailName = document.getElementById("detail-name")
    const detailRestaurant = document.getElementById("detail-restaurant")
    const detailRating = document.getElementById("detail-rating")
    const detailComment = document.getElementById("detail-comment")

    // insert ramen info into those elements
    detailImage.src = ramen.image
    detailName.textContent = ramen.name
    detailRestaurant.textContent = ramen.restaurant
    detailRating.textContent = ramen.rating
    detailComment.textContent = ramen.comment
}   

// get new ramen from form, add new ramen to database, and add to menu
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
}

// deleteRamen
