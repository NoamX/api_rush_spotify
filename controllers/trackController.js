const { Op } = require("sequelize");
const Track = require("../models/trackModel");
const formatResponse = require("../utils/formatResponse");
const pagination = require("../utils/pagination");
const Album = require("../models/albumModel");

const findById = async (req, res, id) => {
  const track = await Track.findOne({
    where: { id: id },
    include: {
      model: Album,
      attributes: ["cover_small"],
    },
  });

  if (!track) {
    formatResponse(res, 400, { error: "No track found." });
  } else {
    formatResponse(res, 200, track);
  }
};

const search = async (req, res) => {
  const { page } = req.query;
  const { query } = req.params;

  const data = await pagination(
    page,
    Track,
    `http://localhost:9000/api/tracks/search/${query}`,
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
  findById,
  search,
};
