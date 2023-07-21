const Joi = require('joi')

// User registration
const createUser = Joi.object().keys({
    first_name: Joi.string().min(2).max(64),
    last_name: Joi.string().min(2).max(64),
    user_name: Joi.string(),

    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(32).required(),

    mobile: Joi.string().min(10).max(13),

    status: Joi.string(),
    address: Joi.string(),
    state: Joi.string(),

    city: Joi.string(),
    country: Joi.string(),
    status: Joi.string(),
    role: Joi.string(),

    is_email_verify: Joi.boolean(),
})

// User account verification
const emailVerify = Joi.object().keys({
    token: Joi.string().required()
})

//login 
const userLogin = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(32).required(),
})



//forgot pass
const updatePassword = Joi.object().keys({
    token: Joi.string().required(),
    new_password: Joi.string().min(8).max(32).required(),
    confirm_password: Joi.string().min(8).max(32).required(),
})

//Update user profile
const updateUserProfile = Joi.object().keys({
    first_name: Joi.string().min(2).max(64).required(),
    last_name: Joi.string().min(2).max(64).required(),
    mobile: Joi.string().min(10).max(13),
    user_name: Joi.string().min(4).max(64),
    address: Joi.string().min(2).max(1224),
    state: Joi.string().min(2).max(64),
    city: Joi.string().min(2).max(64),
    country: Joi.string().min(2).max(4),
    pin_code: Joi.string().min(1).max(12),

})
// resend email
const resendEmail = Joi.object().keys({
    email: Joi.string().email().required(),
})

const passwordReset = Joi.object().keys({
    email: Joi.string().email().required(),
})


module.exports = {
    createUser,
    updateUserProfile,

    emailVerify,
    resendEmail,
    userLogin,
    passwordReset,
    
    updatePassword,

}