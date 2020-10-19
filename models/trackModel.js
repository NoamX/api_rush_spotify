const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Track = sequelize.define(
  "Track",
  {
    album_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    track_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mp3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "tracks",
    timestamps: false,
  }
);

module.exports = Track;
