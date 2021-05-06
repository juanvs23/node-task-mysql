const { Sequelize } = require("sequelize");

const connect = new Sequelize(
  "uptask",
  "root",
  "",
  {
    host: "localhost",
    dialect: "mysql",
  },
  {
    timestamps: false,
  }
);

module.exports = connect;
