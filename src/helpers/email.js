const config = require("../../env/config/keys")
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(config.SENDGRID_API_KEY)

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

  if (config.MAILS_DISABLED) return

  await sgMail.send({
    from,
    to,
    subject,
    text,
    html
  })
}