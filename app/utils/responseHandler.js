exports.handleResponse = (res, data, status = 200) => {
    res.status(status).send(data)
    return
};

exports.getResponse = (res, message, status = 200) => {
    return res.status(status).send({
        message: message,
        error: false
    })
};
