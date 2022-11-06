const router = require('express').Router()

const { protected } = require('../../security/authentication')
const { makeExpressCallback } = require('../../helpers/express')

const { 
    publicCourseController, 
    courseController, 
    sectionController, 
    reorderSectionsController,
    exerciseController, 
} = require('../controllers')


/* Courses */
router.get('/public/courses', makeExpressCallback(publicCourseController))
router.get('/public/courses/:id', makeExpressCallback(publicCourseController))

router.get('/courses', protected, makeExpressCallback(courseController))
router.get('/courses/:id', protected, makeExpressCallback(courseController))
router.post('/courses', protected, makeExpressCallback(courseController))
router.delete('/courses/:id', protected, makeExpressCallback(courseController))

/* Sections */
router.get('/courses/:cid/sections', protected, makeExpressCallback(sectionController))
router.get('/courses/:cid/sections/:sid', protected, makeExpressCallback(sectionController))
router.post('/courses/:cid/sections', protected, makeExpressCallback(sectionController))
router.delete('/courses/:cid/sections/:sid', protected, makeExpressCallback(sectionController))
router.put('/courses/:cid/sections/reorder', protected, makeExpressCallback(reorderSectionsController))

/* Exercises */
router.get('/courses/:cid/sections/:sid/exercises', protected, makeExpressCallback(exerciseController))
router.get('/courses/:cid/sections/:sid/exercises/:eid', protected, makeExpressCallback(exerciseController))
router.post('/courses/:cid/sections/:sid/exercises', protected, makeExpressCallback(exerciseController))
router.delete('/courses/:cid/sections/:sid/exercises/:eid', protected, makeExpressCallback(exerciseController))


module.exports = router
