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

export const createUser = async (userDetails: any): Promise<any> => {
  try {
    const result = await client.query(
      `INSERT INTO Users (username, first_name, last_name, email, age, gender, access_type, avatar, password_hash) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [ userDetails.username,
        userDetails.first_name,
        userDetails.last_name,
        userDetails.email,
        userDetails.age,
        userDetails.gender,
        userDetails.access_type,
        userDetails.avatar,
        userDetails.password_hash
      ]
    );

    return result.rows[0];
  } catch (error: any) {
    console.log(error)
    throw { status: 500, msg: `PSQL error: ${error.code} found in "${error.column}"` };
  }
};

export const updateUser = async (
  id: string,
  userUpdates: object
): Promise<any> => {
  try {
    const fields = Object.keys(userUpdates);
    const values = Object.values(userUpdates);

    if (fields.length === 0) {
      throw {
        status: 400,
        msg: "No fields provided to update.",
      };
    }

    const setClause = fields
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ");

    values.push(id);

    const query = `
      UPDATE users
      SET ${setClause}
      WHERE id = $${fields.length + 1}
      RETURNING *;`;

    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw { msg: "User not found", status: 404 };
    }

    return result.rows[0];
  } catch (error: any) {
    throw error;
  }
};

export const eraseUserById = async (id: string): Promise<any> => {
  try {
    if (isNaN(parseInt(id))) {
      throw { msg: "Bad Request", status: 400 };
    }

    const result = await client.query(`DELETE FROM Users WHERE id = $1 RETURNING *`, [id]);

    if (result.rows.length === 0) {
      throw { msg: "User not found", status: 404 };
    }

    return result.rows[0];
  } catch (error: any) {
    throw error;
  }
};

export const fetchUserByEmail = async (email: string) => {
  try {
    const result = await client.query(`SELECT * FROM Users WHERE email = $1`, [email]);
    

    return result.rows[0];
  } catch (error: any) {
    throw error;
  }
};