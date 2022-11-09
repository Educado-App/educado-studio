const router = require("express").Router();

const { makeExpressCallback } = require('../helpers/express')
const { registerNewAppUser } = require('../controllers/appUsers')

module.exports = (app) => {

    app.post('/api/eml/register', makeExpressCallback(registerNewAppUser))

}

//module.exports = router;