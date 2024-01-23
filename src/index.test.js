import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Window } from 'happy-dom'
import fs from 'fs'
import path from 'path'

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
    },
    {
        "name": "Mat",
        "restaurant": "Test",
        "image": "file:///Users/matteo/Development/code-challenge/phase-1-mock-cc-ramen-rater/assets/ramen/nirvana.jpg",
        "rating": "4",
        "comment": "test",
        "id": 6
    }
];
vi.stubGlobal('testResponseData', testResponseData)
const htmlDocPath = path.join(process.cwd(), 'index.html');
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString();

const window = new Window
const document = window.document
document.body.innerHTML = ''
document.write(htmlDocumentContent)
vi.stubGlobal('document', document)
import { displayRamens } from './index'



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

describe('displayRamens', () => {

    beforeEach(() => {
        document.body.innerHTML = ''
        document.write(htmlDocumentContent)
    })

    it('should fetch all ramens and display them as <img> inside #ramen-menu', async () => {

        const ramenMenuDiv = document.getElementById('ramen-menu');
        
        await displayRamens();
        await new Promise(resolve => setTimeout(resolve, 0));

        const ramenImages = ramenMenuDiv.querySelectorAll('img');
        const urls = Array.from(ramenImages).map((ramenImg) => ramenImg.src);
        const originalUrls = testResponseData.map((ramen) => ramen.image);

        expect(ramenImages.length).toEqual(testResponseData.length);
        expect(urls).toEqual(originalUrls);


    })


})