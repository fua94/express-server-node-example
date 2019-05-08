const Task = require('../models/task');

exports.index = async (req, res) => {
    await Task.find()
        .then(
            tasks => {
                res.send(tasks);
            }
        ).catch(
            error => {
                res.status(412).json({
                    msg: error.message
                });
            }
        );
}

exports.create = async (req, res) => {
    await Task.create(req.body)
        .then(
            result => {
                res.status(200).json({
                    status: 'received!',
                    result
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
