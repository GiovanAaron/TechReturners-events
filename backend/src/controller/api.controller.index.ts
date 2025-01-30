import {
    getAllUsers,
    getUserById,
    postUser,
    patchUser,
    deleteUser,
  } from "./api.user.controller";

  import { getAllEvents, getEventById, postEvent, patchEvent, deleteEvent } from "./api.events.controller";
  import { getAttendanceByEventId, postAttendanceByEventId } from "./api.attendance.controller";
  import { loginUser } from "./api.login.controller";

  export {
    getAllUsers,
    getUserById,
    postUser,
    patchUser,
    deleteUser,
    getAllEvents,
    loginUser,
    getEventById,
    postEvent,
    patchEvent,
    deleteEvent,
    getAttendanceByEventId,
    postAttendanceByEventId
    
  };