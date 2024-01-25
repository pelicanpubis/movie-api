getMovies();

// Selectors

let container = document.querySelector("#container");
let idInput = document.querySelector("#id-input");
let titleInput = document.querySelector("#title-input");
let genreInput = document.querySelector("#genre-input");
let productionYearInput = document.querySelector("#production-year-input");
let boxOfficeInput = document.querySelector("#box-office-input");
let synopsisInput = document.querySelector("#synopsis-input");
let addMovieBtn = document.querySelector("#add-movie-btn");
let deleteMovieBtn = document.querySelector("#delete-movie-btn");
let editMovieBtn = document.querySelector("#edit-movie-btn");

//Event listeners
addMovieBtn.addEventListener("click", addMovie);
deleteMovieBtn.addEventListener("click", deleteMovie);
editMovieBtn.addEventListener("click", editMovie);

//functions
// Funktion för att hantera redigering av film
function editMovie() {
  // Hämta användarens input från input-fälten
  let movieIdToEdit = Number(idInput.value);
  let newMovieData = {
    title: titleInput.value,
    productionYear: Number(productionYearInput.value),
    genre: genreInput.value,
    boxOffice: boxOfficeInput.value,
    synopsis: synopsisInput.value,
  };

  // Skicka en GET-förfrågan för att hämta den befintliga filmen baserat på ID
  fetch(`https://localhost:7096/Movie/${movieIdToEdit}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Movie not found");
      }
      return res.json();
    })
    .then((existingMovie) => {
      // Kombinera befintliga uppgifter med användarens nya uppgifter
      let updatedMovie = { ...existingMovie, ...newMovieData };

      // Skicka en PUT-förfrågan för att uppdatera filmen
      return fetch(`https://localhost:7096/Movie/${movieIdToEdit}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMovie),
      });
    })
    .then((res) => getMovies());
}

function deleteMovie() {
  //hämtar användarens input från id input-fältet
  let movieIdToDelete = Number(idInput.value);

  // skicka en delete förfrågan till api:et
  fetch(`https://localhost:7096/Movie/${movieIdToDelete}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movieIdToDelete),
  }).then((res) => getMovies());
}

function addMovie() {
  let newMovie = {
    id: Number(idInput.value),
    title: titleInput.value,
    productionYear: Number(productionYearInput.value),
    genre: genreInput.value,
    boxOffice: boxOfficeInput.value,
    synopsis: synopsisInput.value,
  };

  fetch("https://localhost:7096/Movie", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMovie),
  }).then((res) => getMovies());
}

//Get all movies
function getMovies() {
  fetch("https://localhost:7096/Movie")
    .then((res) => res.json())
    .then((data) => displayMovies(data));
}

function displayMovies(movies) {
  container.innerHTML = "";

  movies.forEach((m) => {
    let movieCard = document.createElement("div");
    movieCard.className = "movie-card";

    movieCard.innerHTML = `

      <h2>${m.title}</h2>
            <p><strong>Id:</strong> ${m.id}</p>

      <p><strong>Genre:</strong> ${m.genre}</p>
      <p><strong>Production Year:</strong> ${m.productionYear}</p>
      <p><strong>Box Office:</strong> ${m.boxOffice}</p>
      <p><strong>Synopsis:</strong> ${m.synopsis}</p>
    `;

    container.appendChild(movieCard);
  });
}
