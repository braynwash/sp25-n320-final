// dom refs
let snakeMilkerTable = document.querySelector(".snakeMilkers");
let addButton = document.querySelector(".addSnakeMilker");
let editButton = document.querySelector(".editSnakeMilker");
let deleteButton = document.querySelector(".deleteSnakeMilker");
let idInput = document.getElementById("snakeMilkerId");
let nameInput = document.getElementById("snakeMilkerName");
let safetyInput = document.getElementById("snakeMilkerSafety");
let hoursInput = document.getElementById("snakeMilkerHours");
let errorText = document.querySelector(".errorText");

// event listeners
addButton.addEventListener("click", function () {
  addSnakeMilker();
});

editButton.addEventListener("click", function () {
  editSnakeMilker();
});

deleteButton.addEventListener("click", function () {
  deleteSnakeMilker();
});

// TESTING
//test with dummy rows
let snakeMilkers = [
  { id: 0, name: "Cameron Crosby", safetyRating: 9.2, hoursCommitted: 2100 },
  { id: 1, name: "Snake Milker", safetyRating: 8.6, hoursCommitted: 3700 },
];

async function getSnakeMilkers() {
  try {
    // get snake milkers data from db
    const snakeMilkerRes = await fetch("/api/milkers");
    const snakeMilkerJSON = await snakeMilkerRes.json();
    const snakeMilkerData = snakeMilkerJSON.response;
    console.log("snake milker data: ", snakeMilkerData);

    // clear existing rows
    snakeMilkerTable.innerHTML = "";

    // add header rows
    snakeMilkerTable.innerHTML =
      "<tr><th>ID</th><th>Name</th><th>Safety Rating</th><th>Hours Committed</th></tr>";
    // get snake milkers array from db

    for (let i = 0; i < snakeMilkerData.length; i++) {
      let newRow = document.createElement("tr");
      newRow.innerHTML = `<td>${snakeMilkerData[i].snakeMilkerId}</td><td>${snakeMilkerData[i].name}</td><td>${snakeMilkerData[i].safetyRating}</td><td>${snakeMilkerData[i].hoursCommitted}</td>`;
      snakeMilkerTable.appendChild(newRow);
    }
  } catch (error) {
    console.error("Error fetching snake milkers: ", error);
  }
}

async function addSnakeMilker() {
  try {
    if (
      idInput.value === "" ||
      nameInput.value === "" ||
      safetyInput.value === "" ||
      hoursInput.value === ""
    ) {
      errorText.innerHTML =
        "Cannot add Snake Milker, all non-id fields are required.";
      return;
    }

    let snakeMilker = {
      id: idInput.value,
      name: nameInput.value,
      safetyRating: safetyInput.value,
      hoursCommitted: hoursInput.value,
    };

    // create snake milker in db
    const snakeMilkerRes = await fetch(
      `/api/milkers/add?name=${snakeMilker.name}&safetyRating=${snakeMilker.safetyRating}&hoursCommitted=${snakeMilker.hoursCommitted}`
    );

    if (snakeMilkerRes.status == 200) {
      // reset inputs
      idInput.value = "";
      nameInput.value = "";
      safetyInput.value = "";
      hoursInput.value = "";

      // refresh table
      getSnakeMilkers();
    } else {
      const error = await snakeMilkerRes.json();
      errorText.innerHTML = error.error || "Failed to add snake milker";
    }
  } catch (error) {
    console.error("Error adding snake milker: ", error);
  }
}

async function editSnakeMilker() {
  try {
    if (
      idInput.value === "" ||
      (nameInput.value === "" &&
        safetyInput.value === "" &&
        hoursInput.value === "")
    ) {
      errorText.innerHTML =
        "Cannot edit Snake Milker, at least one non-id field is required.";
      return;
    }

    // need to know which non-id field is updating
    let idToEdit = idInput.value;
    let nameToEdit = null;
    let safetyToEdit = null;
    let hoursToEdit = null;

    if (nameInput.value !== "") {
      nameToEdit = nameInput.value;
    }
    if (safetyInput.value !== "") {
      safetyToEdit = safetyInput.value;
    }
    if (hoursInput.value !== "") {
      hoursToEdit = hoursInput.value;
    }

    // api
    const snakeMilkerRes = await fetch(
      `/api/milkers/add?snakeMilkerId=${idToEdit}&name=${nameToEdit}&safetyRating=${safetyToEdit}&hoursCommitted=${hoursToEdit}`
    );
    const snakeMilkerJSON = await snakeMilkerRes.json();
    const snakeMilkerData = snakeMilkerJSON.response;

    // reset all inputs
    idInput.value = "";
    nameInput.value = "";
    safetyInput.value = "";
    hoursInput.value = "";

    // refresh table
    getSnakeMilkers();
  } catch (error) {
    console.error("Error editing snake milker: ", error);
  }
}

async function deleteSnakeMilker() {
  if (idInput.value === "") {
    errorText.innerHTML = "Cannot delete snake milker. Id is required.";
    return;
  }

  let dropId = idInput.value;

  // delete snake milker from db with id
  const snakeMilkerRes = await fetch(`/api/milkers/delete?id=${dropId}`);
  const snakeMilkerJSON = await snakeMilkerRes.json();
  const snakeMilkerData = snakeMilkerJSON.response;

  // reset input
  idInput.value = "";

  // refresh table
  getSnakeMilkers();
}
getSnakeMilkers();
