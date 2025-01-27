import client from "../db/connection";

export const fetchAllUsers = async (): Promise<any[]> => {
  try {
    const result = await client.query(`SELECT * FROM Users`);
    return result.rows;
  } catch (error: any) {
    throw error;
  }
};

export const fetchUserById = async (id: string): Promise<any> => {
  try {
    const result = await client.query(`SELECT * FROM Users WHERE id = $1`, [
      id,
    ]);
    if (result.rows.length === 0) {
      throw { msg: "User not found", status: 404 };
    } else {
      return result.rows[0];
    }
  } catch (error: any) {
    throw error;
  }
};

export const postUser = async (userDetails: any): Promise<any> => {
  try {
    const result = await client.query(
      `INSERT INTO Users (first_name, last_name, email, age, gender, access_type, avatar) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        userDetails.first_name,
        userDetails.last_name,
        userDetails.email,
        userDetails.age,
        userDetails.gender,
        userDetails.access_type,
        userDetails.avatar,
      ]
    );

    return result.rows[0];
  } catch (error: any) {
    throw { status: 400, msg: "Bad Request" };
  }
};
