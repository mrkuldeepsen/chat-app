const { nodemailer } = require("../modules/module")



exports.sendMailer = async (email, subject, message, res) => {
    const transporter = nodemailer.createTransport({
        host: `${process.env.EMAIL_HOST}`,
        port: `${process.env.EMAIL_PORT}`,
        auth: {
            user: `${process.env.EMAIL_USER}`,
            pass: `${process.env.EMAIL_PASSWORD}`
        },
        // secure: false
    })

    const data = {
        from: `${process.env.EMAIL_FROM}`,
        to: `${email}`,
        subject: `${subject} - Chat App`,
        html: `${message}`,
    }

    transporter.sendMail(data, (error, info) => {
        if (error) {
            // console.log('error>>>>>>', error);
            res.status(error.responseCode).send(error)
        }
    })

    return
}