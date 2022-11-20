const router = require("express").Router();

const { makeExpressCallback } = require('../../../helpers/express')
const { appUserController, deleteAppUser } = require('../controllers')
//const { appAuthController } = require('../../../security/authentication/controllers')
//const { appAuthService } = require('../../../security/authentication/services')


router.post("/register", makeExpressCallback(appUserController))
router.delete("/delete/:id", makeExpressCallback(deleteAppUser))
//router.post("/login", makeExpressCallback(appUserController))
//router.post('/auth/jwt', appAuthController(appAuthService))

module.exports = router;