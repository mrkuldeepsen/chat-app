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

exports.createToken = () => {
    var dt = new Date().getTime()
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0
        dt = Math.floor(dt / 16)
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })

    return uuid

}