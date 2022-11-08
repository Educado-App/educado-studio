const router = require("express").Router();

const { makeExpressCallback } = require('../../helpers/express')
const { contentCreatorApplicationController } = require('../controllers')

router.get("/applications", makeExpressCallback(contentCreatorApplicationController))
router.get("/applications/:id", makeExpressCallback(contentCreatorApplicationController))
router.post("/applications", makeExpressCallback(contentCreatorApplicationController))
router.put("/applications/:id", makeExpressCallback(contentCreatorApplicationController))

module.exports = router;