const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("meeting_db", "root", "rutuja@38", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Disable logging for cleaner output
});

module.exports = sequelize;
