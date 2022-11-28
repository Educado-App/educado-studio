const router = require("express").Router();

const { makeExpressCallback } = require('../../../helpers/appExpress')
const { registerAppUserController, deleteAppUserController } = require('../controllers')
const { restrictedApp } = require('../../appSecurity')


router.post("/register", makeExpressCallback(registerAppUserController))
router.delete("/delete/:id", restrictedApp, makeExpressCallback(deleteAppUserController))

module.exports = router;