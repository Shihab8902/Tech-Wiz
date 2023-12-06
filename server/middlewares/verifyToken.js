const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const tokenWithBearer = req.headers?.authorization;
    const token = tokenWithBearer?.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: "unauthorized" });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
        if (error) {
            return res.status(401).send({ message: "unauthorized" });
        }
        req.email = decoded;
        next();
    });

}


module.exports = verifyToken;