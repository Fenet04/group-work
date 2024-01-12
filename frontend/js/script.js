/* eslint-disable prettier/prettier */
document.getElementById('signup').addEventListener('submit', async () => {
  

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value; 
  const address  = document.getElementById('address').value;
  const phone= document.getElementById('phone').value; 
  const password = document.getElementById('password').value;
  

  const petData = { name, email, address, phone, password};



try {
  const response = await fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(petData),
  });

  if (response.ok) {
    //const createdPet = await response.json();

    // Update the UI with the newly added pet
    // const petsList = document.getElementById('petsList');
    // const petItem = document.createElement('li');
    // petItem.textContent = `${createdPet.name}`;
    // petsList.appendChild(petItem);

    // Clear the form fields
    // document.getElementById('nameInput').value = '';
    // document.getElementById('ageInput').value = '';
  } else {
    console.error('Failed to add pet:', response.status);
  }
} catch (error) {
  console.error('Error adding pet:', error);
};
});








const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  const response = await fetch('http://localhost:3000/login.html', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const data = await response.json();
    // Store the access token in local storage or a cookie for future authentication
    localStorage.setItem('token', data.token);
    // Redirect the user to the desired page
   
    window.location.href = '/Home.html';
  } else {
    // Handle login error
    console.error('Login failed');
  }
});

function auth(){
  var email=document.getElementById("email").value;
  var password = document.getElementById("password").value;
  if(email=="addishiwot963@gmail.com" && password=="123456789"){
    window.location.assign("Home.html")
    alert('Login successfully');
  }else{
    alert('Invalid Information');
    return;
  }
}