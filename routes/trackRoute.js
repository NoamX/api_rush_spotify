const express = require("express");
const router = express.Router();
const { findById, search } = require("../controllers/trackController");

router.get("/track/:id", (req, res) => {
  const { id } = req.params;
  findById(req, res, id);
});

router.get("/tracks/search/:query", (req, res) => {
  search(req, res);
});

module.exports = router;
