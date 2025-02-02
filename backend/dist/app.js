"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_controller_index_1 = require("./controller/api.controller.index");
const authMiddleware_1 = require("./middleware/authMiddleware");
const app = (0, express_1.default)();
//Middleware
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
//Route Handlers:
//Users
app.get("/api/users", (0, authMiddleware_1.authenticateAndAuthorize)(['Admin']), api_controller_index_1.getAllUsers);
app.get("/api/users/:id", (0, authMiddleware_1.authenticateAndAuthorize)(['Admin', 'Moderator', 'User'], true), api_controller_index_1.getUserById); //self and admin
app.post("/api/users", api_controller_index_1.postUser);
app.patch("/api/users/:id", (0, authMiddleware_1.authenticateAndAuthorize)(['User', 'Admin'], true), api_controller_index_1.patchUser); //self and admin
app.delete("/api/users/:id", (0, authMiddleware_1.authenticateAndAuthorize)(['User', 'Admin'], true), api_controller_index_1.deleteUser); //self and admin
app.post("/api/users/login", api_controller_index_1.loginUser);
//Events
app.get("/api/events", api_controller_index_1.getAllEvents);
app.get("/api/events/:id", api_controller_index_1.getEventById);
app.post("/api/events", (0, authMiddleware_1.authenticateAndAuthorize)(['Admin', 'Moderator']), api_controller_index_1.postEvent); //admin and mod
app.patch('/api/events/:id', (0, authMiddleware_1.authenticateAndAuthorize)(['Admin', 'Moderator']), api_controller_index_1.patchEvent); //admin and mod
app.delete('/api/events/:id', (0, authMiddleware_1.authenticateAndAuthorize)(['Admin', 'Moderator']), api_controller_index_1.deleteEvent); //admin and mod
// app.get('/api/events/category:type', getEventsByCategory);
// app.get('/api/events/region:region', getEventsByRegion);
// app.get('/api/events/free', getFreeEvents);
// app.get('/api/events/paid', getPaidEvents);
// app.get('/api/events/:id/attendees', getEventAttendees);
//Attendance
app.get('/api/events/:id/attendances', (0, authMiddleware_1.authenticateAndAuthorize)(['Admin']), api_controller_index_1.getAttendanceByEventId); //admin
// app.get('/api/attendances', getAllAttendances);
// app.get('/api/attendances/:id', getAttendanceById);
app.post('/api/events/:id/attendances', (0, authMiddleware_1.authenticateAndAuthorize)(['Admin', 'Moderator', 'User']), api_controller_index_1.postAttendanceByEventId); //admin, user, mod
app.patch('/api/events/:id/attendances', (0, authMiddleware_1.authenticateAndAuthorize)(['Admin', 'Moderator', 'User'], true), api_controller_index_1.patchAttendanceByEventId); //admin, self
app.delete('/api/events/:id/attendances/', (0, authMiddleware_1.authenticateAndAuthorize)(['Admin', 'User'], true), api_controller_index_1.deleteAttendanceByEventId); //admin, self
app.get('/api/users/:id/attendances', (0, authMiddleware_1.authenticateAndAuthorize)(['Admin', 'Moderator', 'User']), api_controller_index_1.getAttendanceByUserId); //  admin, user, mod
app.use((err, req, res, next) => {
    if (err.msg) {
        return res.status(err.status).send({ error: err.msg });
    }
    else {
        next(err);
    }
});
//server errors
// app.use((err:any, req:any, res:any, next:any) => {
//   console.log(err, "<<------ from our 500");
//   return res.status(500).send({ msg: "Internal Server Error" });
// });
exports.default = app;
