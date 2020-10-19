const { Op } = require("sequelize");
const Album = require("../models/albumModel");
const Genre = require("../models/genreModel");
const formatResponse = require("../utils/formatResponse");

const findAll = async (req, res) => {
  const genres = await Genre.findAll();

  formatResponse(res, 200, genres);
};

const findById = async (req, res, id) => {
  const genre = await Genre.findOne({
    where: { id: id },
    include: {
      model: Album,
      through: {
        attributes: [],
      },
    },
  });

  if (!genre) {
    formatResponse(res, 400, { error: "No genre found." });
  } else {
    formatResponse(res, 200, genre);
  }
};

const search = async (req, res) => {
  const { query } = req.params;

  const genres = await Genre.findAll({
    where: {
      name: {
        [Op.like]: `%${query}%`,
      },
    },
  });

  if (genres.length === 0) {
    formatResponse(res, 400, {
      error: `No result for '${query}'.`,
    });
  } else {
    formatResponse(res, 200, genres);
  }
};

module.exports = {
  findAll,
  findById,
  search,
};
