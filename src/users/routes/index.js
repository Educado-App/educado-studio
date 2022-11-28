const router = require('express').Router()

const { restricted } = require('../../security/authentication')
const { makeExpressCallback } = require('../../helpers/express')

const {
    groupController
} = require('../controllers')

/* profiles */

router.post('/profiles/:id/addGroup/:group', restricted, makeExpressCallback(groupController))
router.delete('/courses/:id', restricted, makeExpressCallback(groupController))

module.exports = router
