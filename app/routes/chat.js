const { chats } = require('../controllers');

var router = require('express').Router();



module.exports = app => {

    router.post('/chats', chats.createMessage);

    app.use('/api', router);
};