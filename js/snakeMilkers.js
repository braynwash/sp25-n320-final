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

function getSnakeMilkers() {
  console.log("getting table: ", snakeMilkers);
  // clear existing rows
  snakeMilkerTable.innerHTML = "";
  // get snake milkers array from db

  for (let i = 0; i < snakeMilkers.length; i++) {
    let newRow = document.createElement("tr");
    newRow.innerHTML = `<td>${snakeMilkers[i].id}</td><td>${snakeMilkers[i].name}</td><td>${snakeMilkers[i].safetyRating}</td><td>${snakeMilkers[i].hoursCommitted}</td>`;
    snakeMilkerTable.appendChild(newRow);
  }
}

function addSnakeMilker() {
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
  // test
  snakeMilkers.push(snakeMilker);

  console.log("after adding: ", snakeMilkers);

  // reset inputs
  idInput.value = "";
  nameInput.value = "";
  safetyInput.value = "";
  hoursInput.value = "";

  // refresh table
  getSnakeMilkers();
}

function editSnakeMilker() {
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

  // edit snake milker at id with relevant WHERE clauses
  // statement for sql
  const snakeMilkerToEdit = snakeMilkers.find((obj) => obj.id == idToEdit); // testing
  let sqlStatement = "UPDATE topSnakeMilkers SET ";

  if (nameToEdit) {
    sqlStatement += `name = ${nameToEdit},`;
    console.log(snakeMilkerToEdit);
    snakeMilkerToEdit.name = nameToEdit; // testing
  }
  if (safetyToEdit) {
    sqlStatement += `safetyRating = ${safetyToEdit},`;
    snakeMilkerToEdit.safetyRating = safetyToEdit; // testing
  }
  if (hoursToEdit) {
    sqlStatement += `hoursCommitted = ${hoursToEdit},`;
    snakeMilkerToEdit.hoursCommitted = hoursToEdit; // testing
  }

  // where clause
  sqlStatement += `WHERE snakeMilkerId = ${idToEdit}`;

  // testing should be complete at this point.
  console.log("edited snake milker: ", snakeMilkerToEdit);
  console.log("snake milker array after edit: ", snakeMilkers);

  // reset all inputs
  idInput.value = "";
  nameInput.value = "";
  safetyInput.value = "";
  hoursInput.value = "";

  // refresh table
  getSnakeMilkers();
}

function deleteSnakeMilker() {
  if (idInput.value === "") {
    errorText.innerHTML = "Cannot delete snake milker. Id is required.";
    return;
  }

  let dropId = idInput.value;

  // delete snake milker from db with id
  // testing
  snakeMilkers = snakeMilkers.filter((obj) => obj.id != dropId);

  console.log("after delete: ", snakeMilkers);

  // reset input
  idInput.value = "";

  // refresh table
  getSnakeMilkers();
}
getSnakeMilkers();
