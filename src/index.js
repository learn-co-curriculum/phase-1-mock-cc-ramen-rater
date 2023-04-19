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
document.querySelector('form').addEventListener('submit', addRamen)

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

//////////// GET //////////// 
fetch('http://localhost:3000/ramens')
.then(response => response.json())
.then(data => { 
    ramen = data;

    ramenNav(ramen)
   
})



})