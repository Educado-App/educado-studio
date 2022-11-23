const router = require("express").Router();

const { makeExpressCallback } = require('../../../helpers/express')
const { registerAppUserController, deleteAppUserController } = require('../controllers')
//const { appAuthController } = require('../../../security/authentication/controllers')
//const { appAuthService } = require('../../../security/authentication/services')


router.post("/register", makeExpressCallback(registerAppUserController))
router.delete("/delete/:id", makeExpressCallback(deleteAppUserController))
//router.post("/login", makeExpressCallback(appUserController))
//router.post('/auth/jwt', appAuthController(appAuthService))

module.exports = router;