const nodemailer = require("nodemailer")
const config = require("../../env/config/keys")


module.exports = Object.freeze({
  isValid,
  send: sendMail
})

function isValid(email) {
  const regEx = new RegExp("^[0-9a-zA-Z.]+@[a-zA-Z]+.[a-zA-Z]{2,4}")
  return regEx.test(email)
}


async function sendMail({
  subject,
  from = config.outlookUser,
  to,
  text,
  html
}) {

  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      type: "login",
      user: config.outlookUser,
      pass: config.outlookPass,

    },
    tls: {
      rejectUnauthorized: false,
    }
  })

  const mailOptions = {
    subject: subject,
    from: from,
    to: to,
    text: text,
    html: html
  }
  
  if (config.MAILS_DISABLED) return

  await transporter.sendMail(mailOptions)
}




