const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Genres_Albums = sequelize.define(
  "Genres_Albums",
  {
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    album_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "genres_albums",
    timestamps: false,
  }
);

module.exports = Genres_Albums;
