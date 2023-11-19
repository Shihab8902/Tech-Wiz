const express = require("express");
const { getBlog, postBlog, getLatestBlogs } = require("./controllers/blogController");
const app = express();
const cors = require("cors");


//Middlewares
app.use(cors());
app.use(express.json());




//Blog related apis
app.get("/blogs", getBlog);
app.get("/blogs/latest", getLatestBlogs);
app.post("/blogs", postBlog);



app.get("/", (req, res) => {
    res.send({ message: "The server is up and running...." })
});


module.exports = app;