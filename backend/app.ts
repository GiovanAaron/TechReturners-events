
const express = require('express');
const app = express();

const { getAllUsers } = require("./controller/api.controller");


//Middleware
app.use(express.static('public'));
app.use(express.json());


//Route Handlers:
//Users
app.get("/api/users", getAllUsers);
// app.get("api/users/:id", getUserById);
// app.post("/api/users", createUser);
// app.put("/api/users/:id", updateUser);
// app.delete("/api/users/:id", deleteUser);


//Events
// app.get("/api/events", getAllEvents);
// app.get("api/events/:id", getEventById);
// app.post("/api/events", createEvent);
// app.put("/api/events/:id", updateEvent);
// app.delete("/api/events/:id", deleteEvent);

// app.get("api/events/category:type", getEventsByCategory);
// app.get("api/events/region:region", getEventsByRegion);
// app.get("api/events/free", getFreeEvents);
// app.get("api/events/paid", getPaidEvents);
// app.get("api/events/:id/attendees", getEventAttendees);


//Attendance
// app.get("/api/attendances", getAllAttendances);
// app.get("/api/attendances/:id", getAttendanceById);
// app.post("/api/attendances", createAttendance);
// app.put("/api/attendances/:id", updateAttendance);
// app.delete("/api/attendances/:id", deleteAttendance);


//Alterations



//Server errors

