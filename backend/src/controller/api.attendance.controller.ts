import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { fetchAttendanceByEventId, createAttendanceByEventId } from "../models/attendance.models";

export const getAttendanceByEventId = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
      const id = req.params.id
      
      if (!id) {
        res.status(400).json({ msg: "Missing event id" });
      }

      if (isNaN(Number(id))) {
        next({ status: 400, msg: "Bad Request: id must be a number" });
      }
  
      const attendees = await fetchAttendanceByEventId(id);
      
      res.status(200).json({attendees});
  
    } catch (error) {
      next(error)
    }
  }



export const postAttendanceByEventId = async (req: Request, res: Response, next: NextFunction) => {
    try {
    //   const event_id = req.body.event_id;
    //   const user_id = req.body.user_id;
  
      const { event_id, user_id, status } = req.body;
  
      if (!event_id || !user_id) {
        res.status(400).json({ msg: "Missing event or user id" });
      }
  
      const attendee = await createAttendanceByEventId(event_id, user_id, status);
  
    //   if (attendee.some((attendee: any) => attendee.user_id === user_id)) {
    //     res.status(400).json({ msg: "User already registered" });
    //   }
    
    console.log(attendee)
  
      const newAttendee = {
        event_id,
        user_id,
        status: "Registered",
        registered_at: new Date().toISOString(),
      };
  
      res.status(201).json({ newAttendee });
    } catch (error) {
      console.log(error);
    }
  };