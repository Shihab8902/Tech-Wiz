const getModel = require("../model/db");
const { subscriberCollection } = getModel();


//Get all subscribers
const getAllSubscriber = async (req, res) => {
    try {
        const result = await subscriberCollection.find().toArray();
        res.send(result);

    }
    catch (error) {
        console.log(error);
    }
}



//Get a subscriber
const getIndividualSubscriber = async (req, res) => {
    try {
        const email = req.query.email;
        const query = { email: email };
        const result = await subscriberCollection.findOne(query);
        res.send(result);
    }
    catch (error) {
        console.log(error);
    }
}


//Add a new subscriber
const addNewSubscriber = async (req, res) => {
    try {
        const data = req.body;
        const result = await subscriberCollection.insertOne(data);
        res.send(result);
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { getAllSubscriber, getIndividualSubscriber, addNewSubscriber };