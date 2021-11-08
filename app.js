const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 5000;
app.use(express.json());

const movies = [
  { id: 0, name: "Pulp function", isFav: false, isDeleted: false },
  { id: 1, name: "Se7en", isFav: false, isDeleted: true },
  { id: 2, name: "God father", isFav: true, isDeleted: true },
  { id: 3, name: "GoodFellas", isFav: false, isDeleted: false },
  { id: 4, name: "Fight club", isFav: true, isDeleted: false },
  { id: 5, name: "Forrest gump", isFav: false, isDeleted: true },
  { id: 6, name: "Reservior dogs", isFav: false, isDeleted: false },
  { id: 7, name: "Casino", isFav: true, isDeleted: false },
  { id: 8, name: "Jhon wick 2", isFav: false, isDeleted: true },
];

// add to file
function addToFile(movies) {
  fs.writeFile("./read.json", JSON.stringify(movies), () => {
    console.log("added");
  });
}

// 
app.post("/addMovie", (req, res) => {
  fs.readFile("./read.json", (err, data) => {
    let newMovie = JSON.parse(data.toString());

    newMovie.push({
      id: movies.length,
      name: "Jhon wick 4,",
      isFav: true,
      isDeleted: false,
    });
    addToFile(newMovie);
    res.status(200).json(newMovie);
  });
});

// Get all movies

app.get("/get", (req, res) => {
  res.status(200);
  res.json(movies);
});

// get movie by id
app.get("/get/:id", (req, res) => {
  const { id } = req.params;
  res.status(200).json(movies[id]);
});

//Creat new movie
app.post("/creat", (req, res) => {
  const { id, name, isFav, isDeleted } = req.body;
  movies.push({ id: movies.length, name, isFav: false, isDeleted: false });
  res.status(200).json({ id, name, isFav, isDeleted });
});

// Update movie by id
app.put("/update/:id", (req, res) => {
  const { id, name, isFav, isDeleted } = req.body;
  movies.splice(id, 1, { id, name, isFav, isDeleted });
  res.status(200).json({ id, name, isFav, isDeleted });
});

// Toggle fav true/false by id
app.put("/updaeFav/:id", (req, res) => {
  const { id, name, isFav, isDeleted } = req.params;

  if (movies[id].isDeleted == false) {
    movies.splice(id, 1, {
      id: movies[id].id,
      name: movies[id].name,
      isFav: movies[id].isFav,
      isDeleted: true,
    });
  } else if (movies[id].isDeleted == true) {
    movies.splice(id, 1, {
      id: movies[id].id,
      name: movies[id].name,
      isFav: movies[id].isFav,
      isDeleted: false,
    });
  }
  res.status(200).json({ id, name, isFav, isDeleted });
});

// Show all not deleted movies
app.get("/movies", (req, res) => {
  let newArr = movies.filter((item) => item.isDeleted === false);
  console.log(newArr);
  res.status(200).json(newArr);
});

// Get all fav movies
app.get("/favoriteMovie", (req, res) => {
  let newArr = [];
  newArr = movies.filter((item) => item.isDeleted === false);
  res.status(200).json(newArr);
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
