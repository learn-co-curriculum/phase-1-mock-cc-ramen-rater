// getting data from a local server
function fetchRamen() {
  return fetch("http://localhost:3000/ramens")
    .then((response) => response.json())
    .then((data) => renderRamen(data));
}

//function that loops each ramen and lists all the menu on top
function renderRamen(ramens) {
  let ramenPhoto = document.querySelector("#ramen-menu");
  ramens.forEach((ramen) => {
    let img = document.createElement("img");
    img.src = ramen.image;
    ramenPhoto.appendChild(img);
  });
  //adding even listener to each photo
  ramenPhoto.addEventListener("click", displayInfo);
}

//cb for the click, finction that displays info about each ramen
function displayInfo(e) {
  console.log(e.target);
  let ramenDetail = document.querySelector("ramen-detail");

  let eachImg = document.getElementsByClassName("detail-image");
  console.log(eachImg);
  //eachImg.innerHTML = e.target;

  //console.log(eachImg);
  let image = document.createElement("img");
  image.innerHTML = e.target;
  //   console.log(image);
  eachImg.append(image);
}

fetchRamen();
