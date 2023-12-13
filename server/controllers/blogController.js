const { ObjectId } = require('mongodb');
const getModel = require('../model/db');
const { blogCollection } = getModel();

//get blogs
const getBlog = async (req, res) => {
    try {
        const result = await blogCollection.find().toArray();
        res.send(result);
    }
    catch (error) {
        console.log(error)
    }
};


//Get most viewed blogs
const getMostViewedBlogs = async (req, res) => {
    try {
        const query = { totalViews: -1 };
        const result = await blogCollection.find().sort(query).limit(3).toArray();
        res.send(result);
    }
    catch (error) {
        console.log(error)
    }
}


//Get a specific blog
const getSpecificBlog = async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await blogCollection.findOne(query);
    res.send(result);
}


//Get most recent blogs
const getLatestBlogs = async (req, res) => {
    try {
        const query = { publish_date: -1 };
        const result = await blogCollection.find().sort(query).limit(4).toArray();
        res.send(result);
    }
    catch (error) {
        console.log(error)
    }
}


//Get related blogs
const getRelatedBlogs = async (req, res) => {
    try {
        const category = req.query.category;
        const query = { category: category };
        const result = await blogCollection.find(query).sort({ publish_date: -1 }).limit(3).toArray();
        res.send(result);
    }
    catch (error) {
        console.log(error);
    }
}


//post blog
const postBlog = async (req, res) => {
    try {
        const data = req.body;
        const result = await blogCollection.insertOne(data);
        res.send(result);
    }
    catch (error) {
        console.log(error);
    }
}


//update blog view
const updateBlogView = async (req, res) => {
    try {
        const data = req.body;
        const id = req.query.id;
        const query = { _id: new ObjectId(id) };

        const newDoc = {
            $set: {
                totalViews: data.view
            }
        }

        const result = await blogCollection.updateOne(query, newDoc);
        res.send(result);
    }
    catch (error) {
        console.log(error);
    }
}


//update blog comments
const updateBlogComments = async (req, res) => {
    try {
        const data = req.body;
        const id = req.query.id;
        const query = { _id: new ObjectId(id) };
        const newDoc = {
            $set: {
                comments: data
            }
        }

        const result = await blogCollection.updateOne(query, newDoc);
        res.send(result);
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { getBlog, postBlog, getMostViewedBlogs, getSpecificBlog, getLatestBlogs, updateBlogView, getRelatedBlogs, updateBlogComments };