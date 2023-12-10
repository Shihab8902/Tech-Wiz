const express = require("express");
const { getBlog, postBlog, getMostViewedBlogs, getSpecificBlog, getLatestBlogs, updateBlogView } = require("./controllers/blogController");
const app = express();
const cors = require("cors");
const { getUserByEmail, saveNewUser, getUserRole } = require("./controllers/userController");
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
app.get("/blogs/:id", getSpecificBlog);
app.post("/blogs", verifyToken, verifyAuthor, postBlog);
app.put("/updateView", updateBlogView)



//User related apis
app.get("/user", getUserByEmail);
app.get("/userRole", verifyToken, getUserRole);
app.post("/user", saveNewUser);



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