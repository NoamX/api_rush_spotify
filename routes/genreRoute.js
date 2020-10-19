const express = require("express");
const router = express.Router();
const { findAll, findById, search } = require("../controllers/genreController");

router.get("/genres", (req, res) => {
  findAll(req, res);
});

router.get("/genre/:id", (req, res) => {
  const { id } = req.params;

  findById(req, res, id);
});

router.get("/genres/search/:query", (req, res) => {
  search(req, res);
});

module.exports = router;
