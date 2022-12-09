/**
  * Index for all routes
  * 
  * Last Modified: 30-11-2022
  **/

const router = require("express").Router();

const { makeExpressCallback } = require('../../../helpers/express')

// Gets the controllers
const { registerAppUserController, deleteAppUserController } = require('../controllers')

// This can be used to restrict any routes
// User needs to be logged in
const { restrictedApp } = require('../../appSecurity')
const { appUserModel } = require('../data-access/appUserDb')
const { CourseModel } = require('../../../courses/db-models/Course')
const { SectionModel } = require('../../../courses/db-models/Section')



router.post("/register", makeExpressCallback(registerAppUserController))
router.delete("/delete/:id",  makeExpressCallback(deleteAppUserController))


router.post('/:id/enroll/:courseId', async function(req, res, next) {
  try {
    // find the user by ID
    const user = await appUserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // find the course by ID and populate the sections
    const course = await CourseModel.findById(req.params.courseId).populate('sections');
    if (!course) {
      return res.status(404).json({
        message: 'Course not found'
      });
    }

    // check if the user already has the course in their activeCourses list
    let courseAlreadyExists = false;
    let existingCourse;
    for (const userCourse of user.activeCourses) {
      // check if the courseId of the existing course matches the courseId of the course that the user is trying to enroll in
      if (userCourse.courseId == req.params.courseId) {
        existingCourse = userCourse; // store a reference to the existing course object
        courseAlreadyExists = true;
      }
    }

    // create a new course object
    let newCourse = {
      courseId: course, // update the property name to match the courseId parameter in the request
      isComplete: false, // add the isComplete property to the newCourse object
      sections: []
    };

    // loop through each section in the course
    for (const section of course.sections) {
      // find the section object from the SectionModel
      const foundSection = await SectionModel.findById(section.id).populate('exercises');

      // create a new section object that includes the ID and exercises for the section, and add it to the sections array in the newCourse object
      let newSection = {
        section: foundSection.id,
        isComplete: false,
        exercises: [] // initialize the exercises array
      };

      // loop through each exercise in the section and add it to the exercises array in the newSection object
      for (const exercise of foundSection.exercises) {
        newSection.exercises.push({
          exercise: exercise.id, // add the exercise ID to the object
          isComplete: false // set isComplete to false by default
        });
      }

      newCourse.sections.push(newSection);
    }

    // if the course does not already exist in the user's activeCourses list, push the new course object to the activeCourses array in the user object
    if (!courseAlreadyExists) {
      user.activeCourses.push(newCourse);
    } else {
      // if the course already exists, update the existing course object with the new information
      existingCourse.sections = newCourse.sections;
    }

    // save the updated user object to the database
    await user.save();

    // return the updated user object in the response
    res.json(user);
  } catch (err) {
    return next(err);
  }
});


module.exports = router;