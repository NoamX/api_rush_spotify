const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Track = require("./trackModel");

const Album = sequelize.define(
  "Album",
  {
    artist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cover_small: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    release_date: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    popularity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "albums",
    timestamps: false,
  }
);

Album.hasMany(Track, { foreignKey: "album_id" });
Track.belongsTo(Album, { foreignKey: "id" });

module.exports = Album;
