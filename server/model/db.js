const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kitiq8p.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    catch (error) {
        console.log(error);
    }
}
run();


const getModel = () => {
    const blogCollection = client.db("techwizDB").collection("blogs");
    const userCollection = client.db("techwizDB").collection("users");
    return { blogCollection, userCollection };
};

module.exports = getModel;
