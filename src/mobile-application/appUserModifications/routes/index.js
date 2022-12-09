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

const { CourseModel } = require('../../../courses/db-models/Course')
const { SectionModel } = require('../../../courses/db-models/Section')
const { appUserList } = require('../gateways')



router.post("/register", makeExpressCallback(registerAppUserController))
router.delete("/delete/:id",  makeExpressCallback(deleteAppUserController))

router.put("/:id/updateCourse/:courseId", async function(req, res, next) {
  try {
    const user = await appUserList.findById(req.params.id);
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
    const user = await appUserList.findById(req.params.id);
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

    // update isComplete of the course with true
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
    const user = await appUserList.findById(req.params.id);
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

    // update isComplete of the section with true
    section.isComplete = true; 
    await user.save();

    res.json(user);
  } catch (err) {
    return next(err);
  }
});


// If user completes an exercise it will update its isComplete status in the user document
router.put("/:id/updateExercise/:courseId/:sectionId/:exerciseId", async function(req, res, next) {
  try {
    const user = await appUserList.findById(req.params.id);
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

    // update isComplete of the exercise with true
    exercise.isComplete = true;
    await user.save();

    res.json(user);
  } catch (err) {
    return next(err);
  }
});


// When user downloads a course on the app it will update their user document
// to contain the course id and completion. It will also contain all the connected
// sections and exercises to that id and their completion status.
// If the user tries to download it again, it should return the course, section, 
// and exercises and their completion status so they can continue where they left off.
router.post('/:id/enroll/:courseId', async (req, res, next) => {
  try {
    const { id, courseId } = req.params;
    const user = await appUserList.findById(id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // find the course in the user's activeCourses list
    const existingCourse = await findCourseById(user, req.params.courseId);

    // find the course by ID and populate the sections
    const course = await CourseModel.findById(courseId).populate('sections');
    if (!course) {
      return res.status(404).json({
        message: 'Course not found'
      });
    }

    // create a new course object
    const newCourse = {
      courseId: course.id, 
      isComplete: false, 
      sections: []
    };

    // loop through each section in the course
    for (const section of course.sections) {
      const foundSection = await SectionModel.findById(section.id).populate('exercises');

      // create a new section object
      const newSection = {
        section: foundSection.id,
        isComplete: false,
        exercises: [] 
      };

      // loop through each exercise in the section and add it to the exercises 
      // array in the newSection object
      for (const exercise of foundSection.exercises) {
        newSection.exercises.push({
          exercise: exercise.id,
          isComplete: false 
        });
      }

      newCourse.sections.push(newSection);
    }

    if (!existingCourse) {
      user.activeCourses.push(newCourse);
    } else {
      // if the course already exists, update the existing course object with the new information
      existingCourse.sections = newCourse.sections;
    }

    // save the updated user object to the database
    await user.save();

if (!existingCourse) {
    return res.json(user);
} else {
    // if the course already exists, return the existing course information
    return res.json({
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