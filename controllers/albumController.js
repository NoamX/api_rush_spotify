const { Op } = require("sequelize");
const sequelize = require("../config/database");
const Album = require("../models/albumModel");
const Genre = require("../models/genreModel");
const Track = require("../models/trackModel");
const formatResponse = require("../utils/formatResponse");
const pagination = require("../utils/pagination");

const findAll = async (req, res) => {
  const { page } = req.query;

  const data = await pagination(
    page,
    Album,
    "http://localhost:9000/api/albums",
    100
  );

  if (data.result.length === 0) {
    formatResponse(res, 400, { error: "No albums found." });
  } else {
    formatResponse(res, 200, data);
  }
};

const findById = async (req, res, id) => {
  const album = await Album.findOne({
    where: { id: id },
    include: [
      Track,
      {
        model: Genre,
        through: {
          attributes: [],
        },
      },
    ],
  });

  if (!album) {
    formatResponse(res, 400, { error: "No album found." });
  } else {
    formatResponse(res, 200, album);
  }
};

const findRandom = async (req, res) => {
  const albums = await Album.findAll({ order: sequelize.random(), limit: 100 });

  formatResponse(res, 200, albums);
};

const search = async (req, res) => {
  const { page } = req.query;
  const { query } = req.params;

  const data = await pagination(
    page,
    Album,
    `http://localhost:9000/api/albums/search/${query}`,
    100,
    {
      where: {
        name: {
          [Op.like]: `%${query}%`,
        },
      },
    }
  );

  if (data.result.length === 0) {
    formatResponse(res, 400, {
      error: `No result for '${query}'.`,
    });
  } else {
    formatResponse(res, 200, data);
  }
};

module.exports = {
  findAll,
  findById,
  findRandom,
  search,
};
