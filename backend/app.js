"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_controller_1 = require("./controller/api.controller");
const app = (0, express_1.default)();
//Middleware
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
//Route Handlers:
//Users
app.get('/api/users', (req, res) => (0, api_controller_1.getAllUsers)(req, res));
// app.get('/api/users/:id', getUserById);
// app.post('/api/users', createUser);
// app.put('/api/users/:id', updateUser);
// app.delete('/api/users/:id', deleteUser);
//Events
// app.get('/api/events', getAllEvents);
// app.get('/api/events/:id', getEventById);
// app.post('/api/events', createEvent);
// app.put('/api/events/:id', updateEvent);
// app.delete('/api/events/:id', deleteEvent);
// app.get('/api/events/category:type', getEventsByCategory);
// app.get('/api/events/region:region', getEventsByRegion);
// app.get('/api/events/free', getFreeEvents);
// app.get('/api/events/paid', getPaidEvents);
// app.get('/api/events/:id/attendees', getEventAttendees);
//Attendance
// app.get('/api/attendances', getAllAttendances);
// app.get('/api/attendances/:id', getAttendanceById);
// app.post('/api/attendances', createAttendance);
// app.put('/api/attendances/:id', updateAttendance);
// app.delete('/api/attendances/:id', deleteAttendance);
exports.default = app;
