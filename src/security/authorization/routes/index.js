const router = require('express').Router()

const { restricted } = require('../../authentication')
const { makeExpressCallback } = require('../../../helpers/express')

const {
    roleController
} = require('../controllers')

/* Roles */
router.get('/roles', restricted, makeExpressCallback(roleController))
router.get('/roles/:id', restricted, makeExpressCallback(roleController))

module.exports = router
