const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 5000;
app.use(express.json());

const movies = [
  { id: 0, name: "Pulp function", isFav: false, isDeleted: false },
  { id: 1, name: "Se7en", isFav: false, isDeleted: true },
  { id: 2, name: "God father", isFav: false, isDeleted: true },
  { id: 3, name: "GoodFellas", isFav: false, isDeleted: false },

];

// get all movies
app.get("/get", (req, res) => {
  res.status(200);
  res.json(movies);
});

// get movie by id
app.get("/get/:id", (req, res) => {
  const { id } = req.params;
  res.status(200).json(movies[id]);
});

//creat new movie
app.post("/creat", (req, res) => {
  const { id, name, isFav, isDeleted } = req.body;
  movies.push({ id: movies.length, name, isFav: false, isDeleted: false });
  res.status(200).json({ id, name, isFav, isDeleted });
});

// update movie by id
app.put("/update/:id", (req, res) => {
  const { id, name, isFav, isDeleted } = req.body;
  movies.splice(id, 1, { id, name, isFav, isDeleted });
  res.status(200).json({ id, name, isFav, isDeleted });
});

// egt all fav movie
app.get("/favoriteMovie", (req, res) => {
  let newArr = [];
  newArr = movies.filter((item) => item.isDeleted === false);
  res.status(200).json(newArr);
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
