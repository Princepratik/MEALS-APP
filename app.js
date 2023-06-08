// Retrieve meals from local storage or use a default value
let meals = JSON.parse(localStorage.getItem('meals')) || [];

// DOM elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const mealList = document.getElementById('mealList');
const addMealForm = document.getElementById('addMealForm');

// Display meals on the page
function displayMeals(meals) {
  mealList.innerHTML = '';

  meals.forEach((meal, index) => {
    const card = createMealCard(meal, index);
    mealList.appendChild(card);
  });
}

// Create a meal card element
function createMealCard(meal, index) {
  const card = document.createElement('div');
  card.classList.add('col-md-4', 'mb-4');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card', 'p-3');

  const cardTitle = document.createElement('h5');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = meal.name;

  const cardText = document.createElement('p');
  cardText.classList.add('card-text');
  cardText.textContent = meal.description;

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  card.appendChild(cardBody);

  // Open modal on card click
  card.addEventListener('click', () => openMealModal(index));

  return card;
}

// Open meal modal
function openMealModal(index) {
  const meal = meals[index];

  const mealModalTitle = document.getElementById('mealModalTitle');
  const mealModalDescription = document.getElementById('mealModalDescription');
  const mealModalIngredients = document.getElementById('mealModalIngredients');

  mealModalTitle.textContent = meal.name;
  mealModalDescription.textContent = meal.description;
  mealModalIngredients.innerHTML = '';

  meal.ingredients.forEach((ingredient) => {
    const li = document.createElement('li');
    li.textContent = ingredient;
    mealModalIngredients.appendChild(li);
  });

  $('#mealModal').modal('show');
}

// Search meals
function searchMeals(searchTerm) {
  const filteredMeals = meals.filter((meal) =>
    meal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return filteredMeals;
}

// Handle search button click
searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();
  const filteredMeals = searchMeals(searchTerm);
  displayMeals(filteredMeals);
});

// Handle add meal form submission
addMealForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const mealName = document.getElementById('mealName').value.trim();
  const mealDescription = document.getElementById('mealDescription').value.trim();
  const mealIngredients = document
    .getElementById('mealIngredients')
    .value.trim()
    .split(',')
    .map((ingredient) => ingredient.trim());

  if (mealName && mealDescription && mealIngredients.length) {
    const newMeal = {
      name: mealName,
      description: mealDescription,
      ingredients: mealIngredients,
    };

    meals.push(newMeal);
    displayMeals(meals);
    addMealForm.reset();

    // Store meals in local storage
    localStorage.setItem('meals', JSON.stringify(meals));
  }
});

// Initial display of meals
displayMeals(meals);
