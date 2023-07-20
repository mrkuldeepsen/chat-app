exports.handleResponse = (res, data, message) => {
    res.status(200).send(data)
    return
};

exports.getResponse = (res, message) => {
    return res.status(200).send({
        message: message
    })
};
