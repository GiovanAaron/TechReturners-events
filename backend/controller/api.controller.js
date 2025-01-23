const {fetchAllUsers} = require("../models/index")

exports.getAllUsers = async (req, res) => {
    try {
        const users = await fetchAllUsers();
        res.status(200).send({users});
    } catch (error) {
        res.status(500).send({error: "Error fetching users"});
    }
}

