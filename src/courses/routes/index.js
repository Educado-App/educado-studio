const router = require('express').Router()

const { protected } = require('../../security/authentication')
const { makeExpressCallback } = require('../../helpers/express')

const { courseController } = require('../controllers')

/* Courses */
router.get('/courses', protected, makeExpressCallback(courseController))
router.get('/courses/:id', protected, makeExpressCallback(courseController))
router.post('/courses', protected, makeExpressCallback(courseController))
router.delete('/courses/:id', protected, makeExpressCallback(courseController))

/* Sections */
router.get('/courses/:id/sections')
router.get('/courses/:id/sections/:id')
router.post('/courses/:id/sections')
router.delete('/courses/:id/sections/:id')

/* Exercises */
router.get('/courses/:id/sections/:id/exercises')
router.get('/courses/:id/sections/:id/exercises/:id')
router.post('/courses/:id/sections/:id/exercises')
router.delete('/courses/:id/sections/:id/exercises/:id')


module.exports = router
