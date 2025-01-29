import client from "../db/connection";

export const fetchAllEvents = async (): Promise<any[]> => {
    console.log('fetching events')
    try {
        const result = await client.query(`SELECT * FROM Event`);
        
        return result.rows;
    } catch (error: any) {
        console.log(error)
        throw error;
    }
};

export const fetchEventById = async (id: string): Promise<any> => {
    try {
        const result = await client.query(`SELECT * FROM Event WHERE id = $1`, [id]);
        if (result.rows.length === 0) {
            throw { msg: "Event not found", status: 404 };
          }
        return result.rows[0];
    } catch (error: any) {

        if (!error.code) throw error;
        if(error.column && error.constraint) {

            throw { status: 400, msg: `PSQL error(${error.code}) found in '${error.column}' column or constraint '${error.constraint}'` };
          } else if (error.column) {
            throw { status: 400, msg: `PSQL error(${error.code}) found in '${error.column}' column` };
          } else if (error.constraint) {
            throw { status: 400, msg: `PSQL error(${error.code}) found in constraint '${error.constraint}'` };
          } else if (error.detail) {
            throw { status: 400, msg: `PSQL error(${error.code}): ${error.detail}` };
          } else {
            throw { status: 400, msg: `PSQL error(${error.code})` };
          }
    }
};