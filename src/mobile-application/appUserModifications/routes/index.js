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
const { courseList } = require('../../../courses/gateways/courseList')
const { sectionList } = require('../../../courses/gateways/sectionList')
const { exerciseList } = require('../../../courses/gateways/exerciseList')



router.post("/register", makeExpressCallback(registerAppUserController))
router.delete("/delete/:id",  makeExpressCallback(deleteAppUserController))

router.put("/:id/updateCourse/:courseId", async function(req, res, next) {
  try {
    const user = await appUserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // find the course in the user's activeCourses list
    let course;
    for (const userCourse of user.activeCourses) {
      if (userCourse.courseId == req.params.courseId) {
        course = userCourse; // store a reference to the existing course object
      }
    }

    // Error if course does not exists
    if (!course) {
      return res.status(404).json({
        message: 'Course not found'
      });
    }

    // set the isComplete property of the course object to true
    course.isComplete = true;

    await user.save();

    res.json(user);
  } catch (err) {
    return next(err);
  }
});

router.put("/:id/updateSection/:sectionId", async function(req, res, next) {
  try {
    const user = await appUserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // find the course in the user's activeCourses list
    let course;
    for (const userCourse of user.activeCourses) {
      if (userCourse.courseId == req.params.courseId) {
        course = userCourse; // store a reference to the existing course object
      }
    }

    // Error if course does not exists
    if (!course) {
      return res.status(404).json({
        message: 'Course not found'
      });
    }

    // set the isComplete property of the course object to true
    course.isComplete = true;

    await user.save();

    res.json(user);
  } catch (err) {
    return next(err);
  }
});

router.put("/:id/updateSection/:courseId/:sectionId", async function(req, res, next) {
  try {
    // find the user by ID
    const user = await appUserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // find the course in the user's activeCourses list
    let course;
    for (const userCourse of user.activeCourses) {
      // check if the courseId of the existing course matches the courseId of the course that the user is trying to update
      if (userCourse.courseId == req.params.courseId) {
        course = userCourse; // store a reference to the existing course object
      }
    }

    // if the course does not exist in the user's activeCourses list, return an error message
    if (!course) {
      return res.status(404).json({
        message: 'Course not found'
      });
    }

// find the section in the course's sections array
let section;
for (const courseSection of course.sections) {
  // check if the sectionId of the existing section matches the sectionId of the section that the user is trying to update
  if (courseSection.section == req.params.sectionId) { // use the correct property name here
    section = courseSection; // store a reference to the existing section object
  }
}

// if the section does not exist in the course's sections array, return an error message
if (!section) {
  return res.status(404).json({
    message: 'Section not found'
  });
}

    // update the isComplete property of the section object with the value provided by the frontend
    section.isComplete = true; // set the isComplete property to true

    // save the updated user object to the database
    await user.save();

    // return the updated user object in the response
    res.json(user);
  } catch (err) {
    return next(err);
  }
});

router.put("/:id/updateExercise/:courseId/:sectionId/:exerciseId", async function(req, res, next) {
  try {
    // find the user by ID
    const user = await appUserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // find the course in the user's activeCourses list
    const course = await findCourseById(user, req.params.courseId);
    if (!course) {
      return res.status(404).json({
        message: 'Course not found'
      });
    }

    // find the section in the course's sections array
    const section = await findSectionById(course, req.params.sectionId);
    if (!section) {
      return res.status(404).json({
        message: 'Section not found'
      });
    }

    // find the exercise in the section's exercises array
    const exercise = await findExerciseById(section, req.params.exerciseId);
    if (!exercise) {
      return res.status(404).json({
        message: 'Exercise not found'
      });
    }

    // update the isComplete property of the exercise object with the value provided by the frontend
    exercise.isComplete = true; // set the isComplete property to true

    // save the updated user object to the database
    await user.save();

    // return the updated user object in the response
    res.json(user);
  } catch (err) {
    return next(err);
  }
});

router.post('/:id/enroll/:courseId', async function(req, res, next) {
  try {
    // find the user by ID
    const user = await appUserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // find the course in the user's activeCourses list
    const existingCourse = await findCourseById(user, req.params.courseId);

    // find the course by ID and populate the sections
    const course = await CourseModel.findById(req.params.courseId).populate('sections');
    if (!course) {
      return res.status(404).json({
        message: 'Course not found'
      });
    }

    // create a new course object
    let newCourse = {
      courseId: course.id, 
      isComplete: false, 
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
        exercises: [] 
      };

      // loop through each exercise in the section and add it to the exercises array in the newSection object
      for (const exercise of foundSection.exercises) {
        newSection.exercises.push({
          exercise: exercise.id,
          isComplete: false 
        });
      }

      newCourse.sections.push(newSection);
    }

// if the course does not already exist in the user's activeCourses list, push the new course object to the activeCourses array in the user object
if (!existingCourse) {
  user.activeCourses.push(newCourse);
} else {
  // if the course already exists, update the existing course object with the new information
  existingCourse.sections = newCourse.sections;
}

// save the updated user object to the database
await user.save();

// return the updated user object in the response
if (!existingCourse) {
  // if the course does not already exist, return the updated user object with the new course information
  res.json(user);
} else {
  // if the course already exists, return the existing course information
  res.json({
    course: {
    id: existingCourse.courseId,
    isComplete: existingCourse.isComplete,
    sections: existingCourse.sections.map(section => {
      return {
        id: section.section,
        isComplete: section.isComplete,
        exercises: section.exercises.map(exercise => {
          return {
            id: exercise.exercise,
            isComplete: exercise.isComplete
          };
        })
      };
    })
  }
  });
}
  } catch (err) {
    return next(err);
  }
});

// find the course in the user's activeCourses list
async function findCourseById(user, courseId) {
  for (const userCourse of user.activeCourses) {
    if (userCourse.courseId == courseId) {
      // return the existing course object
      return userCourse; 
    }
  }
  return null;
}

// find the section in the course's sections array
async function findSectionById(course, sectionId) {
  if (!course) return null;
  for (const courseSection of course.sections) {
    if (courseSection.section == sectionId) {
      // return the existing section object
      return courseSection; 
    }
  }
  return null;
}

// find the exercise in the section's exercises array
async function findExerciseById(section, exerciseId) {
  for (const sectionExercise of section.exercises) {
    if (sectionExercise.exercise == exerciseId) {
      return sectionExercise;
    }
  }
  return null;
}


module.exports = router;