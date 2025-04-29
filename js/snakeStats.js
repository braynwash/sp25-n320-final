const snakes = [
    { id: 1, name: "King Cobra", image: "kingCobra.png", species: "Ophiophagus hannah", venom: "Neurotoxic", danger: "High", editable: false },
    { id: 2, name: "Eastern Diamondback Rattlesnake", image: "easternDiamondback.png", species: "Crotalus adamanteus", venom: "Hemotoxic", danger: "High", editable: false },
    // User-added snakes example
   // { id: 3, name: "User's Snake", species: "Unknownus snakus", venom: "Unknown", danger: "Medium", editable: true }
  ];

  const container = document.getElementById("snakeContainer");

function renderSnakes() {
  container.innerHTML = "";

  snakes.forEach((snake) => {
    const card = document.createElement("div");
    card.className = "snake-card";
    
    card.innerHTML = `
      <h2>${snake.name}</h3>
      <img class="snakeImg" src="../../assets/img/snakeImg/${snake.image}" alt="${snake.name}">
      <p><strong>Species:</strong> ${snake.species}</p>
      <p><strong>Venom:</strong> ${snake.venom}</p>
      <p><strong>Danger:</strong> ${snake.danger}</p>
    `;

    if (snake.editable) {
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.onclick = () => editSnake(snake.id);

      const deleteButton = document.createElement("button");
      deleteButton.className = "delete";
      deleteButton.textContent = "Delete";
      deleteButton.onclick = () => deleteSnake(snake.id);

      card.appendChild(editButton);
      card.appendChild(deleteButton);
    }

    container.appendChild(card);
  });
}

function editSnake(id) {
  alert("Edit functionality for snake ID: " + id);
}

function deleteSnake(id) {
  const index = snakes.findIndex(snake => snake.id === id);
  if (index !== -1) {
    snakes.splice(index, 1);
    renderSnakes();
  }
}

document.addEventListener("DOMContentLoaded", function() {
    renderSnakes();
});

const modal = document.getElementById("snakeModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeBtn = document.querySelector(".close");
const snakeForm = document.getElementById("snakeForm");

openModalBtn.onclick = function() {
  modal.style.display = "block";
}

closeBtn.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Form Submit
snakeForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent page reload
  
  const name = document.getElementById("name").value.trim();
  const species = document.getElementById("species").value.trim();
  const venom = document.getElementById("venom").value.trim();
  const danger = document.getElementById("danger").value.trim();
  
  const newSnake = {
    id: Date.now(), // quick unique ID
    name: name,
    species: species,
    venom: venom,
    danger: danger,
    editable: true
  };

  snakes.push(newSnake); // Add to array
  renderSnakes(); // Re-render snake cards
  modal.style.display = "none"; // Close modal
  snakeForm.reset(); // Clear the form
});

