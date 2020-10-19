const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Album = require("./albumModel");
const Genres_Albums = require("./pivot/Genres_Albums");

const Genre = sequelize.define(
  "Genre",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "genres",
    timestamps: false,
  }
);

Genre.belongsToMany(Album, { through: Genres_Albums, foreignKey: "genre_id" });
Album.belongsToMany(Genre, { through: Genres_Albums, foreignKey: "album_id" });

module.exports = Genre;
