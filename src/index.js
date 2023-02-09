//assigning variables in global to have access to them from anywhere
const ramenMenu = document.querySelector("#ramen-menu");
const eachImg = document.getElementsByClassName("detail-image")[0];
const ramenName = document.getElementsByClassName("name")[0];
const restaurantName = document.getElementsByClassName("restaurant")[0];
const rating = document.getElementById("rating-display");
const comment = document.getElementById("comment-display");
const form = document.getElementById('new-ramen')
const editForm = document.getElementById('edit-ramen')
const deleteBtn = document.getElementById('delete-btn')
// let selectedRamen
let ramenData = []


// fetching data from db.json
// calling function for each ramen that will display images in the menu div
// calling function that takes the first ramen as an argument
fetch('http://localhost:3000/ramens')
.then(res => res.json())
.then(data => {
  ramenData = data
  renderData(data)
  renderRamen(data[0])
})

// function loops through all the data
function renderData(data) {
  data.forEach(ramen => renderMenu(ramen))
}

// function that displays menu-div
// adding event listener to each image to display detailed info
function renderMenu(ramen) {
  const menuImg = document.createElement('img')
  menuImg.src = ramen.image
  ramenMenu.append(menuImg)
  menuImg.addEventListener('click', () => renderRamen(ramen))
  menuImg.setAttribute('ramen-id', ramen.id); //include ramen id for editing and deleting
}

// function displays detailed info about each ramen
function renderRamen(ramen) {
  // selectedRamen = ramen
  eachImg.src = ramen.image
  ramenName.textContent = ramen.name
  restaurantName.textContent = ramen.restaurantName
  rating.textContent = ramen.rating
  comment.textContent = ramen.comment

  //setting attributes to edit form and delete btn to have access to current ramen's id
  editForm.setAttribute('ramen-id', ramen.id);
  deleteBtn.setAttribute('ramen-id', ramen.id);
}


// function runs after user submits the form to add new ramen
function addNewRamen(e) {
  e.preventDefault()
  console.log(e)
  // console.log(document.querySelector('#new-name').value)
  // console.log(e.target.name.value)
  // console.log(e.target[0].value)

  // 
  const newRamen =  {
    name: e.target.name.value,
    restaurant: e.target.restaurant.value,
    image: e.target.image.value,
    rating: e.target.rating.value,
    comment: e.target['new-comment'].value
  }

  // posting new ramen to database
  fetch('http://localhost:3000/ramens', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newRamen)
  })
  .then(res => res.json())
  .then(data => {
    // updating the menu div with the new ramen
    // updating detailed info with the new ramen
    renderRamen(data)
    renderMenu(data)
  })

  // resetting the form
  e.target.reset()
}


function editRamen(e) {
  e.preventDefault()

  const ramenId = e.target.getAttribute('ramen-id')

  // rating.textContent = e.target.rating.value
  // comment.textContent = e.target['new-comment'].value
  // selectedRamen.rating = e.target.rating.value
  // selectedRamen.comment = e.target['new-comment'].value

  const updatedRamen = {
    rating: e.target.rating.value,
    comment: e.target['new-comment'].value
  }

  // updating ramen info on our database
  fetch(`http://localhost:3000/ramens/${ramenId}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedRamen)
  })
  .then(res => res.json())
  .then(data => {
    // updating detailed info with the updated ramen
    renderRamen(data)
  })

  // resetting the form
  e.target.reset()
}

function deleteRamen(e) {

  const ramenId = e.target.getAttribute('ramen-id')

  //ANOTHER SOLUTION TO REMOVE IMG FROM THE MENU
  //get list of all images in menu
  //remove image that matches the ramen that was deleted
  // let menuList = document.querySelectorAll('#ramen-menu img') 
  // menuList.forEach(el => {
  //   if (el.getAttribute('ramen-id') === ramenId) {
  //       el.remove(); //remove image node from menuList
  //   }})

  fetch(`http://localhost:3000/ramens/${ramenId}`, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(() => {
    // filter through ramenData array and return new array without deleted ramen
    const updatedData = ramenData.filter(ramen => ramen.id !== ramenId)
    renderData(updatedData)
    renderRamen(updatedData[0])
  })

}


//Event listeners

form.addEventListener('submit', addNewRamen)
editForm.addEventListener('submit', editRamen)
deleteBtn.addEventListener('click', deleteRamen)