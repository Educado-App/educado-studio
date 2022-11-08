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

/**
 * @swagger
 * /public/courses:
 *   get:
 *     summary: Retrieve a list of all courses
 *     tags:
 *      - courses
 *     parameters:
 *       - in: query
 *         name: author
 *         description: Finds courses by this author. Provide id of author
 *         example: 635dacde991d8c6da796a1c5
 * 
 *       - in: query
 *         name: category
 *         description: Finds courses of this category. Provide id of category
 *         example: 6368c4ed71e079ae8d537eb9
 * 
 *         $ref: '../../docs/components.json#/parameters/sortBy'
 *       
*/
router.get('/public/courses', makeExpressCallback(publicCourseController))

/**
 * @swagger
 * /api/public/courses{courseId}:
 *   get:
 *     summary: Retrieve a single course
 *     tags:
 *      - courses
 *     description: Retrieves a whole course including its sections and exercises
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
*/
router.get('/public/courses/:id', makeExpressCallback(publicCourseController))

router.get('/courses', protected, makeExpressCallback(courseController))
router.get('/courses/:id', protected, makeExpressCallback(courseController))
router.post('/courses', protected, makeExpressCallback(courseController))
router.put('/courses', protected, makeExpressCallback(courseController))
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
