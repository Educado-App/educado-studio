const router = require('express').Router()

const { restricted } = require('../../security/authentication')
const { makeExpressCallback } = require('../../helpers/express')

const {
    publicCourseController,
    courseController,
    sectionController,
    reorderSectionsController,
    exerciseController,
} = require('../controllers')


router.get('/public/courses', makeExpressCallback(publicCourseController))
router.get('/public/courses/:id', makeExpressCallback(publicCourseController))

router.get('/courses', restricted, makeExpressCallback(courseController))
router.get('/courses/:id', restricted, makeExpressCallback(courseController))
router.post('/courses', restricted, makeExpressCallback(courseController))
router.put('/courses', restricted, makeExpressCallback(courseController))
router.delete('/courses/:id', restricted, makeExpressCallback(courseController))
router.put('/courses/:id', restricted, makeExpressCallback(courseController))

/* Sections */
router.get('/courses/:cid/sections', restricted, makeExpressCallback(sectionController))
router.get('/courses/:cid/sections/:sid', restricted, makeExpressCallback(sectionController))
router.post('/courses/:cid/sections', restricted, makeExpressCallback(sectionController))
router.delete('/courses/:cid/sections/:sid', restricted, makeExpressCallback(sectionController))
router.put('/courses/:cid/sections/:sid', restricted, makeExpressCallback(sectionController))
router.put('/courses/:cid/sections/reorder', restricted, makeExpressCallback(reorderSectionsController))

/* Exercises */
router.get('/courses/:cid/sections/:sid/exercises', restricted, makeExpressCallback(exerciseController))
router.get('/courses/:cid/sections/:sid/exercises/:eid', restricted, makeExpressCallback(exerciseController))
router.post('/courses/:cid/sections/:sid/exercises', restricted, makeExpressCallback(exerciseController))
router.delete('/courses/:cid/sections/:sid/exercises/:eid', restricted, makeExpressCallback(exerciseController))
router.put('/courses/:cid/sections/:sid/exercises/:eid', restricted, makeExpressCallback(exerciseController))

module.exports = router
