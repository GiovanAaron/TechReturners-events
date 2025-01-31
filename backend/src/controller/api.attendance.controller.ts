import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  fetchAttendanceByEventId,
  createAttendanceByEventId,
  updateAttendanceByEventId,
  eraseAttendanceByEventId
} from "../models/attendance.models";

export const getAttendanceByEventId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(400).json({ msg: "Missing event id" });
    }

    if (isNaN(Number(id))) {
      next({ status: 400, msg: "Bad Request: id must be a number" });
    }

    const attendees = await fetchAttendanceByEventId(id);

    res.status(200).json({ attendees });
  } catch (error) {
    next(error);
  }
};

export const postAttendanceByEventId = async ( req: Request, res: Response, next: NextFunction) => {
  try {
   

    const { event_id, user_id, status } = req.body;

    if (!event_id || !user_id) {
      next({ status: 400, msg: "Missing event or user id" });
    }

    if (isNaN(Number(event_id)) || isNaN(Number(user_id))) {
      next({ status: 400, msg: "Bad Request: id must be a number" });
    }

    const existingAttendance = await fetchAttendanceByEventId(event_id);
    if (existingAttendance.some((attendance: any) => attendance.user_id === user_id)) {
      next({ status: 400, msg: "User has already registered for this event" });
    }

    const newAttendance = await createAttendanceByEventId(
      event_id,
      user_id,
      status
    );
    

    const newAttendee = {
      event_id,
      user_id,
      status: "Registered",
      registered_at: new Date().toISOString(),
    };

    res.status(201).json({ newAttendee });
  } catch (error) {
    
    next(error);
  }
};

export const patchAttendanceByEventId = async (req: Request, res: Response, next: NextFunction) => {
    
  try {
    const id = req.params.id;
    const { user_id, status } = req.body;

    if (status !== "Interested" && status !== "Registered" && status !== "Cancelled") {
      next({ status: 400, msg: "Bad Request: status must be 'Interested', 'Registered' or 'Cancelled'" });
        
    }
    
    if (!id) {
      res.status(400).json({ msg: "Missing event id" });
    }

    if (isNaN(Number(id))) {
      next({ status: 400, msg: "Bad Request: id must be a number" }); 
    }

    if (!user_id || !status) {
      next({ status: 400, msg: "Missing user id or status" });
    }

    if (isNaN(Number(user_id))) {
      next({ status: 400, msg: "Bad Request: user id must be a number" });
    }

    const updatedAttendance = await updateAttendanceByEventId(id, user_id, status);

    
    res.status(200).json({ updatedAttendance });
  } catch (error) {
   
    next(error);
  }
}

export const deleteAttendanceByEventId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id; 
    const user_id = req.body.user_id;  

    if (!id) {
      res.status(400).json({ msg: "Missing event id" });
    }

    if (!user_id) {
      next({ status: 400, msg: "Bad Request: user_id must be provided" });
    }

    if (isNaN(Number(id))) {
      next({ status: 400, msg: "Bad Request: id must be a number" });
    } 

    await eraseAttendanceByEventId(id, user_id);
    res.status(200).send({msg: "Attendance Deleted"});
  } catch (error: any) {
    next(error);
  }
};