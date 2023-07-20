const { md5, jwt, ejs, path } = require("../modules/module");

const { User } = require("../models");
const { handleError } = require("../utils/errorhandler");
const { handleResponse } = require("../utils/responseHandler");
const { createUser } = require("../utils/vailidation/schemaVailidation");
const { sendMailer } = require('../utils/helper');


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
            is_email_verify: false
        };

        await User.create(data)
            .then(async (user) => {
                const token = await jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
                const message = await ejs.renderFile(path.join(__dirname, '../../views/email.ejs'), { name: user["first_name"], token });
                sendMailer(user['email'], "Your email verification link", message, res);

                handleResponse(res, user);
            })
            .catch(err => {
                handleError(err.message, req, res)
            })

    } catch (error) {
        handleError(error.message, req, res)
    }
};