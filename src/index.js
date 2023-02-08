const apiUrl = 'http://localhost:3000/ramens'
const ramenMenuDiv = document.getElementById('ramen-menu')
const newRamenForm = el('new-ramen')
el('new-ramen').addEventListener('submit',newRamenHandler)
fetch(apiUrl)
.then(response => response.json())
.then(renderRamens)

function renderRamens(ramens){
    ramens.forEach(renderRamen);
}
function renderRamen(ramen){
    const ramenImageElement = document.createElement('img');
    ramenImageElement.src= ramen.image;
    ramenMenuDiv.append(ramenImageElement);

    ramenImageElement.addEventListener('click' ,() => ramenClickHandler(ramen));
}
function ramenClickHandler(ramen){
    el('detail-image').src = ramen.image;
    el('detail-name').textContent = ramen.name;
    el('detail-restaurant').textContent=ramen.rating;
    el('rating-display').textContent=ramen.rating
    el('comment-display').textContent = ramen.comment;

}
function el(id){
    return document.getElementById(id);
}
function newRamenHandler(e){
    e.preventDefault();

    const newRamen = {
        name: e.target.name.value,
        restaurant: e.target.restaurant.value,
        image: e.target.image.value,
        rating: e.target.rating.value,
        comment: e.target['new-comment'].value,
    }
    renderRamen(newRamen);
    e.target.reset();

}
