import client from "../db/connection";
import { buildUpdateQuery } from "../utils/patchReqUtil";
import { handlePsqlError } from "../utils/PSQL_errorHandler";

export const fetchAllEvents = async (): Promise<any[]> => {

  try {
    const result = await client.query(`SELECT * FROM Event`);

    return result.rows;
  } catch (error: any) {
    throw error;
  }
};

export const fetchEventById = async (id: string): Promise<any> => {
  try {
    const result = await client.query(`SELECT * FROM Event WHERE id = $1`, [
      id,
    ]);
    if (result.rows.length === 0) {
      throw { msg: "Event not found", status: 404 };
    }
    return result.rows[0];
  } catch (error: any) {
    

    if (!error.code) throw error;
    if (error.column && error.constraint) {
      throw {
        status: 400,
        msg: `PSQL error(${error.code}) found in '${error.column}' column or constraint '${error.constraint}'`,
      };
    } else if (error.column) {
      throw {
        status: 400,
        msg: `PSQL error(${error.code}) found in '${error.column}' column`,
      };
    } else if (error.constraint) {
      throw {
        status: 400,
        msg: `PSQL error(${error.code}) found in constraint '${error.constraint}'`,
      };
    } else if (error.detail) {
      throw { status: 400, msg: `PSQL error(${error.code}): ${error.detail}` };
    } else {
      throw { status: 400, msg: `PSQL error(${error.code})` };
    }
  }
};

export const createEvent = async (eventDetails: any): Promise<any> => {
  
  try {
    const result = await client.query(
      `INSERT INTO Event (owner_id, title, description, price, location_type, city, region, tickets_remaining, capacity, category, start_datetime, end_datetime, address, photo_1_url, photo_2_url, photo_3_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *`,
      [
        eventDetails.owner_id,
        eventDetails.title,
        eventDetails.description,
        eventDetails.price,
        eventDetails.location_type,
        eventDetails.city,
        eventDetails.region,
        eventDetails.tickets_remaining,
        eventDetails.capacity,
        eventDetails.category,
        eventDetails.start_datetime,
        eventDetails.end_datetime,
        eventDetails.address,
        eventDetails.photo_1_url,
        eventDetails.photo_2_url,
        eventDetails.photo_3_url,
      ]
    );

 
    return result.rows[0];
  } catch (error: any) {
    if (!error.code) throw error;
    if (error.column && error.constraint) {
      throw {
        status: 400,
        msg: `PSQL error(${error.code}) found in '${error.column}' column or constraint '${error.constraint}'`,
      };
    } else if (error.column) {
      throw {
        status: 400,
        msg: `PSQL error(${error.code}) found in '${error.column}' column`,
      };
    } else if (error.constraint) {
      throw {
        status: 400,
        msg: `PSQL error(${error.code}) found in constraint '${error.constraint}'`,
      };
    } else if (error.detail) {
      throw { status: 400, msg: `PSQL error(${error.code}): ${error.detail}` };
    } else {
      throw { status: 400, msg: `PSQL error(${error.code})` };
    }
  }
};


export const updateEvent = async (id: string, eventDetails: any): Promise<any> => {

  
  try {
    const result = await client.query(  
      `${buildUpdateQuery("Event", eventDetails, id).query} `,
      
        buildUpdateQuery("Event", eventDetails, id).values
      
    )
    if (result.rows.length === 0) {
      throw { msg: "Event not found", status: 404 };
    }
    return result.rows[0];    
  } catch (error: any) {
   
    handlePsqlError(error);
    // if (!error.code) throw error;
    // if (error.column && error.constraint) {
    //   throw {
    //     status: 400,
    //     msg: `PSQL error(${error.code}) found in '${error.column}' column or constraint '${error.constraint}'`,
    //   };
    // } else if (error.column) {
    //   throw {
    //     status: 400,
    //     msg: `PSQL error(${error.code}) found in '${error.column}' column`,
    //   };
    // } else if (error.constraint) {
    //   throw {
    //     status: 400,
    //     msg: `PSQL error(${error.code}) found in constraint '${error.constraint}'`,
    //   };
    // } else if (error.detail) {
    //   throw { status: 400, msg: `PSQL error(${error.code}): ${error.detail}` };    
    // } else {
    //   throw { status: 400, msg: `PSQL error(${error.code})` };
    // }
  } 
    }


export const eraseEvent = async (id: string): Promise<any> => {
  try {

    const result = await client.query(
      `DELETE FROM Event WHERE id = $1 RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) {
      throw { msg: "Event not found", status: 404 };
    }
    return result.rows[0];
  } catch (error: any) {
    handlePsqlError(error);
  }
};