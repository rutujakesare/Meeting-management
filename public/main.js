document.addEventListener("DOMContentLoaded", () => {
    fetchMeetings();
    fetchBookings();
});

function bookMeeting(meetingId) {
    const name = prompt("Enter your name:");
    const email = prompt("Enter your email:");

    if (!name || !email) {
        alert("Please enter both name and email.");
        return;
    }

    fetch("http://localhost:5000/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, meetingId })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            alert(data.error); // Show error if no slots available
        } else {
            alert("Meeting booked successfully!");
            fetchMeetings(); // Refresh meetings
            fetchBookings(); // Refresh booked meetings
        }
    })
    .catch(error => console.error("Error:", error));
}


function cancelBooking(bookingId) {
    fetch("http://localhost:5000/api/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        fetchMeetings(); // Refresh meetings
        fetchBookings(); // Refresh booked meetings
    })
    .catch(error => console.error("Error:", error));
}

function fetchMeetings() {
    fetch("http://localhost:5000/api/meetings")
        .then(res => res.json())
        .then(data => {
            const meetingsDiv = document.getElementById("meetings");
            meetingsDiv.innerHTML = data.map(meeting => `
                <div class="meeting-box">
                    <p><strong>Time:</strong> ${meeting.timeSlot}</p>
                    <p><strong>Slots Available:</strong> ${meeting.availableCount}</p>
                    <button class="book-btn" onclick="bookMeeting(${meeting.id})">Book</button>
                </div>
            `).join("");
        })
        .catch(error => console.error("Error fetching meetings:", error));
}



function fetchBookings() {
    fetch("http://localhost:5000/api/bookings")
        .then(res => res.json())
        .then(data => {
            const bookingsDiv = document.getElementById("bookings");
            bookingsDiv.innerHTML = "";  // ✅ Clear previous data

            if (data.length === 0) {
                bookingsDiv.innerHTML = "<p>No meetings booked yet.</p>";
                return;
            }

            bookingsDiv.innerHTML = data.map(booking => `
                <div class="booking">
                    <p><strong>Hi ${booking.name},</strong> please join the meeting via  
                    <a href="${booking.meetLink}" target="_blank">[Join Meeting]</a> at <strong>${booking.Meeting?.timeSlot || "Unknown Time"}</strong>.</p>
                    <button onclick="cancelBooking(${booking.id})">[Cancel]</button>
                </div>
            `).join("");
        })
        .catch(error => console.error("Error fetching bookings:", error));
}

