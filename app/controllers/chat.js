const { Chat } = require("../models");
const { handleError } = require("../utils/errorhandler");
const { getResponse } = require("../utils/responseHandler");

exports.createMessage = async (req, res) => {
    const { message, sender_id, reciever_id } = req.body;
    const data = {
        message,
        sender_id,
        reciever_id
    }
    await Chat.create(data).then(async (data) => {
        getResponse(res, data, 201)
    }).catch((err) => {
        handleError(err.message, req, res)
    })
}