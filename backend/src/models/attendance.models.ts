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
    const result = await client.query("INSERT INTO Attendance (event_id, user_id, status) VALUES ($1, $2, $3) RETURNING *", [eventId, userId, status]);
    return result.rows[0]
}