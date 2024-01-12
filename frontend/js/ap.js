var petList = document.getElementById("petList");
var form = document.getElementById("form");
function displayForm() {
    var petElements = document.getElementsByClassName("pet");
    form.classList.toggle('hidden');
    petList.classList.add('hidden');
}
function displayList() {
    form.classList.toggle('hidden');
    petList.classList.remove('hidden');
}

//fetch
document.addEventListener('DOMContentLoaded', async () => {
    const petInfoContainer = document.getElementById('petInfo');
    const petsContainer = document.getElementById('pets-container');
    
    try {
      const response = await fetch('http://localhost:3000/pets');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data && Array.isArray(data)) {
        const petInfoHtml = data.map((pet) => `
          <div class="border border-orange-300 rounded-2xl p-4 mb-4">
            <p><strong>Name:</strong> ${pet.name}</p>
            <p><strong>Breed:</strong> ${pet.breed}</p>
            <p><strong>Type:</strong> ${pet.type}</p>
            <p><strong>Age:</strong> ${pet.age}</p>
            <hr />
            <button onclick="displayForm()"
            class="bg-orange-300 hover:bg-orange-400 text-gray-700 font-bold py-2 px-4 rounded-2xl">
              Adopt
            </button>
          </div>
        `).join('');
  
        if (petsContainer) {
          petsContainer.innerHTML = petInfoHtml;
        }
      } else {
        console.error('Error fetching pet information: Invalid data structure');
      }
    } catch (error) {
      console.error('Error fetching pet information:', error.message);
  
      if (petInfoContainer) {
        petInfoContainer.innerHTML = `<p>Error fetching pet information: ${error.message}</p>`;
      }
    }
  });
  
  function adoptPet(petName) {
    // Implement the logic to adopt the pet with the given name
    alert(`Congratulations! You've adopted a pet!`);
    // You can replace the alert with your actual adoption logic
  }
  