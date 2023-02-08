// write your code here
const menuAPI = "http://localhost:3000";
document.querySelector('#new-ramen').addEventListener('submit', handleSubmit)

function handleSubmit(e){
    e.preventDefault()
    let ramenObj={
        name:e.target.name.value,
        imageURL:e.target.image_url.value,
        restaurant:e.target.restaurant.value,
        rating:e.target.rating.value,
        comment:e.target.comment.value,
    }

renderOneRamen(ramenObj)
newRamen(ramenObj)
}

//render functions
function renderOneRamen(ramen){
    //build ramen
    let menu =getElementById('#ramen-menu')
    menu.createElement('li')
    menu.className= 'menu'
    menu.innerHTML = 
    `<img src=${ramen.image}>
    //<h3>${ramen.name}</h3>
    `
}
//add ramen card to the DOM
document.querySelector('#ramen-menu').appendChild(menu)


function newRamen(){
fetch(menuAPI)
.then(res => res.json())
.then(menuData => menuData.forEach(ramen =>renderOneRamen(ramen)))

}
