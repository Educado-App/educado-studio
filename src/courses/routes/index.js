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
const { ValidationError } = require('../../helpers/error')
const { exerciseList } = require('../gateways')
const Id = require('../../helpers/id')



/* Courses */
router.get('/public/courses', makeExpressCallback(publicCourseController))
router.get('/public/courses/:id', makeExpressCallback(publicCourseController))

router.get('/courses', restricted, makeExpressCallback(courseController))
router.delete('/courses/:id', restricted, makeExpressCallback(courseController))
router.post('/courses', restricted, makeExpressCallback(courseController))
router.get('/courses/:id', restricted, makeExpressCallback(courseController))
router.put('/courses/:id', restricted, makeExpressCallback(courseController))
router.get('/errorTest1', makeExpressCallback((httpRequest) => {
    throw new Error("Should result in programming error")
}))
router.get('/errorTest2', makeExpressCallback((httpRequest) => {
    throw new ValidationError("Should result in operational error")
}))
router.get('/errorTest3', makeExpressCallback((httpRequest) => {
    // Should also end up restarting application
    someVariableThatIsDefinetlyNotDefined
}))
router.get('/errorTest4', makeExpressCallback(async (httpRequest) => {
    return await exerciseList.findById(Id.makeId())
}))

/* Sections */
router.get('/sections/:sid', restricted, makeExpressCallback(sectionController))
router.put('/sections/:sid', restricted, makeExpressCallback(sectionController))
router.delete('/sections/:sid', restricted, makeExpressCallback(sectionController))
router.get('/courses/:cid/sections', restricted, makeExpressCallback(sectionController))
router.get('/courses/:cid/sections/:sid', restricted, makeExpressCallback(sectionController))
router.post('/courses/:cid/sections', restricted, makeExpressCallback(sectionController))
router.put('/sections/reorder', restricted, makeExpressCallback(reorderSectionsController))


/* Exercises */
router.get('/exercises/:eid', restricted, makeExpressCallback(exerciseController))
router.put('/exercises/:eid', restricted, makeExpressCallback(exerciseController))
router.delete('/exercises/:eid', restricted, makeExpressCallback(exerciseController))
router.post('/sections/:sid/exercises', restricted, makeExpressCallback(exerciseController))
router.get('/courses/:cid/sections/:sid/exercises', restricted, makeExpressCallback(exerciseController))
router.get('/courses/:cid/sections/:sid/exercises/:eid', restricted, makeExpressCallback(exerciseController))

module.exports = router
