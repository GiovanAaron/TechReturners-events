import client from "../db/connection";
import { buildUpdateQuery } from "../utils/patchReqUtil";
import { handlePsqlError } from "../utils/PSQL_errorHandler";

export const fetchAttendanceByEventId = async (eventId: string) => {
    
    const result = await client.query("SELECT * FROM Attendance WHERE event_id = $1", [eventId]); //
    
    if (result.rows.length === 0) {
        throw { msg: "Bad Request: Event not found", status: 404 };
      }


    return result.rows
}

export const createAttendanceByEventId = async (eventId: string, userId: string, status: string) => {
    
    try {
      const result = await client.query("INSERT INTO Attendance (event_id, user_id, status) VALUES ($1, $2, $3) RETURNING *", [eventId, userId, status]);
      return result.rows[0]
    } catch (error) {
      handlePsqlError(error);
    }
}

export const updateAttendanceByEventId = async (eventId: string, userId: string, status: string) => {
    
    try {
        const result = await client.query(
            "UPDATE attendance SET status = $1 WHERE event_id = $2 AND user_id = $3 RETURNING *", 
            [status, eventId, userId]
          );

        if (result.rows.length === 0) {
            throw { msg: "No record of Attendance between the user and event provided", status: 400 };
          }
       
      return result.rows[0]
    } catch (error) {
        
      handlePsqlError(error);
    }
}

export const eraseAttendanceByEventId = async (eventId: string, userId: string) => {
    
    try {
      const result = await client.query("DELETE FROM Attendance WHERE event_id = $1 AND user_id = $2 RETURNING *", [eventId, userId]);
      if (result.rows.length === 0) {
        throw { msg: "No record of Attendance between the user and event provided", status: 400 };
      }
      return result.rows[0]
    } catch (error) {
      handlePsqlError(error);
    }
}

export const fetchAttendanceByUserId = async (userId: string) => {    
    const result = await client.query("SELECT * FROM Attendance WHERE user_id = $1", [userId]); //
    
    if (result.rows.length === 0) {
        throw { msg: "Bad Request: User not found", status: 404 };
      }

    return result.rows
}