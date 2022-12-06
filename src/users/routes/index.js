const router = require('express').Router()

const { restricted } = require('../../security/authentication')
const { makeExpressCallback } = require('../../helpers/express')

const { groupController, profileController } = require('../controllers')
const { passwordManagerController } = require('../../security/authentication/controllers')


// Public profile routes
router.get('/public/profiles/:id', restricted, makeExpressCallback(profileController))

// Private profile routes
router.get('/profile/whoami', restricted, makeExpressCallback(profileController))
router.put('/profile/changePassword', restricted, makeExpressCallback(passwordManagerController))
router.put('/profile', restricted, makeExpressCallback(profileController))

router.post('/profiles/:id/addGroup/:group', restricted, makeExpressCallback(groupController))

module.exports = router
