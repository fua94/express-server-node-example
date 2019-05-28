const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

exports.validateUser = (req, res, next) => {
    jwt.verify(req.headers['token-access'], process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            res.json({
                status: "error",
                message: err.message,
                data: null
            });
        } else {
            // add user id to request
            req.body.userId = decoded.id;
            next();
        }
    });
}
