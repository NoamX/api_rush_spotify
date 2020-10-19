const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Album = require("./albumModel");

const Artist = sequelize.define(
  "Artist",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "artists",
    timestamps: false,
  }
);

Artist.hasMany(Album, { foreignKey: "artist_id" });

module.exports = Artist;
