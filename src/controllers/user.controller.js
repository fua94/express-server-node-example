const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

exports.index = async (req, res) => {
    try{
        const users = await User.find()
        res.send(users)
    }catch (err) {
        console.log(err)
        res.status(412).json({
            msg: err.message
        });
    }
}

exports.delete = async (req, res) => {
    const { id } = req.params
    try{
        await User.deleteOne({
            _id: id
        })
        res.status(200).json({
            status: 'deleted!'
        })
    }catch (err) {
        console.log(err)
        res.status(400).json({
            msg: error.message
        })
    }
}

exports.create = async (req, res, next) => {
    const { username, password } = req.body

    try{
        const user = await User.create({
            username,
            password
        })
        console.log(user)
        res.json({
            status: "success",
            message: "User added successfully!!!",
            data: user
        })
    }catch(error){
        next(err)
    }
}

exports.authenticate = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }, function(err, userInfo) {
        if (err) {
            next(err);
        } else {
            try{
                if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign({
                        id: userInfo._id
                    }, process.env.SECRET_KEY, {
                        expiresIn: '1h'
                    });
                    res.json({
                        status: "success",
                        message: "user found!!!",
                        token: token,
                        user: userInfo
                    });
                } else {
                    res.json({
                        status: "error",
                        message: "Invalid email/password!!!",
                        data: null
                    });
                }
            }catch(error) {
                console.log(error);
            }
        }
    });
}
