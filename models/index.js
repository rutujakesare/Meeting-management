const sequelize = require("../util/database");
const Meeting = require("./meeting");
const Booking = require("./booking");

// Define relationships
Meeting.hasMany(Booking, { foreignKey: "meetingId", onDelete: "CASCADE" });
Booking.belongsTo(Meeting, { foreignKey: "meetingId" });

// Sync database without force to prevent data loss

sequelize.sync({ force: false }).then(async () => {
    console.log("Database synced");
  
    const count = await Meeting.count();
    if (count === 0) {
      await Meeting.bulkCreate([
        { timeSlot: "10:00 AM", availableCount: 5 },
        { timeSlot: "12:00 PM", availableCount: 3 },
        { timeSlot: "2:00 PM", availableCount: 4 },
        { timeSlot: "4:00 PM", availableCount: 2 },
      ]);
      console.log("Sample meetings added!");
    }
  });
  
module.exports = { Meeting, Booking };