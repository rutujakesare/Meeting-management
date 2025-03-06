const { Meeting, Booking } = require("../models");

// Fetch all meetings
exports.getMeetings = async (req, res) => {
    try {
      const meetings = await Meeting.findAll();
      res.json(meetings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  
  

// Book a meeting slot
exports.bookMeeting = (req, res) => {
    const { name, email, meetingId } = req.body;
  
    Meeting.findByPk(meetingId).then(meeting => {
      if (!meeting || meeting.availableCount <= 0) {
        return res.status(400).json({ error: "No slots available!" });
      }
  
      return Booking.create({ name, email, meetingId }).then(booking => {
        return meeting.update({ availableCount: meeting.availableCount - 1 })
          .then(() => res.json({ message: "Meeting booked successfully!", booking }));
      });
    }).catch(error => res.status(500).json({ error: error.message }));
  };
  
  exports.getBookings = (req, res) => {
    Booking.findAll({
      include: [{ model: Meeting, attributes: ["timeSlot"] }],  // Include meeting time
    })
      .then((bookings) => res.json(bookings))
      .catch((error) => res.status(500).json({ error: error.message }));
  };

// Cancel a booking and free up a slot

exports.cancelMeeting = (req, res) => {
    const { bookingId } = req.body;
  
    Booking.findByPk(bookingId).then(booking => {
      if (!booking) {
        return res.status(404).json({ message: "Booking not found!" });
      }
  
      return Meeting.findByPk(booking.meetingId).then(meeting => {
        return meeting.update({ availableCount: meeting.availableCount + 1 })
          .then(() => {
            return booking.destroy().then(() => {
              res.json({ message: "Meeting canceled successfully!" });
            });
          });
      });
    }).catch(error => res.status(500).json({ error: error.message }));
  };
  