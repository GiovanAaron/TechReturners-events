export function buildUpdateQuery(tableName: string, fieldsToUpdate : object, id: any) {
    const fields = Object.keys(fieldsToUpdate);
    const values = Object.values(fieldsToUpdate);
  
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
      UPDATE ${tableName}
      SET ${setClause}
      WHERE id = $${fields.length + 1}
      RETURNING *;`;
  
    return { query, values };
  }