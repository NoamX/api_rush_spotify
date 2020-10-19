const express = require("express");
const router = express.Router();

const {
  findAll,
  findById,
  search,
} = require("../controllers/artistController");

router.get("/artists", (req, res) => {
  findAll(req, res);
});

router.get("/artist/:id", (req, res) => {
  const { id } = req.params;
  findById(req, res, id);
});

router.get("/artists/search/:query", (req, res) => {
  search(req, res);
});

module.exports = router;
