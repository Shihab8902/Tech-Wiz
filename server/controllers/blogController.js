const { ObjectId } = require('mongodb');
const getModel = require('../model/db');
const { blogCollection } = getModel();

//get blogs
const getBlog = async (req, res) => {
    try {
        const searchString = req.query.search;
        const filterValue = req.query.filter;
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        if (searchString) {
            const query = { title: { $regex: searchString, $options: "i" } };
            const result = await blogCollection.find(query).skip(page * limit).limit(limit).toArray();
            return res.send(result);

        }

        if (filterValue === "all") {
            const result = await blogCollection.find().skip(page * limit).limit(limit).toArray();
            return res.send(result);
        }

        if (filterValue === "recent") {
            const query = { publish_date: -1 };
            const result = await blogCollection.find().sort(query).skip(page * limit).limit(limit).toArray();
            return res.send(result);
        }

        if (filterValue === "popular") {
            const query = { totalViews: -1 };
            const result = await blogCollection.find().sort(query).skip(page * limit).limit(limit).toArray();
            return res.send(result);
        }

        const result = await blogCollection.find().skip(page * limit).limit(limit).toArray();
        res.send(result);

    }
    catch (error) {
        console.log(error)
    }
};


//get blogs my email
const getBlogsByEmail = async (req, res) => {
    try {

        const email = req.query.email;
        const filterValue = req.query.filter;
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);



        switch (filterValue) {
            case "all": {
                const result = await blogCollection.find({ publisher_email: email }).skip(page * limit).limit(limit).toArray();
                return res.send(result);
            }

            case "recent": {
                const query = { publish_date: -1 };
                const result = await blogCollection.find({ publisher_email: email }).sort(query).skip(page * limit).limit(limit).toArray();
                return res.send(result);
            }

            case "popular": {
                const query = { totalViews: -1 };
                const result = await blogCollection.find({ publisher_email: email }).sort(query).skip(page * limit).limit(limit).toArray();
                return res.send(result);
            }
        }

        const result = await blogCollection.find({ publisher_email: email }).skip(page * limit).limit(limit).toArray();
        res.send(result);

    }
    catch (error) {
        console.log(error)
    }
};



//Get total blogs count
const getTotalBlogs = async (req, res) => {
    try {
        const result = await blogCollection.estimatedDocumentCount();
        res.send({ total: result })
    }
    catch (error) {
        console.log(error)
    }
}


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


//Delete a blog
const deleteBlog = async (req, res) => {
    try {
        const id = req.query.id;
        const query = { _id: new ObjectId(id) };
        const result = await blogCollection.deleteOne(query);
        res.send(result);
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { getBlog, getBlogsByEmail, postBlog, getMostViewedBlogs, getSpecificBlog, getLatestBlogs, updateBlogView, getRelatedBlogs, updateBlogComments, getTotalBlogs, deleteBlog };