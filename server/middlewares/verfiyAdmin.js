const getModel = require("../model/db");
const { userCollection } = getModel();

const verifyAdmin = async (req, res, next) => {
    const email = req.email?.email;
    const query = { email: email };
    const user = await userCollection.findOne(query);
    const role = user?.role;

    if (role !== "admin") {
        return res.status(403).send({ message: "forbidden" });
    }

    next();
}



module.exports = verifyAdmin;