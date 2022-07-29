// ADVANCED DELIVERABLES

// base url
const ramenUrl = `http://localhost:3000/ramens`

// ramen state
let ramen = []
let selectedRamenId;

// html elements
const ramenMenu = document.getElementById('ramen-menu')
const ramenDetail = document.getElementById('ramen-detail')
const [ramenDetailImage, ramenDetailName, ramenDetailRestaurant] = ramenDetail.children
const commentDisplay = document.getElementById('comment-display')
const ratingDisplay = document.getElementById('rating-display')
const newRamenForm = document.getElementById('new-ramen')
const newRamenNameInput = document.getElementById('new-name')
const newRamenRestaurantInput = document.getElementById('new-restaurant')
const newRamenImageInput = document.getElementById('new-image')
const newRamenRatingInput = document.getElementById('new-rating')
const newRamenCommentInput = document.getElementById('new-comment')
const editRamenForm = document.getElementById('edit-ramen')
const editRamenRating = document.getElementById('edit-rating')
const editRamenComment = document.getElementById('edit-comment')
const deleteRamenBtn = document.getElementById('delete-ramen')

// run app
fetchRamen()
listenMenu()
listenNewRamenForm()
listenEditRamenForm()
listenDeleteRamen()


// Function Declarations
// get all ramen and add them to menu
function fetchRamen() {
    fetch(ramenUrl)
    .then(r => r.json())
    .then(data => {
        ramen = data
        selectedRamenId = String(ramen[0].id)
        resetMenu()
        setRamenDetailsById(selectedRamenId)
    })
}

function resetMenu(){
    ramenMenu.innerHTML = ""
    ramen.forEach(r => {
        addRamenMenuItem(r)
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
            selectedRamenId = e.target.dataset.id
            setRamenDetailsById(selectedRamenId)
        }
    })
}

// set details of selected ramen by id
function setRamenDetailsById(id){
    const selected = ramen.find(r => r.id == id)
    ramenDetailImage.src = selected.image
    ramenDetailName.innerText = selected.name
    ramenDetailRestaurant.innerText = selected.restaurant
    commentDisplay.innerText = selected.comment
    ratingDisplay.innerText = selected.rating
    editRamenRating.value = selected.rating
    editRamenComment.value = selected.comment
}

function listenEditRamenForm(){
    editRamenForm.addEventListener('submit', e => {
        e.preventDefault()
        fetch(`${ramenUrl}/${selectedRamenId}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment: editRamenComment.value,
                rating: Number(editRamenRating.value)
            })
        })
        .then(r => r.json())
        .then(data => {
            const idx = ramen.findIndex(r => r.id === Number(selectedRamenId))
            ramen = [
                ...ramen.slice(0, idx),
                data,
                ...ramen.slice(idx + 1)
            ]
            commentDisplay.innerText = data.comment
            ratingDisplay.innerText = data.rating
        })
    })
}

// add new ramen to db and menu on submit
function listenNewRamenForm(){
    newRamenForm.addEventListener('submit', e => {
        e.preventDefault()
        let newRamen = {
            name: newRamenNameInput.value,
            restaurant: newRamenRestaurantInput.value,
            image: newRamenImageInput.value,
            rating: Number(newRamenRatingInput.value),
            comment: newRamenCommentInput.value
        }
        fetch(ramenUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRamen)
        })
        .then(r => r.json())
        .then(data => {
            ramen.push(data)
            addRamenMenuItem(data)
        })
    })
}

function listenDeleteRamen(){
    deleteRamenBtn.addEventListener('click', () => {
        fetch(`${ramenUrl}/${selectedRamenId}`, {
            method: 'DELETE'
        })
        .then(r => {
            if (r.ok) {
                ramen = ramen.filter(r => r.id != selectedRamenId)
                selectedRamenId = ramen[0].id
                setRamenDetailsById(selectedRamenId)
                resetMenu()
            }
        })
    })
}