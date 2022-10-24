const router = require('express').Router()

const { makeExpressCallback } = require('../../helpers/express')

router.get('/courses')
router.get('/courses/:id')
router.get('/courses/:id/sections')
router.get('/courses/:id/sections/:id')
router.get('/courses/:id/sections/:id/exercises')
router.get('/courses/:id/sections/:id/exercises/:id')

router.post('/courses')
router.post('/courses/:id/sections')
router.post('/courses/:id/sections/:id/exercises')

router.delete('/courses/:id')
router.delete('/courses/:id/sections/:id')
router.delete('/courses/:id/sections/:id/exercises/:id')


module.exports = router
