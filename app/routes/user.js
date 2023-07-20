var router = require('express').Router();

const { users } = require('../controllers');


module.exports = app => {

    router.post('/register', users.register);
    // router.get('/users', users.findAll);
    // router.get('/user/:id', users.findOne);


    // router.patch('/user/update-profile', users.update);
    // router.delete('/user/:id', users.delete);

    app.use('/api', router);
};