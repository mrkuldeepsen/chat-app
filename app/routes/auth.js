const { auth } = require('../controllers');

var router = require('express').Router();



module.exports = app => {

    router.post('/login', auth.login);
    router.get('/email-verify', auth.emailVerify);

    router.post('/email-resend', auth.resendVerificationLink);

    router.post('/reset-password-email', auth.forgotPassword);
    router.post('/update-password', auth.forgotPasswordVerify);


    app.use('/api', router);
};