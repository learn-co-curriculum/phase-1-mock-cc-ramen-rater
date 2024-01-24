import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Window } from 'happy-dom'
import fs from 'fs'
import path from 'path'
import { fireEvent } from '@testing-library/dom'

//! Set the data

const testResponseData = [
    {
        "id": 1,
        "name": "Shoyu Ramen",
        "restaurant": "Nonono",
        "image": "./assets/ramen/shoyu.jpg",
        "rating": 7,
        "comment": "Delish. Can't go wrong with a classic!"
    },
    {
        "id": 2,
        "name": "Naruto Ramen",
        "restaurant": "Naruto",
        "image": "./assets/ramen/naruto.jpg",
        "rating": 10,
        "comment": "My absolute fave!"
    },
    {
        "id": 3,
        "name": "Nirvana Shiromaru",
        "restaurant": "Ippudo",
        "image": "./assets/ramen/nirvana.jpg",
        "rating": "7",
        "comment": "Do buy the hype."
    },
    {
        "id": 4,
        "name": "Gyukotsu Ramen",
        "restaurant": "Za-Ya Ramen",
        "image": "./assets/ramen/gyukotsu.jpg",
        "rating": 8,
        "comment": "Good to the last drop."
    },
    {
        "id": 5,
        "name": "Kojiro Red Ramen",
        "restaurant": "Ramen-Ya",
        "image": "./assets/ramen/kojiro.jpg",
        "rating": 6,
        "comment": "Perfect for a cold night."
    }
];

vi.stubGlobal('testResponseData', testResponseData)

//! Set the DOM

const htmlDocPath = path.join(process.cwd(), 'index.html');
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString();
const window = new Window
const document = window.document
document.body.innerHTML = ''
document.write(htmlDocumentContent)
vi.stubGlobal('document', document)

//! Mock the Fetch API globally

const testFetch = vi.fn((url) => {
    return new Promise((resolve, reject) => {
        const testResponse = {
            ok: true,
            json() {
                return new Promise((resolve, reject) => {
                    resolve(testResponseData);
                });
            },
        };
        resolve(testResponse);
    });
});

vi.stubGlobal('fetch', testFetch);

import { addSubmitListener, displayRamens, handleClick, main } from './index'

//! Test Suite

describe('displayRamens', () => {

    it('should fetch all ramens and display them as <img> inside #ramen-menu', async () => {
        const ramenMenuDiv = document.getElementById('ramen-menu');
        
        displayRamens();
        await new Promise(resolve => setTimeout(resolve, 0));

        const ramenImages = ramenMenuDiv.querySelectorAll('img');
        const urls = Array.from(ramenImages).map((ramenImg) => ramenImg.src);
        const originalUrls = testResponseData.map((ramen) => ramen.image);

        expect(ramenImages.length).toEqual(testResponseData.length);
        expect(urls).toEqual(originalUrls);
    })
})

describe('handleClick', () => {
    it('should fire on a click on every img inside #ramen-menu', async () => {
        const ramenMenuDiv = document.getElementById('ramen-menu');
        const ramenImages = ramenMenuDiv.querySelectorAll('img');

        const handleClickSpy = vi.fn(handleClick);
        vi.stubGlobal('handleClick', handleClickSpy);

        ramenImages.forEach((ramenImg) => {
            const ramen = testResponseData.find((ramen) => ramen.image === ramenImg.src);
            ramenImg.addEventListener('click', (event) => {
                handleClickSpy(ramen, event);
            });
        });

        const img = ramenImages[0];
        fireEvent.click(img);

        expect(handleClickSpy).toHaveBeenCalled();
        expect(handleClickSpy).toHaveBeenCalledWith(testResponseData[0], expect.anything());

    });

    it('should append the correct data to the DOM', async () => {
        const ramenMenuDiv = document.getElementById('ramen-menu');
        const ramenImages = ramenMenuDiv.querySelectorAll('img');

        const img = ramenImages[0]
        fireEvent.click(img);

        const detailImg = document.querySelector("#ramen-detail > .detail-image");
        const detailName = document.querySelector("#ramen-detail > .name");
        const detailRestaurant = document.querySelector("#ramen-detail > .restaurant");
        const detailsRating = document.getElementById("rating-display");
        const detailsComment = document.getElementById("comment-display");

        expect(detailName.textContent).toBe('Shoyu Ramen');
        expect(detailRestaurant.textContent).toBe('Nonono');
        expect(detailImg.src).toBe('./assets/ramen/shoyu.jpg');
        expect(detailsRating.textContent).toBe('7');
        expect(detailsComment.textContent).toBe("Delish. Can't go wrong with a classic!");
    });

})

describe('handleSubmit', () => {
    it('should add a new slider image when the submit button is clicked', async () => {
        const ramenForm = document.getElementById('new-ramen');
        addSubmitListener(ramenForm)
        const newRamen = {
            name: 'Mat',
            restaurant: 'Test',
            image: './assets/ramen/nirvana.jpg',
            rating: '4',
            comment: 'test',
        }

        const ramenMenuDivBefore = document.querySelectorAll('#ramen-menu img');
        const ramenFormName = document.querySelector("#new-ramen #new-name");
        const ramenFormRestaurant = document.querySelector("#new-ramen #new-restaurant");
        const ramenFormImage = document.querySelector("#new-ramen #new-image");
        const ramenFormRating = document.querySelector("#new-ramen #new-rating");
        const ramenFormComment = document.querySelector("#new-ramen #new-comment");

        ramenFormName.value = newRamen.name;
        ramenFormRestaurant.value = newRamen.restaurant;
        ramenFormImage.value = newRamen.image;
        ramenFormRating.value = newRamen.rating;
        ramenFormComment.value = newRamen.comment;
        console.log("🚀 ~ file: index.test.js:171 ~ ", ramenFormName.value, ramenFormRestaurant.value, ramenFormImage.value, ramenFormRating.value, ramenFormComment.value)

        fireEvent.submit(ramenForm, {
            target: {
                name: { value: newRamen.name },
                restaurant: { value: newRamen.restaurant },
                image: { value: newRamen.image },
                rating: { value: newRamen.rating },
                comment: { value: newRamen.comment },
            },
            preventDefault: vi.fn(),
            reset: vi.fn(),

        });

        const ramenMenuDivAfter = document.querySelectorAll('#ramen-menu img');
        expect(ramenMenuDivAfter.length).toBe(ramenMenuDivBefore.length + 1);
        expect(ramenMenuDivAfter[ramenMenuDivBefore.length].src).toBe(newRamen.image);
    });

    it('should attach a click listener to the new element to display its details', () => {
        const newRamen = {
            name: 'Mat',
            restaurant: 'Test',
            image: './assets/ramen/nirvana.jpg',
            rating: '4',
            comment: 'test',
            id: 6

        }
        const ramenMenuDivBefore = document.querySelectorAll('#ramen-menu img');
        const ramenForm = document.getElementById('new-ramen');
        const ramenFormName = document.querySelector("#new-ramen #new-name");
        const ramenFormRestaurant = document.querySelector("#new-ramen #new-restaurant");
        const ramenFormImage = document.querySelector("#new-ramen #new-image");
        const ramenFormRating = document.querySelector("#new-ramen #new-rating");
        const ramenFormComment = document.querySelector("#new-ramen #new-comment");
        const submitButton = document.getElementById('submit-button');

        main(ramenForm)

        ramenFormName.value = newRamen.name;
        ramenFormRestaurant.value = newRamen.restaurant;
        ramenFormImage.value = newRamen.image;
        ramenFormRating.value = newRamen.rating;
        ramenFormComment.value = newRamen.comment;

        fireEvent.click(submitButton);

        const ramenMenuDivAfter = document.querySelectorAll('#ramen-menu img');
        const img = ramenMenuDivAfter[ramenMenuDivBefore.length];
        img.addEventListener('click', (event) => {
            handleClick(newRamen, event);
        });
        fireEvent.click(img);

        const detailImg = document.querySelector("#ramen-detail > .detail-image");
        const detailName = document.querySelector("#ramen-detail > .name");
        const detailRestaurant = document.querySelector("#ramen-detail > .restaurant");
        const detailsRating = document.getElementById("rating-display");
        const detailsComment = document.getElementById("comment-display");

        expect(detailName.textContent).toBe(newRamen.name);
        expect(detailRestaurant.textContent).toBe(newRamen.restaurant);
        expect(detailImg.src).toBe(newRamen.image);
        expect(detailsRating.textContent).toBe(newRamen.rating.toString());
        expect(detailsComment.textContent).toBe(newRamen.comment);
    })
})