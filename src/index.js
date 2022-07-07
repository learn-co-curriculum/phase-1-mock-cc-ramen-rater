//ramen url
const url = 'http://localhost:3000/ramens';
//grab ramen menu
const ramenMenu = document.getElementById('ramen-menu');
//grab the selected ramen image
const selectedImg = document.querySelector('#ramen-detail > img');
//grab the selected ramen name
const selectedName = document.querySelector('#ramen-detail > h2');
//grab the selected ramen restaurant
const selectedRestaurant = document.querySelector('#ramen-detail > h3');
//grab the selected ramen rating
const selectedRating = document.querySelector('#rating-display');
//grab the selected ramen comment
const selectedComment = document.querySelector('#comment-display');
//grab the form to add new ramen
const newRamen = document.querySelector('#new-ramen');
//grab the form to edit current ramen
const editRamen = document.querySelector('#edit-ramen');


const fetchRamen = async () => {
    //request from db
    const req = await fetch(url);
    //get promise as json
    const res = await req.json();
    return res;
};

const renderMenu = async () => {
    //get data struct from promise
    let currMenu = await fetchRamen();
    //iterate through each, make new image element and append
    //event listener for selecting from menu
    currMenu.forEach(ramenItem => {
        //make element
        let menuImg = document.createElement('img');
        //change img src 
        menuImg.src = `${ramenItem.image}`;
        //specify the class
        menuImg.classList.add('#ramen-menu');
        //apend 
        ramenMenu.append(menuImg);

        //event listener
        menuImg.addEventListener('click', () => {
            //set ramen image
            selectedImg.src = ramenItem.image;
            //set ramen name
            selectedName.textContent = ramenItem.name;
            //set ramen restaurant
            selectedRestaurant.textContent = ramenItem.restaurant;
            //set ramen rating
            selectedRating.textContent = ramenItem.rating;
            //set ramen comment
            selectedComment.textContent = ramenItem.comment;
        })
    });
}

const setInitial = async () => {
    //get data struct from promise
    let currMenu = await fetchRamen();
    //get first item from db
    const ramenItem = currMenu[0];

    //set that shit by data member
    selectedImg.src = currMenu[0].image;
    selectedName.textContent = currMenu[0].name;
    selectedRestaurant.textContent = currMenu[0].restaurant;
    selectedRating.textContent = currMenu[0].rating;
    selectedComment.textContent = currMenu[0].comment;
}
newRamen.addEventListener('submit', (event) => {
    event.preventDefault();

    const newRamenEntry = {
        name: newRamen['name'].value,
        restaurant: newRamen['restaurant'].value,
        image: newRamen['image'].value,
        rating: newRamen['rating'].value,
        comment: newRamen['new-comment'].value,
    }

    let newRamenEntryDb = JSON.stringify(newRamenEntry);


    let addNew = fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: newRamenEntryDb,
    })

    //make element
    let menuImg = document.createElement('img');
    //change img src 
    menuImg.src = `${newRamenEntry.image}`;
    //specify the class
    menuImg.classList.add('#ramen-menu');
    //apend 
    ramenMenu.append(menuImg); 

    //event listener
    menuImg.addEventListener('click', () => {
        //set ramen image
        selectedImg.src = newRamenEntry.image;
        //set ramen name
        selectedName.textContent = newRamenEntry.name;
        //set ramen restaurant
        selectedRestaurant.textContent = newRamenEntry.restaurant;
        //set ramen rating
        selectedRating.textContent = newRamenEntry.rating;
        //set ramen comment
        selectedComment.textContent = newRamenEntry.comment;

    })
})

editRamen.addEventListener('submit', (event) => {
    event.preventDefault();

    
})

renderMenu();
setInitial();