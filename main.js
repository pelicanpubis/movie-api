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

//Event listeners
addMovieBtn.addEventListener("click", addMovie);

//functions

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
  }).then((res) => {
    if (res.ok) {
      getMovies();
    } else {
      console.warn("Something is wrong with the API!");
    }
  });
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
      <p><strong>Genre:</strong> ${m.genre}</p>
      <p><strong>Production Year:</strong> ${m.productionYear}</p>
      <p><strong>Box Office:</strong> ${m.boxOffice}</p>
      <p><strong>Synopsis:</strong> ${m.synopsis}</p>
    `;

    container.appendChild(movieCard);
  });
}
