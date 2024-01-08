const express = require("express");
const { getBlog, postBlog, getMostViewedBlogs, getSpecificBlog, getLatestBlogs, updateBlogView, getRelatedBlogs, updateBlogComments, getTotalBlogs, deleteBlog, getBlogsByEmail, updateBlog, getBlogStats, getBlogStatsForAuthor, handleUserTotalBlogCount, getBlogByCategory, getCategoryBlogCount } = require("./controllers/blogController");
const app = express();
const cors = require("cors");
const { getUserByEmail, saveNewUser, getUserRole, getSingleUser, updateUser, getAllUsers, getAuthorRequests, getOneAuthorRequest, postAuthorRequest, getAllAuthorRequest, promoteUserRole, deleteUserFromAuthorRequest } = require("./controllers/userController");
const { generateToken } = require("./controllers/tokenController");
const verifyToken = require("./middlewares/verifyToken");
const verifyAuthor = require("./middlewares/verifyAuthor");
const { getAllSubscriber, getIndividualSubscriber, addNewSubscriber } = require("./controllers/subscriberController");
const verifyAdmin = require("./middlewares/verfiyAdmin");


//Middlewares
app.use(cors());
app.use(express.json());




//Blog related apis
app.get("/blogs", getBlog);
app.get("/myBlogs", verifyToken, verifyAuthor, getBlogsByEmail);
app.get("/totalBlogs", getTotalBlogs);
app.get("/userTotalBlog", verifyToken, verifyAuthor, handleUserTotalBlogCount);
app.get("/blogs/mostViewed", getMostViewedBlogs);
app.get("/blogs/recent", getLatestBlogs);
app.get("/blog/:id", getSpecificBlog);
app.post("/blogs", verifyToken, verifyAuthor, postBlog);
app.put("/updateView", updateBlogView);
app.get("/relatedBlogs", getRelatedBlogs);
app.get("/stats", getBlogStats);
app.get("/authorStats", verifyToken, verifyAuthor, getBlogStatsForAuthor);
app.put("/updateComments", verifyToken, updateBlogComments);
app.put("/blog", verifyToken, verifyAuthor, updateBlog);
app.delete("/blog", verifyToken, verifyAuthor, deleteBlog);

//Blog category related
app.get("/blogByCategory", getBlogByCategory);
app.get("/categoryBlogCount", getCategoryBlogCount);



//User related apis
app.get("/users", verifyToken, verifyAdmin, getAllUsers);
app.get("/user", getUserByEmail);
app.post("/user", saveNewUser);
app.get("/userRole", verifyToken, getUserRole);
app.put("/updateUser", verifyToken, updateUser);
app.get("/authRequest", verifyToken, getOneAuthorRequest);
app.post("/authRequest", verifyToken, postAuthorRequest);
app.get("/authRequests", verifyToken, verifyAdmin, getAllAuthorRequest);
app.put("/promoteUser", verifyToken, verifyAdmin, promoteUserRole);
app.delete("/deleteAuthUser", verifyToken, verifyAdmin, deleteUserFromAuthorRequest);



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