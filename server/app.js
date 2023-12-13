const express = require("express");
const { getBlog, postBlog, getMostViewedBlogs, getSpecificBlog, getLatestBlogs, updateBlogView, getRelatedBlogs, updateBlogComments } = require("./controllers/blogController");
const app = express();
const cors = require("cors");
const { getUserByEmail, saveNewUser, getUserRole, getSingleUser, updateUser } = require("./controllers/userController");
const { generateToken } = require("./controllers/tokenController");
const verifyToken = require("./middlewares/verifyToken");
const verifyAuthor = require("./middlewares/verifyAuthor");
const { getAllSubscriber, getIndividualSubscriber, addNewSubscriber } = require("./controllers/subscriberController");


//Middlewares
app.use(cors());
app.use(express.json());




//Blog related apis
app.get("/blogs", getBlog);
app.get("/blogs/mostViewed", getMostViewedBlogs);
app.get("/blogs/recent", getLatestBlogs);
app.get("/blog/:id", getSpecificBlog);
app.post("/blogs", verifyToken, verifyAuthor, postBlog);
app.put("/updateView", updateBlogView);
app.get("/relatedBlogs", getRelatedBlogs);
app.put("/updateComments", verifyToken, updateBlogComments);



//User related apis
app.get("/user", getUserByEmail);
app.get("/userRole", verifyToken, getUserRole);
app.put("/updateUser", verifyToken, updateUser);



//Authentication and Authorization related apis
app.post("/jwt", generateToken);



//Subscriber related apis
app.get("/subscribers", getAllSubscriber);      //TODO: make this route admin protective
app.get("/subscriber", getIndividualSubscriber);
app.post("/subscriber", addNewSubscriber);




app.get("/", (req, res) => {
    res.send({ message: "The server is up and running...." })
});


module.exports = app;