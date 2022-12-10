/**
  * Index for all routes
  * 
  * Last Modified: 30-11-2022
  **/

const router = require("express").Router();

const { makeExpressCallback } = require('../../../helpers/express')

// Gets the controllers
const { registerAppUserController, deleteAppUserController } = require('../controllers')
const enrollCourseController = require('../controllers/enrollCourseController')
const updateCourseStatusController = require('../controllers/updateCourseStatusController')
const updateExerciseStatusController = require('../controllers/updateExerciseStatusController')
const updateSectionStatusController = require('../controllers/updateSectionStatusController')

// This can be used to restrict any routes
// User needs to be logged in
const { restrictedApp } = require('../../appSecurity')

router.post("/register", makeExpressCallback(registerAppUserController))
router.delete("/delete/:id", makeExpressCallback(deleteAppUserController))

router.put("/:id/updateCourse/:courseId",
	updateCourseStatusController.updateCourseStatus)

router.put("/:id/updateSection/:courseId/:sectionId",
	updateSectionStatusController.updateSectionStatus)

router.put('/:id/updateExercise/:courseId/:sectionId/:exerciseId',
	updateExerciseStatusController.updateExerciseStatus)

router.post('/:id/enroll/:courseId', enrollCourseController.enrollInCourse)


module.exports = router;