
const chai = require('chai');
const sinon = require('sinon');
const mochaJsdom = require('mocha-jsdom');

// Your test code here

const { displayRamens, addSubmitListener, renderOneRamen, showRamenDetails, addNewRamen, deleteRamen } = require('../src/index'); // Adjust the path based on your project structure

describe('Ramen Menu App Tests', () => {
    mochaJsdom({
        url: "http://localhost",
        skipWindowCheck: true
    });

    let server;

    beforeEach(() => {
        server = sinon.createFakeServer();
    });

    afterEach(() => {
        server.restore();
    });

    describe('displayRamens', () => {
        it('should fetch and display all ramens', () => {
            const fakeData = [{}, {}]; // Mock data
            server.respondWith('GET', 'http://localhost:3000/ramens', [
                200,
                { 'Content-Type': 'application/json' },
                JSON.stringify(fakeData)
            ]);

            displayRamens();

            server.respond();

            // Add assertions to check if ramens are rendered in the #ramen-menu div
        });
    });

    describe('addSubmitListener', () => {
        it('should handle new ramen form submission', () => {
            const form = document.createElement('form');
            form.id = 'new-ramen';
            document.body.appendChild(form);

            addSubmitListener();

            // Simulate form submission
            // Add assertions to check form submission handling
        });
    });
    describe('renderOneRamen', () => {
      it('should add one ramen to the menu', () => {
          const ramenMenuDiv = document.createElement('div');
          ramenMenuDiv.id = 'ramen-menu';
          document.body.appendChild(ramenMenuDiv);
  
          const ramen = {}; // Mock a ramen object
          renderOneRamen(ramen);
  
          // Assertions go here
  
          document.body.removeChild(ramenMenuDiv);
      });
  });
  
  
  
  
    describe('showRamenDetails', () => {
        it('should display ramen details on image click', () => {
            const ramen = {}; // Mock a ramen object
            const image = document.createElement('img');
            image.addEventListener('click', () => showRamenDetails(ramen));

            image.click();

            // Add assertions to check if details are correctly displayed
        });
    });

    describe('addNewRamen', () => {
      it('should handle the creation of new ramen', () => {
          // Create and append mock input elements to the document body
          const ramenMenuDiv = document.createElement('div');
          ramenMenuDiv.id = 'ramen-menu';
          document.body.appendChild(ramenMenuDiv);
  
          const mockInputs = {
              'new-name': 'Test Ramen Name',
              'new-restaurant': 'Test Ramen Restaurant',
              'new-image': 'test_image.jpg',
              'new-rating': '5',
              'new-comment': 'Delicious!'
          };
  
          Object.entries(mockInputs).forEach(([id, value]) => {
              const input = document.createElement('input');
              input.id = id;
              input.value = value;
              document.body.appendChild(input);
          });
  
          const mockDetailImage = document.createElement('img');
          mockDetailImage.className = 'detail-image';
          document.body.appendChild(mockDetailImage);
  
          // Create and append mock detail elements
          const detailName = document.createElement('h2');
          detailName.className = 'name';
          document.body.appendChild(detailName);
  
          const detailRestaurant = document.createElement('h3');
          detailRestaurant.className = 'restaurant';
          document.body.appendChild(detailRestaurant);
  
          const detailRating = document.createElement('span');
          detailRating.id = 'rating-display';
          document.body.appendChild(detailRating);
  
          const detailComment = document.createElement('p');
          detailComment.id = 'comment-display';
          document.body.appendChild(detailComment);
  
          // Call the function
          addNewRamen();
  
          // Add your assertions here
          // Since `addNewRamen` involves asynchronous operations (fetch),
          // you might need to handle this in your test.
  
          // Clean up by removing the appended elements
          document.body.removeChild(ramenMenuDiv);
          Object.keys(mockInputs).forEach(id => {
              const input = document.getElementById(id);
              document.body.removeChild(input);
          });
          document.body.removeChild(mockDetailImage);
          document.body.removeChild(detailName);
          document.body.removeChild(detailRestaurant);
          document.body.removeChild(detailRating);
          document.body.removeChild(detailComment);
      });
  });
  
  
  
  

  describe('deleteRamen', () => {
    it('should remove a ramen from both the database and the UI', () => {
        // Create a ramenDiv element and append it to the document body
        const ramenDiv = document.createElement('div');
        document.body.appendChild(ramenDiv);

        const ramenId = 1; // Mock ramen ID
        // Call deleteRamen and pass a valid ramenDiv element
        deleteRamen(ramenId, ramenDiv);

        // Add assertions to test if it's removed from UI and fake API call is made

        // Clean up by removing the appended ramenDiv (if it wasn't removed already)
        if (ramenDiv.parentNode) {
            ramenDiv.parentNode.removeChild(ramenDiv);
        }
    });
});



});
