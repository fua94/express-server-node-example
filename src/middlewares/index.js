exports.notFoundError = (req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
}

exports.handleErrors = (err, req, res, next) => {
    if (err.status === 404)
        res.status(404).json({
            message: "Not found"
        });
    else
        res.status(500).json({
            message: "Something looks wrong :( !!!"
        });
}
