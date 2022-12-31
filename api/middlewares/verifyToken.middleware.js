const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).json({
            status: 501,
            response: `Access denied.`,
        });
    }
    try {
        const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifiedUser) {
            return res.status(401).json({
                status: 501,
                response: `You must be logged in.`,
            });
        }

        req.user = verifiedUser.id;
        next();
    } catch (error) {
        res.status(501).json({
            status: 501,
            response: `Internal server error : ${error} `,
        });
    }
}

module.exports = authToken;