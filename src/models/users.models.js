const { DataType } = require("sequelize");

const { db } = require("../utils/database");

const Users = db.define("movies", {
  id: {
    primaryKey: true,
    type: DataType.UUID,
    allowNull: false,
  },
});
