/**
  * Index for all routes
  * 
  * Last Modified: 30-11-2022
  **/

const router = require("express").Router();

const { makeExpressCallback } = require('../../../helpers/express')

// Gets the controllers
const { registerAppUserController, deleteAppUserController } = require('../controllers')

// This can be used to restrict any routes
// User needs to be logged int
const { restrictedApp } = require('../../appSecurity')


router.post("/register", makeExpressCallback(registerAppUserController))
router.delete("/delete/:id", restrictedApp, makeExpressCallback(deleteAppUserController))

module.exports = router;