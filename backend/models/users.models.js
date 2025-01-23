const client = require("../db/connection");

exports.fetchAllUsers = () => {
    return db
    .query(`Select * From Users`)
    .then(({rows}) => {
        return rows
    })

}