const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
    }

    if (!token) {
        return res.status(401).send("No Token, authorization denied")
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decode;

        console.log("The Decoded User is", req.user, "Route:", req.originalUrl);
        next()
    } catch (err) {
        res.status(400).send("Token is not valid");
    }
}

module.exports = { verifyToken };