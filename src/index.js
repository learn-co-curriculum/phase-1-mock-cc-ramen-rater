// write your code here

const URL = "http://localhost:3000/ramens";

document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector("#ramen-menu");
    const form = document.querySelector("#new-ramen");

    fetch(URL)
    .then(resp => resp.json())
    .then(ramenArray => createRamensMenu(ramenArray));


    function createRamensMenu(ramenArray) {
        ramenArray.forEach(ramenImg => createRamenMenu(ramenImg))
    }

    function createRamenMenu(data) {
        const menuNode = document.createElement("div");
        menuNode.classList.add("ramen-menu");

        menuNode.innerHTML = `<img src=${data.image}>`

        menuNode.addEventListener("click", event => {
            event.preventDefault();
            const ramenDetail = document.querySelector("#ramen-detail");
            const ramenRating = document.querySelector("#rating-display");
            const ramenComment = document.querySelector("#comment-display");

            fetch(`${URL}/${data.id}`)
            .then(resp => resp.json())
            .then(ramenObj => ramenInfo(ramenObj));

            function ramenInfo(data) {
                ramenDetail.innerHTML = 
                `<img class="detail-image" src="${data.image}" alt="${data.name}" />
                <h2 class="name">${data.name}</h2>
                <h3 class="restaurant">${data.restaurant}</h3>`

                ramenRating.innerHTML = 
                ` <span id='rating-display'>${data.rating}</span>`

                ramenComment.innerHTML = 
                `<p id='comment-display'>
                ${data.comment}
              </p>`
                };
        });

        menu.appendChild(menuNode);
    };
    form.addEventListener("submit", event => {
        event.preventDefault();
        const name = event.target.name.value;
        const restaurant = event.target.restaurant.value;
        const image = event.target.image.value;
        const rating = event.target.rating.value;
        const comment = document.querySelector('textarea').addEventListener('input', event => {
            event.target.value;
        });

        const newRamen = {
            name,
            restaurant,
            image,
            rating,
            comment
        }

        return createRamenMenu(newRamen);
    })
});