const jwt = require('jsonwebtoken');
const generateToken = (id) => {
    const token = jwt.sign({ id: id }, process.env.JWT_SECRET);
    return token;
};
module.exports = generateToken;