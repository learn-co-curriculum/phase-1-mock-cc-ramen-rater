// CORE DELIVERABLES

// base url
const ramenUrl = `http://localhost:3000/ramens`

// ramen state
let ramen = []

// html elements
const ramenMenu = document.getElementById('ramen-menu')
const ramenDetail = document.getElementById('ramen-detail')
const [ramenDetailImage, ramenDetailName, ramenDetailRestaurant] = ramenDetail.children
const newRamenForm = document.getElementById('new-ramen')
const newRamenNameInput = document.getElementById('new-name')
const newRamenRestaurantInput = document.getElementById('new-restaurant')
const newRamenImageInput = document.getElementById('new-image')
const newRamenRatingInput = document.getElementById('new-rating')
const newRamenCommentInput = document.getElementById('new-comment')

// run app
fetchRamen()
listenMenu()
listenNewRamenForm()


// Function Declarations
// get all ramen and add them to menu
function fetchRamen() {
    fetch(ramenUrl)
    .then(r => r.json())
    .then(data => {
        ramen = data
        ramen.forEach(r => {
            addRamenMenuItem(r)
        })
    })
}

// add individual ramen to menu
function addRamenMenuItem(r){
    const ramenImg = document.createElement('img')
    ramenImg.src = r.image
    ramenImg.alt = r.name
    ramenImg.dataset.id = r.id
    ramenMenu.append(ramenImg)
}

// add click event to menu
function listenMenu() {
    ramenMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            setRamenDetailsById(e.target.dataset.id)
        }
    })
}

// set details of selected ramen by id
function setRamenDetailsById(id){
    const selected = ramen.find(r => r.id == id)
    ramenDetailImage.src = selected.image
    ramenDetailName.innerText = selected.name
    ramenDetailRestaurant.innerText = selected.restaurant
}

// add new ramen to menu on submit
function listenNewRamenForm(){
    newRamenForm.addEventListener('submit', (e) => {
        e.preventDefault()
        console.dir(newRamenForm)
        let newRamen = {
            name: newRamenNameInput.value,
            restaurant: newRamenRestaurantInput.value,
            image: newRamenImageInput.value,
            rating: Number(newRamenRatingInput.value),
            comment: newRamenCommentInput.value
        }
        ramen.push(newRamen)
        addRamenMenuItem(newRamen)
    })
}