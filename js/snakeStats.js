let currentEditId = null;
// const snakes = [
//   {
//     id: 1,
//     name: "King Cobra",
//     image: "kingCobra.png",
//     species: "Ophiophagus hannah",
//     venom: "Neurotoxic",
//     danger: "High",
//     editable: false,
//   },
//   {
//     id: 2,
//     name: "Eastern Diamondback Rattlesnake",
//     image: "easternDiamondback.png",
//     species: "Crotalus adamanteus",
//     venom: "Hemotoxic",
//     danger: "High",
//     editable: false,
//   },
// ];

const container = document.getElementById("snakeContainer");

async function getAllSnakeStatistics() {
  try {
    const response = await fetch('/api/statistics');
    const snakes = await response.json();
    return snakes;
  } catch (error) {
    console.error("Error fetching snakes:", error);
  }
}

async function renderSnakes() {
  try {
    const snakes = await getAllSnakeStatistics();
    const snakeArray = snakes.response || [];
    console.log(snakeArray);

    const container = document.getElementById("snakeContainer");
    container.innerHTML = "";

    snakeArray.forEach(snake => {
      const card = document.createElement("div");
      card.className = "snake-card";

      card.innerHTML = `
        <h3>${snake.name}</h3>
        <img class="snakeImg" src="/assets/img/snakeImg/${snake.image}" alt="${snake.name}">
        <p><strong>Species:</strong> ${snake.binomialName}</p>
        <p><strong>Venom:</strong> ${snake.venomType}</p>
        <p><strong>Danger Level:</strong> ${snake.danger}</p>
        <p><strong>Rating:</strong> ${snake.rating}/5</p>  
      `;

      if (snake.editable) {
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = () => editSnake(snake.snakeId);

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete";
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteSnake(snake.snakeId);

        card.appendChild(editButton);
        card.appendChild(deleteButton);
      }
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error rendering snakes:", error);
  }
}

function editSnake(id) {
  const snake = snakes.find((s) => s.id === id);
  if (!snake) return;

  currentEditId = id;

  document.getElementById("name").value = snake.name;
  document.getElementById("species").value = snake.species;
  document.getElementById("venom").value = snake.venom;
  document.getElementById("danger").value = snake.danger;

  modal.style.display = "block";
}

function deleteSnake(id) {
  const index = snakes.findIndex((snake) => snake.id === id);
  if (index !== -1) {
    snakes.splice(index, 1);
    renderSnakes();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  renderSnakes();
});

const modal = document.getElementById("snakeModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeBtn = document.querySelector(".close");
const snakeForm = document.getElementById("snakeForm");

openModalBtn.onclick = function () {
  modal.style.display = "block";
};

closeBtn.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Form Submit
snakeForm.addEventListener("submit", function (event) {
  event.preventDefault(); 

  const name = document.getElementById("name").value.trim();
  const species = document.getElementById("species").value.trim();
  const venom = document.getElementById("venom").value.trim();
  const danger = document.getElementById("danger").value.trim();

  if (currentEditId !== null) {
    const snake = snakes.find((s) => s.id === currentEditId);
    if (snake) {
      snake.name = name;
      snake.species = species;
      snake.venom = venom;
      snake.danger = danger;
    }
    currentEditId = null; // Reset
  } else {
    const newSnake = {
      id: Date.now(), // quick unique ID
      name: name,
      species: species,
      venom: venom,
      danger: danger,
      editable: true,
      image: "defaultSnake.png", // Placeholder image
    };

    snakes.push(newSnake);
  }
  renderSnakes();
  modal.style.display = "none";
  snakeForm.reset();
});

document.getElementById("editBtn").addEventListener("click", function (event) {});
