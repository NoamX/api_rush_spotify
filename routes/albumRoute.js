const express = require("express");
const router = express.Router();

const {
  findAll,
  findById,
  findRandom,
  search,
} = require("../controllers/albumController");

router.get("/albums", (req, res) => {
  findAll(req, res);
});

router.get("/album/:id", (req, res) => {
  const { id } = req.params;
  findById(req, res, id);
});

router.get("/albums/random", (req, res) => {
  findRandom(req, res);
});

router.get("/albums/search/:query", (req, res) => {
  search(req, res);
});

module.exports = router;
