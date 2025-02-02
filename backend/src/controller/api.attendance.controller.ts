import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  fetchAttendanceByEventId,
  createAttendanceByEventId,
  updateAttendanceByEventId,
  eraseAttendanceByEventId,
  fetchAttendanceByUserId
} from "../models/attendance.models";
import { checkAuthorization } from "../utils/auth_utils";

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
    
    const userAuth = (req as any).user
    const user_id = userAuth.id
   
    const event_id = req.params.id
    
    const { status } = req.body;
  
    

    if (!event_id || !userAuth.id) {
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
      userAuth.id,
      status
    );

    

    const newAttendee = {
      event_id: Number(event_id),
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
    const event_id = req.params.id;
    const {  status } = req.body;
    const userAuth = (req as any).user
    const user_id = userAuth.id

    if (status !== "Interested" && status !== "Registered" && status !== "Cancelled") {
      next({ status: 400, msg: "Bad Request: status must be 'Interested', 'Registered' or 'Cancelled'" });
        
    }
    
    if (!event_id) {
      res.status(400).json({ msg: "Missing event id" });
    }

    if (isNaN(Number(event_id))) {
      next({ status: 400, msg: "Bad Request: id must be a number" }); 
    }

    if (!user_id || !status) {
      next({ status: 400, msg: "Missing user id or status" });
    }

    if (isNaN(Number(user_id))) {
      next({ status: 400, msg: "Bad Request: user id must be a number" });
    }

    

    const updatedAttendance = await updateAttendanceByEventId(event_id, user_id, status);

    
    res.status(200).json({ updatedAttendance });
  } catch (error) {
   
    next(error);
  }
}

export const deleteAttendanceByEventId = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const event_id = req.params.id; 
    const user_id = req.body.user_id;  
    const token_user = (req as any).user
    
    
    if (token_user.id !== user_id && token_user.access_type == "User") {
      next({ status: 401, msg: "Unauthorized: You are not authorized to delete this attendance" });
    }

    if (!event_id) {
      res.status(400).json({ msg: "Missing event id" });
    }

    if (!user_id) {
      next({ status: 400, msg: "Bad Request: user_id must be provided" });
    }

    if (isNaN(Number(event_id))) {
      next({ status: 400, msg: "Bad Request: id must be a number" });
    } 

    await eraseAttendanceByEventId(event_id, user_id);
    res.status(200).send({msg: "Attendance Deleted"});
  } catch (error: any) {
    next(error);
  }
};


export const getAttendanceByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const user_id = req.params.id;
    const token_user = (req as any).user

    if (token_user.id.toString() !== user_id && token_user.access_type.toString() == "User") {
      next({ status: 401, msg: "Unauthorized: You are not authorized to get attendances for this account" });
    }

    if (!user_id) {
      res.status(400).json({ msg: "Missing user id" }); 
    }

    if (isNaN(Number(user_id))) {
      next({ status: 400, msg: "Bad Request: id must be a number" });
    }

    const attendances = await fetchAttendanceByUserId(user_id);

    
    res.status(200).json({ attendances });
  } catch (error) {
    next(error);
  } 
};