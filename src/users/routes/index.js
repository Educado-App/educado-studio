const router = require('express').Router()

const { restricted } = require('../../security/authentication')
const { makeExpressCallback } = require('../../helpers/express')

const { groupController, profileController } = require('../controllers')
const { passwordManagerController } = require('../../security/authentication/controllers')


router.put('/user/changePassword', restricted, makeExpressCallback(passwordManagerController))
router.get('/profiles/:id', restricted, makeExpressCallback(profileController))
router.put('/profiles/:id', restricted, makeExpressCallback(profileController))
router.post('/profiles/:id/addGroup/:group', restricted, makeExpressCallback(groupController))

module.exports = router
