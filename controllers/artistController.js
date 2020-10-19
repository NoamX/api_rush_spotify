const { Op } = require("sequelize");
const Artist = require("../models/artistModel");
const Album = require("../models/albumModel");
const formatResponse = require("../utils/formatResponse");
const pagination = require("../utils/pagination");

const findAll = async (req, res) => {
  const { page } = req.query;

  const data = await pagination(
    page,
    Artist,
    "http://localhost:9000/api/artists",
    100
  );

  if (data.result.length === 0) {
    formatResponse(res, 400, { error: "No artists found." });
  } else {
    formatResponse(res, 200, data);
  }
};

const findById = async (req, res, id) => {
  const artist = await Artist.findOne({ where: { id: id }, include: Album });

  if (!artist) {
    formatResponse(res, 400, { error: "No artist found." });
  } else {
    formatResponse(res, 200, artist);
  }
};

const search = async (req, res) => {
  const { page } = req.query;
  const { query } = req.params;

  const data = await pagination(
    page,
    Artist,
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
  search,
};
