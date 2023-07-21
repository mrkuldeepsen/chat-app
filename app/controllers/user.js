const { md5, ejs, path } = require("../modules/module");

const { User } = require("../models");
const { handleError } = require("../utils/errorhandler");
const { handleResponse } = require("../utils/responseHandler");
const { createUser } = require("../utils/vailidation/schemaVailidation");
const { sendMailer, createToken } = require('../utils/helper');
const responseMsg = require("../utils/massage/responseMsg");


exports.register = async (req, res) => {
    try {
        const { first_name, last_name, user_name, email, password, mobile, address, state, city, country } = req.body;
        const { error } = createUser.validate(req.body, { abortEarly: false });

        if (error) {
            handleError(error, req, res)
            return
        };

        const data = {
            first_name: first_name,
            last_name: last_name,
            user_name: user_name,
            email: email,
            password: md5(password),
            mobile: mobile,
            address: address,
            state: state,
            city: city,
            country: country,
            role: 'user',
            status: 'pending',
            token: createToken(),
            is_email_verify: false
        };

        await User.create(data)
            .then(async (user) => {
                const message = await ejs.renderFile(path.join(__dirname, '../../views/email.ejs'), { name: user["first_name"], token: user['token'] });

                sendMailer(user['email'], responseMsg.EmailVerification, message, res);

                handleResponse(res, user, 201);
            })
            .catch(err => {
                handleError(err.message, req, res)
            })

    } catch (error) {
        handleError(error.message, req, res)
    }
};

exports.findAll = async (req, res) => {
    await User.findAll().then((data) => {
        handleResponse(res, data, 200)
    }).catch(err => {
        handleError(err.message, req, res)
    })
}

exports.findOne = async (req, res) => {
    const user = await User.findOne({ where: { id: req.params.id } })
    if (!user) {
        handleError(responseMsg.InvalidId, req, res)
        return
    }
    handleResponse(res, user, 200)
}