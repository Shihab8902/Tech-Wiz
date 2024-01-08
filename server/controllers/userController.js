const { ObjectId } = require("mongodb");
const getModel = require("../model/db");

const { userCollection, authorRequestCollection } = getModel();



//Get all users
const getAllUsers = async (req, res) => {
    try {

        const searchString = req.query.search;
        const filter = req.query.filter;


        //Handle search by email
        if (searchString) {
            const caseInsensitive = new RegExp(searchString, "i");
            const filter = { email: { $regex: caseInsensitive } };

            const result = await userCollection.find(filter).toArray();
            return res.send(result);
        }


        //Handle filter
        switch (filter) {
            case "all": {
                const result = await userCollection.find().toArray();
                return res.send(result);
            }

            case "users": {
                const result = await userCollection.find({ role: "user" }).toArray();
                return res.send(result);
            }

            case "author": {
                const result = await userCollection.find({ role: "author" }).toArray();
                return res.send(result);
            }

            case "admin": {
                const result = await userCollection.find({ role: "admin" }).toArray();
                return res.send(result);
            }

            case "new": {
                const result = await userCollection.find().sort({ registeredAt: -1 }).toArray();
                return res.send(result);
            }
        }



        const result = await userCollection.find().toArray();
        res.send(result);
    }
    catch (error) {
        console.log(error);
    }
}


//Get user by email
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


//Get user role
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


//Add new user
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


//Get all author requests
const getAllAuthorRequest = async (req, res) => {
    try {
        const result = await authorRequestCollection.find().toArray();
        res.send(result);
    }
    catch (error) {
        console.log(error);
    }
}



//Get an author request
const getOneAuthorRequest = async (req, res) => {
    try {
        const email = req.query.email;
        const filter = { email: email };
        const result = await authorRequestCollection.findOne(filter);
        res.send(result);
    }
    catch (error) {
        console.log(error);
    }
}

//Post an author request
const postAuthorRequest = async (req, res) => {
    try {
        const data = req.body;
        const result = await authorRequestCollection.insertOne(data);
        res.send(result); 0
    }
    catch (error) {
        console.log(error);
    }
}

//Promote user role
const promoteUserRole = async (req, res) => {
    try {
        const email = req.query.email;
        const role = req.query.role;
        const filter = { email: email };
        const newDoc = {
            $set: {
                role: role
            }
        }
        const result = await userCollection.updateOne(filter, newDoc);
        res.send(result);

    }
    catch (error) {
        console.log(error);
    }
}

//Delete user from author request
const deleteUserFromAuthorRequest = async (req, res) => {
    try {
        const id = req.query.id;
        const filter = { _id: new ObjectId(id) };
        const result = await authorRequestCollection.deleteOne(filter);
        res.send(result);
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { getAllUsers, getUserByEmail, getOneAuthorRequest, deleteUserFromAuthorRequest, promoteUserRole, getAllAuthorRequest, saveNewUser, getUserRole, getSingleUser, updateUser, postAuthorRequest };