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


//Get single user
const getSingleUser = async (req, res) => {
    try {
        const email = req.query.email;
        if (req.email.email !== email) {
            return res.status(403).send({ message: "forbidden" });
        }

        const query = { email: email };
        const result = await userCollection.findOne(query);
        res.send(result);
    }
    catch {
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



//Update user
const updateUser = async (req, res) => {
    try {
        const email = req.query.email;
        const data = req.body;
        if (req.email.email !== email) {
            return res.status(403).send({ message: "forbidden" });
        }

        const query = { email: email };
        const newDoc = {
            $set: {
                name: data.name,
                image: data.image
            }
        }

        const result = await userCollection.updateOne(query, newDoc);
        res.send(result);
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = { getUserByEmail, saveNewUser, getUserRole, getSingleUser, updateUser };