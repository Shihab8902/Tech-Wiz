const { ObjectId } = require('mongodb');
const { getModel } = require('../model/db');
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
                const result = await blogCollection.find({ publisher_email: email }).sort({ publish_date: -1 }).skip(page * limit).limit(limit).toArray();
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

        const result = await blogCollection.find({ publisher_email: email }).skip(page * limit).sort({ publish_date: -1 }).limit(limit).toArray();
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

//Get blog stats
const getBlogStats = async (req, res) => {
    try {
        const result = await blogCollection.aggregate([
            {
                $group: {
                    _id: "$category", // return the category name as _id
                    total: { $sum: 1 }
                }
            }
        ]).toArray();

        res.send(result);
    }
    catch (error) {
        console.log(error);
    }
}

//Get blog stats for author
const getBlogStatsForAuthor = async (req, res) => {
    try {
        const email = req.query.email;
        const filter = { publisher_email: email };
        const projection = { title: 1, totalViews: 1, _id: 0 };
        const result = await blogCollection.find(filter).project(projection).toArray();
        res.send(result);
    }
    catch (error) {
        console.log(error);
    }
}


//Get use total blog
const handleUserTotalBlogCount = async (req, res) => {
    try {
        const email = req.query.email;
        const filter = { publisher_email: email };
        const result = await blogCollection.countDocuments(filter);
        res.send({ total: result });
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


//Update blog
const updateBlog = async (req, res) => {
    try {
        const id = req.query.id;
        const data = req.body;
        const filter = { _id: new ObjectId(id) };

        const newDoc = {
            $set: {
                title: data.title,
                category: data.category,
                image: data.image,
                body: data.body
            }
        }

        const result = await blogCollection.updateOne(filter, newDoc);
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



//Get blog by category
const getBlogByCategory = async (req, res) => {
    try {
        const category = req.query.category;
        const limit = req.query.limit;
        const search = req.query.search;
        const filterCondition = req.query.filter;




        const filter = { category: category };

        if (limit) {

            if (search) {
                const query = {
                    $and: [
                        { category: category },
                        { title: { $regex: new RegExp(search, 'i') } }
                    ]
                };

                console.log(query);

                const result = await blogCollection.find(query).sort({ publish_date: -1 }).toArray();
                return res.send(result);
            }


            switch (filterCondition) {
                case "all": {
                    const result = await blogCollection.find(filter).limit(parseInt(limit)).toArray();
                    return res.send(result);
                }

                case "popular": {
                    const result = await blogCollection.find(filter).limit(parseInt(limit)).sort({ totalViews: -1 }).toArray();
                    return res.send(result);
                }

                case "new": {
                    const result = await blogCollection.find(filter).limit(parseInt(limit)).sort({ publish_date: -1 }).toArray();
                    return res.send(result);
                }
            }

            const result = await blogCollection.find(filter).limit(parseInt(limit)).sort({ publish_date: -1 }).toArray();
            return res.send(result);
        }

        const result = await blogCollection.find(filter).sort({ publish_date: -1 }).toArray();

        res.send(result);
    }
    catch (error) {
        console.log(error);
    }
}


//Get category blog count
const getCategoryBlogCount = async (req, res) => {
    try {
        const category = req.query.category;

        const filter = { category: category };
        const result = await blogCollection.countDocuments(filter);
        res.send({ total: result });
    }
    catch (error) {
        console.log(error);
    }
}

//Get blog count for menu
const menuBlogCount = async (req, res) => {
    try {
        const result = await blogCollection.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    categoryName: "$_id",
                    totalCount: "$count",
                    _id: 0
                }
            }
        ]).toArray();

        // Convert the array to a single object
        const categoriesObject = result.reduce((acc, category) => {
            acc[category.categoryName] = category.totalCount;
            return acc;
        }, {});

        res.send(categoriesObject);
    }
    catch (error) {
        console.log(error);
    }
}


//Get random blogs
const getRandomBlogs = async (req, res) => {
    try {
        const result = await blogCollection.aggregate([
            { $sample: { size: 5 } }
        ]).toArray();

        res.send(result);
    }
    catch (error) {
        console.log(error);
    }
}






module.exports = { getBlog, getBlogsByEmail, handleUserTotalBlogCount, getRandomBlogs, menuBlogCount, getCategoryBlogCount, getBlogByCategory, getBlogStatsForAuthor, getBlogStats, postBlog, getMostViewedBlogs, getSpecificBlog, updateBlog, getLatestBlogs, updateBlogView, getRelatedBlogs, updateBlogComments, getTotalBlogs, deleteBlog };