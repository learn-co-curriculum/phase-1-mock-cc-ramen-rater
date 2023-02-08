const ramenMenu = document.querySelector('#ramen-menu')
const ramenImg = document.querySelector('.detail-image')
const ramenName = document.querySelector('.name')
const restaurant = document.querySelector('.restaurant')
const rating = document.querySelector('#rating-display')
const comment = document.querySelector('#comment-display')

const form = document.querySelector('#new-ramen')


fetch('http://localhost:3000/ramens')
.then(res => res.json())
.then(data => {
  renderRamen(data[0])
  data.forEach(ramen => renderMenu(ramen))
})


function renderMenu(ramen) {
  const image = document.createElement('img')
  image.src = ramen.image
  ramenMenu.appendChild(image)

  image.addEventListener('click', () => renderRamen(ramen))
}

function renderRamen(ramen) {
  // console.log(ramen)
 ramenImg.src = ramen.image
 ramenName.textContent = ramen.name
 restaurant.textContent = ramen.restaurant
 rating.textContent = ramen.rating
 comment.textContent = ramen.comment

}


function addNewRamen(e) {
  e.preventDefault()

  // console.log(typeof(parseInt(e.target.rating.value)))

  const newObj = {
    name: e.target['name'].value,
    restaurant: e.target.restaurant.value,
    image: e.target.image.value,
    rating: e.target.rating.value,
    comment: e.target.new_comment.value
  }

 

  fetch('http://localhost:3000/ramens', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(newObj)
  })
  .then(res => res.json())
  .then(newObject => {
    renderMenu(newObject)
    renderRamen(newObject)
  })

  // console.log(e.target['new-name'].value)
  // console.log(e.target.name.value)
}

// event listeners

form.addEventListener('submit', (e) => addNewRamen(e))
