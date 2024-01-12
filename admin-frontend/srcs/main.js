const toggleSidebar = document.getElementById('toggle-sidebar');
const sidebar = document.querySelector('.lg\\:flex');
toggleSidebar.addEventListener('click', () => {
sidebar.classList.toggle('hidden');
});

function toggleAddPetForm() {
  const addPetForm = document.getElementById('addPetForm');
  addPetForm.classList.toggle('hidden');
}
 
async function addAnimal() {
  const ID = document.getElementById("animalID").value;
  const name = document.getElementById('animalName').value;
  const species = document.getElementById('animalSpecies').value;
  const breed = document.getElementById('animalBreed').value;
  const age = document.getElementById('animalAge').value;
  const gender = document.getElementById('animalGender').value;
  const adoptionStatus = document.getElementById('animalAdoptionStatus').value;
  const imageInput = document.getElementById('animalImage');
  
  const imageFile = imageInput.files[0];

  
  const animal = {
    ID,
    name,
    species,
    breed,
    age,
    gender,
    adoptionStatus,
    image: imageFile,
    
  };

  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('ID', animal.ID);
    formData.append('name', animal.name);
    formData.append('species', animal.species);
    formData.append('breed', animal.breed);
    formData.append('age', animal.age);
    formData.append('gender', animal.gender);
    formData.append('adoptionStatus', animal.adoptionStatus);
  
    const response = await fetch('http://localhost:3000/animals', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log('Animal added successfully!');
     
      fetchAnimalsList();
    } else {
      console.error('Failed to add animal:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function fetchAnimalsList() {
  try {
    const response = await fetch('http://localhost:3000/animals'); 
    if (response.ok) {
      const animals = await response.json();
      displayAnimalsList(animals);
    } else {
      console.error('Failed to fetch animals:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}


function displayAnimalsList(animals) {
  const animalsListContainer = document.getElementById('animalsList');

  
  animalsListContainer.innerHTML = '';

  
  const animalsTable = document.createElement('table');
  animalsTable.classList.add('table'); 

  
  const headerRow = animalsTable.createTHead().insertRow(0);
  headerRow.innerHTML = '<th class="p-4 border-b">ID</th><th class="p-4 border-b">Name</th><th class="p-4 border-b">Species</th><th class="p-4 border-b">Breed</th><th class="p-4 border-b">Age</th><th class="p-4 border-b">Gender</th><th class="p-4 border-b">Adoption Status</th><th class="p-4 border-b">Image</th><th class="p-4 border-b">Actions</th><th class="p-4 border-b"></th>';


  const tableBody = animalsTable.createTBody();
  animals.forEach((animal) => {
    const row = tableBody.insertRow();
    row.innerHTML = `<td class="p-4">${animal.ID}</td><td class="p-4">${animal.name}</td><td class="p-4">${animal.species}</td><td class="p-4">${animal.breed}</td><td class="p-4">${animal.age}</td><td class="p-4">${animal.gender}</td><td class="p-4">${animal.adoptionStatus}</td><td class="p-4"><img src="data:image/jpg;base64,${animal.image}" alt="${animal.name}" class="w-16 h-16 object-cover"></td><td class="p-4"><button class="bg-cream text-white px-2 py-1 rounded hover:bg-mocha mr-5" onclick="editAnimal('${animal._id}')">Edit</button></td>
    <td class="p-4"><button  class="bg-delete text-white px-2 py-1 rounded hover:bg-deletehover ml-2" onclick="deleteAnimal('${animal._id}')">Delete</button></td>`;
  });

  animalsListContainer.appendChild(animalsTable);
}


async function deleteAnimal(animalId) {
  
  try {
    const response = await fetch(`http://localhost:3000/animals/${animalId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete animal: ${response.status}`);
  }

  
  fetchAnimalsList()
  console.log('Animal deleted successfully');

  } catch (error) {
    console.error('Error deleting animal:', error);
  }
}

let editingAnimalId = null;

async function editAnimal(animalId) {
  editingAnimalId = animalId;
  
 
  
  try {
    
    const response = await fetch(`http://localhost:3000/animals/${editingAnimalId}`);
    

    
    if (!response.ok) {
      throw new Error(`Failed to fetch animal data: ${response.status}`);
    }

    const animal = await response.json();
  
  
  document.getElementById('editAnimalID').value = animal.ID;
  document.getElementById('editAnimalName').value = animal.name;
  document.getElementById('editAnimalSpecies').value = animal.species;
  document.getElementById('editAnimalBreed').value = animal.breed;
  document.getElementById('editAnimalAge').value = animal.age;
  document.getElementById('editAnimalGender').value = animal.gender;
  document.getElementById('editAnimalAdoptionStatus').value = animal.adoptionStatus;

  document.getElementById('editAnimalForm').classList.remove('hidden');
  } catch (error) {
    console.error('Error fetching animal data:', error);
  }
}

async function updateAnimal() {
  const editedID = document.getElementById('editAnimalID').value;
  const editedName = document.getElementById('editAnimalName').value;
  const editedSpecies = document.getElementById('editAnimalSpecies').value;
  const editedBreed = document.getElementById('editAnimalBreed').value;
  const editedAge = document.getElementById('editAnimalAge').value;
  const editedGender = document.getElementById('editAnimalGender').value;
  const editedAdoptionStatus = document.getElementById('editAnimalAdoptionStatus').value;
  
  

  const updateData = {
    ID: editedID,
    name: editedName,
    species: editedSpecies,
    breed: editedBreed,
    age: editedAge,
    gender: editedGender,
    adoptionStatus: editedAdoptionStatus,
  };

  const imageInput = document.getElementById('editAnimalImage');
  
  const editedImage = imageInput.files.length > 0 ? imageInput.files[0] : null;

  if (editedImage) {
    fileToBuffer(editedImage)
      .then(buffer => {
        updateData.image = buffer;
    
      })
      .catch(error => {
        console.error('Error converting file to buffer:', error);
      });
  }
  
  function fileToBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result;
        const buffer = new Uint8Array(arrayBuffer);
        resolve(buffer);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }
  try {
    
    const formData = new FormData();
    Object.entries(updateData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch(`http://localhost:3000/animals/${editingAnimalId}`, {
      method: 'PUT',
      body: formData,
    });
    if (response.ok) {
      console.log('Animal updated successfully!');
    
      fetchAnimalsList();

      document.getElementById('editAnimalForm').classList.add('hidden');
    } else {
      console.error('Failed to update animal:', response.statusText);
    }
  

  } catch (error) {
    console.error('Error:', error);
  }
}


window.onload = () => {
  
  fetchAnimalsList();
 
};
  