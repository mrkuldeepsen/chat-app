const { jwt, md5, ejs, path } = require("../modules/module");
const { User } = require("../models");
const { handleError } = require("../utils/errorhandler");
const { handleResponse, getResponse } = require("../utils/responseHandler");
const { userLogin, emailVerify, resendEmail, passwordReset, updatePassword } = require("../utils/vailidation/schemaVailidation");
const responseMsg = require("../utils/massage/responseMsg");
const { createToken, sendMailer } = require("../utils/helper");



exports.emailVerify = async (req, res) => {
    try {
        const { error } = emailVerify.validate(req.query.token, { abortEarly: false });

        if (error) {
            handleError(error, req, res)
            return
        };

        await User.findOne({ where: { token: req.query.token, } }).then(async (user) => {
            if (!user) {
                handleError(responseMsg.LinkAllReadyUsed, req, res)
                return
            };

            await User.update({
                token: null,
                is_email_verify: true,
                status: 'active',
            }, { where: { id: user.id } })

            getResponse(res, responseMsg.EmailVerified);
        }).catch(err => {
            handleError(err.message, req, res);
        });
    } catch (error) {
        handleError(error.message, req, res);
    }
};

exports.resendVerificationLink = async (req, res) => {
    try {
        const { email } = req.body;
        const { error } = resendEmail.validate(req.body, { abortEarly: false });

        if (error) {
            handleError(error, req, res)
            return
        };

        const user = await User.findOne({ where: { email } })
        if (!user) {
            handleError(responseMsg.InputRegisterEmail, req, res)
            return
        }
        await User.update({
            token: createToken(),
        }, { where: { id: user['id'], email: email, } })

        getResponse(res, responseMsg.LinkHasbeenSend);

    } catch (error) {
        handleError(error.message, req, res)
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = userLogin.validate(req.body, { abortEarly: false });

        if (error) {
            handleError(error, req, res)
            return
        };

        await User.findOne({ where: { email: email, password: md5(password) } })
            .then(async (user) => {
                if (!user) {
                    handleError(responseMsg.InvalidCredentials, req, res);
                    return;
                }
                if (user && user['is_email_verify']) {
                    const token = await jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
                    handleResponse(res, { token, message: responseMsg.LogInSuccess });
                    return
                }
                else {
                    handleError(responseMsg.EmailNotVerify, req, res)
                    return
                }
            }).catch(err => {
                handleError(err.message, req, res);
            })

    } catch (error) {
        handleError(error.message, req, res);
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body

        const { error } = passwordReset.validate(req.body, { abortEarly: false })

        if (error) {
            handleError(error, req, res)
            return
        }

        const user = await User.findOne({ where: { email: req.body.email } })

        if (!user) {
            handleError(responseMsg.InputRegisterEmail, req, res)
            return
        }
        const token = createToken()

        User.update({
            email: email,
            token: token
        },
            { where: { id: user.id } })
            .then(async (data) => {
                const message = await ejs.renderFile(path.join(__dirname, '../../views/forgot_password_email.ejs'), { name: user["first_name"], token: token });

                sendMailer(user['email'], responseMsg.ResetPassword, message, res);

                getResponse(res, responseMsg.WeHaveSendResetPassLink, 200)
                return
            })
            .catch(err => {
                handleError(err.message, req, res)
            })
    } catch (error) {
        handleError(error.message, req, res)
    }
};

exports.forgotPasswordVerify = async (req, res) => {
    try {
        const { error } = updatePassword.validate(req.body, { abortEarly: false })

        if (error) {
            handleError(error, req, res)
            return
        }

        const user = await User.findOne({ where: { token: req.body.token } })

        if (!user) {
            handleError(responseMsg.LinkAllReadyUsed, req, res)
            return
        }

        if (req.body.new_password !== req.body.confirm_password) {
            handleError(responseMsg.PasswordConfirmPassNotMatch, req, res)
            return
        }

        const result = await User.update({ token: null, password: md5(req.body.new_password), }, { where: { id: user.id } })

        if (result.length > 0) {
            getResponse(res, responseMsg.UpdatePasssword)
            return
        }

        handleError(err.message, req, res)
        return


    } catch (error) {
        handleError(error.message, req, res)
    }
};

