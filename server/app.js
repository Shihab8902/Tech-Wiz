const express = require("express");
const { getBlog, postBlog, getMostViewedBlogs, getSpecificBlog, getLatestBlogs } = require("./controllers/blogController");
const app = express();
const cors = require("cors");


//Middlewares
app.use(cors());
app.use(express.json());




//Blog related apis
app.get("/blogs", getBlog);
app.get("/blogs/mostViewed", getMostViewedBlogs);
app.get("/blogs/recent", getLatestBlogs);
app.get("/blogs/:id", getSpecificBlog);
app.post("/blogs", postBlog);




app.get("/", (req, res) => {
    res.send({ message: "The server is up and running...." })
});


module.exports = app;