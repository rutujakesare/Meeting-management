const express = require("express");
const { getMeetings, bookMeeting, cancelMeeting, getBookings } = require("../controllers/meetingController"); // ✅ Added getBookings

const router = express.Router();

router.get("/meetings", getMeetings);
router.post("/book", bookMeeting);
router.post("/cancel", cancelMeeting);
router.get("/bookings", getBookings); // ✅ Added route for fetching bookings

module.exports = router;
