// var petList = document.getElementById("petList");
// var form = document.getElementById("form");
// const popupOverlay = document.getElementById('popup-overlay');


// function displayForm(){
//    var pet = document.getElementsByClassName("pet")
//     form.classList.toggle('hidden');
//      petList.classList.add('hidden');

    
// }

// function displayList(){
//     form.classList.toggle('hidden');
//     petList.classList.remove('hidden');
// }

// //fetch

// async function fetchPets() {
//   try {
//       const response = await fetch('http://localhost:3000/api/pets');
//       const pets = await response.json();

//       const petsContainer = document.getElementById('pets-container');

//       // Clear existing content in case this is a subsequent fetch
//       petsContainer.innerHTML = '';

//       if (pets.length === 0) {
//           // Handle case where no pets are available
//           const noPetsMessage = document.createElement('p');
//           noPetsMessage.textContent = 'No pets available.';
//           petsContainer.appendChild(noPetsMessage);
//       } else {
//           pets.forEach(pet => {
//               // Create a card for each pet
//               const card = document.createElement('div');
//               card.className = 'bg-white p-4 rounded-lg shadow-md';

//               // Display pet information in the card
//               const name = document.createElement('h3');
//               name.className = 'text-xl font-semibold mb-2';
//               name.textContent = pet.name;

//               const breed = document.createElement('p');
//               breed.className = 'text-gray-600';
//               breed.textContent = `Breed: ${pet.breed}`;

//               // Append elements to the card
//               card.appendChild(name);
//               card.appendChild(breed);

//               // Append the card to the petsContainer
//               petsContainer.appendChild(card);
//           });
//       }
//   } catch (error) {
//       console.error('Error fetching pets:', error);

//       // Display a user-friendly error message or handle the error appropriately
//       const errorMessage = document.createElement('p');
//       errorMessage.textContent = 'An error occurred while fetching pets.';
//       petsContainer.appendChild(errorMessage);
//   }
// }

// document.addEventListener('DOMContentLoaded', fetchPets);
