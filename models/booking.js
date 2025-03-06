const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Booking = sequelize.define("Booking", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true, // Ensures email format
    },
  },
  meetLink: {
    type: DataTypes.STRING,
    defaultValue: "https://meet.google.com/sample-meet-link",
  },
});

module.exports = Booking;
