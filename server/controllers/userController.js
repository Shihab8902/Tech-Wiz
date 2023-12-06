const getModel = require("../model/db");

const { userCollection } = getModel();


const getUserByEmail = async (req, res) => {
    try {
        const email = req.query.email;
        const query = { email: email };
        const result = await userCollection.findOne(query);
        res.send(result);
    }
    catch (error) {
        console.log(error);
    }
}


const getUserRole = async (req, res) => {
    try {
        const email = req.query.email;
        const query = { email: email };
        const result = await userCollection.findOne(query);
        res.send(result?.role);
    }
    catch (error) {
        console.log(error);
    }
}



const saveNewUser = async (req, res) => {
    try {
        const data = req.body;
        const result = await userCollection.insertOne(data);
        res.send(result);
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = { getUserByEmail, saveNewUser, getUserRole };