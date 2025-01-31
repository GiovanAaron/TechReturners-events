import express, { Request, Response } from "express";

import {
  getAllUsers, getUserById, postUser, patchUser, deleteUser,
  loginUser,
  getAllEvents, getEventById, postEvent, patchEvent, deleteEvent, 
  getAttendanceByEventId, postAttendanceByEventId, patchAttendanceByEventId

} from "./controller/api.controller.index";

const app = express();

//Middleware
app.use(express.static("public"));
app.use(express.json());

//Route Handlers:
//Users
app.get("/api/users", (req: Request, res: Response) => getAllUsers(req, res));
app.get("/api/users/:id", getUserById);
app.post("/api/users", postUser);
app.patch("/api/users/:id", patchUser);
app.delete("/api/users/:id", deleteUser);

app.post("/api/users/login", loginUser);

//Events
app.get("/api/events", getAllEvents);
app.get("/api/events/:id", getEventById);
app.post("/api/events", postEvent);
app.patch('/api/events/:id', patchEvent);
app.delete('/api/events/:id', deleteEvent);

// app.get('/api/events/category:type', getEventsByCategory);
// app.get('/api/events/region:region', getEventsByRegion);
// app.get('/api/events/free', getFreeEvents);
// app.get('/api/events/paid', getPaidEvents);
// app.get('/api/events/:id/attendees', getEventAttendees);

//Attendance
app.get('/api/events/:id/attendances', getAttendanceByEventId);
// app.get('/api/attendances', getAllAttendances);
// app.get('/api/attendances/:id', getAttendanceById);
app.post('/api/events/:id/attendances', postAttendanceByEventId);
app.patch('/api/events/:id/attendances', patchAttendanceByEventId);
// app.delete('/api/attendances/:id', deleteAttendance);

app.use((err: any, req: any, res: any, next: any) => {
  // console.log("hello")
  if (err.msg) {
    return res.status(err.status).send({ error: err.msg });
  } else {
    next(err);
  }
});
//server errors
//   app.use((err:any, req:any, res:any, next:any) => {
//     console.log(err, "<<------ from our 500");
//     return res.status(500).send({ msg: "Internal Server Error" });
//   });

export default app;
