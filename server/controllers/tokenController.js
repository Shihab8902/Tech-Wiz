const jwt = require("jsonwebtoken");


const generateToken = (req, res) => {
    try {
        const user = req.body;
        const token = jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "72h" });
        res.send({ token });
    }
    catch (error) {
        console.log(error);
    }
}



module.exports = { generateToken };