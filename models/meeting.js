const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Meeting = sequelize.define("Meeting", {
  timeSlot: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  availableCount: {
    type: DataTypes.INTEGER,
    defaultValue: 10,
    validate: {
      min: 0, // Ensure availableCount is never negative
    },
  },
});

module.exports = Meeting;
