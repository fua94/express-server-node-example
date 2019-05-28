const Task = require('../models/task.model');
const User = require('../models/user.model');

exports.index = async (req, res) => {
    try{
        const tasks = await Task.find().populate('author')
        res.send(tasks)
    }catch (err) {
        console.log(err)
        res.status(412).json({
            msg: err.message
        });
    }
}

exports.create = async (req, res) => {
    const { user_id, title, description } = req.body
    try{
        const user = await User.findById(user_id)
        const task = await Task.create({
            title,
            description,
            author: user
        })
        console.log(task)
        res.status(200).json({
            status: 'received!',
            task
        });
    }catch(error){
        res.status(412).json({
            msg: error.message
        })
    }
}

exports.delete = async (req, res) => {
    const { id } = req.params;
    await Task.deleteOne({
        _id: id
    }).then(
        result => {
            res.status(200).json({
                status: 'deleted!'
            });
        }
    ).catch(
        error => {
            res.status(400).json({
                msg: error.message
            });
        }
    );
}

exports.update = async (req, res) => {
    const { id } = req.params;

    await Task.updateOne({
        _id: id
    }, req.body).then(
        result => {
            res.status(200).json({
                status: 'updated!'
            });
        }
    ).catch(
        error => {
            res.status(400).json({
                msg: error.message
            });
        }
    );
}
