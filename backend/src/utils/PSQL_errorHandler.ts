export function handlePsqlError(error: any) {
    if (!error.code) throw error;
  
    let errorMsg = `PSQL error(${error.code})`;
  
    if (error.column && error.constraint) {
      errorMsg += ` found in '${error.column}' column or constraint '${error.constraint}'`;
    } else if (error.column) {
      errorMsg += ` found in '${error.column}' column`;
    } else if (error.constraint) {
      errorMsg += ` found in constraint '${error.constraint}'`;
    } else if (error.detail) {
      errorMsg += `: ${error.detail}`;
    }
  
    throw {
      status: 400,
      msg: errorMsg,
    };
  }
  