const router = require('express').Router()

const { protected } = require('../../security/authentication')
const { makeExpressCallback } = require('../../helpers/express')

const { courseController, publicCourseController, sectionController, exerciseController } = require('../controllers')

/* Courses */
router.get('/public/courses', makeExpressCallback(publicCourseController))

router.get('/courses', protected, makeExpressCallback(courseController))
router.get('/courses/:id', protected, makeExpressCallback(courseController))
router.post('/courses', protected, makeExpressCallback(courseController))
router.delete('/courses/:id', protected, makeExpressCallback(courseController))

/* Sections */
router.get('/courses/:id/sections')
router.get('/courses/:id/sections/:id', protected, makeExpressCallback(sectionController))
router.post('/courses/:id/sections')
router.delete('/courses/:id/sections/:id')

/* Exercises */
router.get('/courses/:id/sections/:id/exercises', protected, makeExpressCallback(exerciseController))
router.get('/courses/:cid/sections/:sid/exercises/:id', protected, makeExpressCallback(exerciseController))
router.post('/courses/:cid/sections/:sid/exercises', protected, makeExpressCallback(exerciseController))
router.delete('/courses/:id/sections/:id/exercises/:eid', protected, makeExpressCallback(exerciseController))


module.exports = router
