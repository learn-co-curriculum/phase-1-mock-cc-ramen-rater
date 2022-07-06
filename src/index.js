// write your code here


//is creaing a custom object and array the answer?
//why not just use db.json? 
//how do i push things to db.json without making my own object to hold the value for?

let ramenList = [];
let url = 'http://localhost:3000/ramens';
let ramenMenu = document.getElementById('ramen-menu');
let rating = document.querySelector("#rating-display");
let comment = document.querySelector("#comment-display");

let newReview = document.getElementById("new-ramen");

const makeMenu = () => {
    let ramenListInfo = fetch(url);
    let res = ramenListInfo.then(response => response.json());
    res.then(data => {
        for(ramenItem of data){
            ramenList.push(ramenItem);

            const menuImg = document.createElement('img');
            menuImg.src = `${ramenItem.image}`;
            menuImg.classList.add('#ramen-menu');
            menuImg.alt = `${ramenList.length-1}`;
            ramenMenu.append(menuImg);

            menuImg.addEventListener('click', () => {
                let selectedRamenImg = document.querySelector("#ramen-detail > img");
                selectedRamenImg.src = `${ramenList[menuImg.alt].image}`;
                let selectedRamenName = document.querySelector("#ramen-detail > h2");
                selectedRamenName.textContent = `${ramenList[menuImg.alt].name}`;
                let selectedRamenRestaurant = document.querySelector("#ramen-detail > h3")
                selectedRamenRestaurant.textContent = `${ramenList[menuImg.alt].restaurant}`;

                rating.textContent = `${ramenList[menuImg.alt].rating}`;
                comment.textContent = `${ramenList[menuImg.alt].comment}`;
            })
            
        }
    })

    console.log(ramenList)
};

const inputNewReview = () => {
    newReview.addEventListener('submit', (event) => {
        event.preventDefault();

        for (a in event.target[0]){
            console.log(a)
        }

        let obj = {id:`${ramenList.length}`, name:`${event.target[0]}`, restaurant:`${event.target[1]}`, image:`${event.target[2]}`, rating:`${event.target[3]}`, comment:`${event.target[4]}`};
        ramenList.push(obj);

        console.log(ramenList[ramenList.length-1]);
        console.log(ramenList);

    })
}

makeMenu();
//The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
document.addEventListener('DOMContentLoaded', inputNewReview);