// endpoiints needed are GET /ramens & GET /rames/:id

document.addEventListener('DOMContentLoaded', () => { 
// write your code here
//////////// GLOBAL VARIABLES & STATE //////////// 
let ramen;
let currentRamen;
const baseUrl = 'http://localhost:3000/ramens';
const ramenMenu = document.getElementById('ramen-menu');
const ramenImage = document.querySelector('.detail-image');
const ramenName = document.querySelector('.name')
const ramenRestaurant = document.querySelector('.restaurant')
const ramenRating = document.getElementById('rating-display')
const ramenComment = document.getElementById('comment-display')

//////////// EVENT LISTENERS //////////// 
document.getElementById('new-ramen').addEventListener('submit', addRamen)
document.getElementById('edit-ramen').addEventListener('submit', editRamen)
document.getElementById('delete-ramen').addEventListener('click', deleteRamen)

//////////// Functions //////////// 

//Renders Ramen to Nav
function ramenNav(ramen) {
    ramen.forEach(ramenData => {
        const ramenNavImage = document.createElement('img');
        ramenNavImage.src = ramenData.image;
        ramenNavImage.alt = ramenData.name;

        ramenMenu.appendChild(ramenNavImage);

        ramenNavImage.addEventListener('click', () => {
            currentRamen = ramenData;
            displayRamen(ramenData)
        })
    })
}

//Displays Ramen on Click
function displayRamen(ramen) { 
    ramenImage.src = ramen.image;
    ramenImage.alt = ramen.name;
    ramenName.textContent = ramen.name;
    ramenRestaurant.textContent = ramen.restaurant;
    ramenRating.textContent = ramen.rating;
    ramenComment.textContent = ramen.comment;

    
}

//Adds new ramen on form submit
function addRamen(event) {
    event.preventDefault();
    const name = document.getElementById('new-name').value;
    const restaurant = document.getElementById('new-restaurant').value;
    const image = document.getElementById('new-image').value;
    const rating = document.getElementById('new-rating').value;
    const comment = document.getElementById('new-comment').value;

    fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': name,
            'restaurant': restaurant,
            'image': image,
            'rating': rating,
            'comment': comment
        })
    })

}

//update ramen rating and comment
function editRamen(event) { 
    event.preventDefault();
    const newRating = document.getElementById('new-rating').value
    const newComment = document.getElementById('new-comment').value

    fetch(`http://localhost:3000/ramens/${currentRamen.id}`, { 
        method: 'PATCH',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            'rating': newRating,
            'comment': newComment
        })
    })

}

//delete ramen
function deleteRamen(event) {
    event.preventDefault();
    fetch(`http://localhost:3000/ramens/${currentRamen.id}`, {
        method: 'DELETE'
    })
}

//////////// GET //////////// 
fetch('http://localhost:3000/ramens')
.then(response => response.json())
.then(data => { 
    ramen = data;

    ramenNav(ramen)
    displayRamen(ramen[0])
   
})



})