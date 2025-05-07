let currentEditId = null;
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
        editButton.onclick = () => openEditModal(snake);

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

// function editSnake(id) {
//   const snake = snakes.find((s) => s.id === id);
//   if (!snake) return;

//   currentEditId = id;

//   document.getElementById("name").value = snake.name;
//   document.getElementById("species").value = snake.species;
//   document.getElementById("venom").value = snake.venom;
//   document.getElementById("danger").value = snake.danger;

//   modal.style.display = "block";
// }

// function deleteSnake(id) {
//   const index = snakes.findIndex((snake) => snake.id === id);
//   if (index !== -1) {
//     snakes.splice(index, 1);
//     renderSnakes();
//   }
// }

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
snakeForm.addEventListener("submit", async function (event) {
  event.preventDefault(); 

  const snakeData = {
    name: document.getElementById('name').value,
    binomialName: document.getElementById('binomialName').value,
    venomType: document.getElementById('venomType').value,
    danger: document.getElementById('danger').value,
    rating: parseInt(document.getElementById('rating').value),
    image: "defaultSnake.png", 
    editable: true,
  };


  if (currentEditId !== null) {
    await editSnake(currentEditId, snakeData);
    currentEditId = null;  
  } else {
    await addNewSnake(snakeData);
  }

  renderSnakes();
  modal.style.display = "none";
  snakeForm.reset();
});

async function addNewSnake(snakeData) {
  try {
    const response = await fetch('/api/statistics/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(snakeData)
    });

    const result = await response.json();
    // console.log(result);  
  } catch (error) {
    console.error('Error adding snake:', error);
  }
}

async function editSnake(snakeId, snakeData) {
  try {
    const response = await fetch(`/api/statistics/${snakeId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(snakeData)
    });

    const result = await response.json();
    // console.log(result);
  } catch (error) {
    console.error("Error editing snake:", error);
  }
}

function deleteSnake(snakeId) {
  if (confirm("Are you sure you want to delete this snake?")) {
    fetch(`/api/statistics/delete?id=${snakeId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        renderSnakes();
      })
      .catch(error => console.error('Error deleting snake:', error));
  }
}

document.getElementById("editBtn").addEventListener("click", function (event) {});
