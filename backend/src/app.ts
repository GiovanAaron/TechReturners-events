import express, { Request, Response } from "express";

import {
  getAllUsers, getUserById, postUser, patchUser, deleteUser,
  loginUser,
  getAllEvents, getEventById, postEvent, patchEvent, deleteEvent, 
  getAttendanceByEventId, postAttendanceByEventId, patchAttendanceByEventId,
  deleteAttendanceByEventId, getAttendanceByUserId
  

} from "./controller/api.controller.index";

import { authenticateAndAuthorize } from "./middleware/authMiddleware";



const app = express();

//Middleware
app.use(express.static("public"));
app.use(express.json());

//Route Handlers:
//Users
app.get("/api/users", authenticateAndAuthorize(['Admin']), getAllUsers);
app.get("/api/users/:id", authenticateAndAuthorize(['Admin', 'Moderator', 'User'], true),getUserById);//self and admin
app.post("/api/users", postUser);
app.patch("/api/users/:id",authenticateAndAuthorize(['User', 'Admin'], true), patchUser);//self and admin
app.delete("/api/users/:id",authenticateAndAuthorize(['User', 'Admin'], true), deleteUser); //self and admin

app.post("/api/users/login", loginUser);

//Events
app.get("/api/events", getAllEvents); 
app.get("/api/events/:id", getEventById);
app.post("/api/events", authenticateAndAuthorize(['Admin', 'Moderator']),postEvent);//admin and mod
app.patch('/api/events/:id', authenticateAndAuthorize(['Admin', 'Moderator']),patchEvent);//admin and mod
app.delete('/api/events/:id', authenticateAndAuthorize(['Admin', 'Moderator']), deleteEvent);//admin and mod

// app.get('/api/events/category:type', getEventsByCategory);
// app.get('/api/events/region:region', getEventsByRegion);
// app.get('/api/events/free', getFreeEvents);
// app.get('/api/events/paid', getPaidEvents);
// app.get('/api/events/:id/attendees', getEventAttendees);

//Attendance
app.get('/api/events/:id/attendances', authenticateAndAuthorize(['Admin']),getAttendanceByEventId); //admin
// app.get('/api/attendances', getAllAttendances);
// app.get('/api/attendances/:id', getAttendanceById);
app.post('/api/events/:id/attendances', authenticateAndAuthorize(['Admin', 'Moderator', 'User']),postAttendanceByEventId)//admin, user, mod
app.patch('/api/events/:id/attendances', authenticateAndAuthorize(['Admin', 'Moderator', 'User'], true),patchAttendanceByEventId)//admin, self
app.delete('/api/events/:id/attendances/', authenticateAndAuthorize(['Admin', 'User'], true), deleteAttendanceByEventId);//admin, self

app.get('/api/users/:id/attendances', authenticateAndAuthorize(['Admin', 'Moderator', 'User']), getAttendanceByUserId);//  admin, user, mod

app.use((err: any, req: any, res: any, next: any) => {

  if (err.msg) {
    return res.status(err.status).send({ error: err.msg });
  } else {
    next(err);
  }
});
//server errors
  // app.use((err:any, req:any, res:any, next:any) => {
  //   console.log(err, "<<------ from our 500");
  //   return res.status(500).send({ msg: "Internal Server Error" });
  // });

export default app;
