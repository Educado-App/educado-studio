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
// User needs to be logged int
const { restrictedApp } = require('../../appSecurity')
const { appUserModel } = require('../data-access/appUserDb')
const { CourseModel } = require('../../../courses/db-models/Course')
const { SectionModel } = require('../../../courses/db-models/Section')
const { ExerciseModel } = require('../../../courses/db-models/Exercise')
const { appUserList } = require('../gateways')
const { courseList } = require('../../../courses/gateways')


router.post("/register", makeExpressCallback(registerAppUserController))
router.delete("/delete/:id", restrictedApp, makeExpressCallback(deleteAppUserController))

// router.param('id', function(req, res, next, id) {
//   var query = User.findById(id);
//   query.exec(function(err, id) {
//     if (err) {
//       return next(err);
//     }
//     if (!id) {
//       return next(new Error('can\'t find user'));
//     }
//     req.id = id;
//     return next();
//   });
// });

// router.put('/:id/enroll', function(req, res, next) {
//   const user = req.params.id
//   user.findById()
//   req.id.courses.push({
//     courseId: req.body.courseId
//   });
//   req.id.save(function(err, id) {
//     if (err) {
//       return next(err);
//     }
//     res.json(id);
//   });
// });

// router.get('/:id/enroll', function(req, res) {
//   const id = req.params.id
//   console.log(id)
//   appUserModel.findById(id, function(err, user) {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       CourseModel.findById(req.body.courseId, function(err, course) {
//         if (err) {
//           res.status(500).send(err);
//         } else {
//           user.activeCourses.push({
//             course: course._id,
//             isCompleted: false
//           });
//           user.save(function(err, user) {
//             if (err) {
//               res.status(500).send(err);
//             } else {
//               res.send(user);
//             }
//           });
//         }
//       });
//     }
//   });
// });

router.get('/:id/enroll', function(req, res, next) {
  var userId = req.params.id;
  var courseId = req.body.courseId;
  var sectionId = req.body.sectionId;
  var exerciseId = req.body.exerciseId;
  appUserModel.findById(userId, function(err, user) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!user) {
      return res.status(500).json({
        title: 'No User Found!',
        error: {message: 'User not found'}
      });
    }
    CourseModel.findById(courseId, function(err, course) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      if (!course) {
        return res.status(500).json({
          title: 'No Course Found!',
          error: {message: 'Course not found'}
        });
      }
      var courseObj = {
        courseId: course._id,
        completed: false
      };
      user.activeCourses.push(courseObj);
      user.save(function(err, result) {
        if (err) {
          return res.status(500).json({
            title: 'An error occurred',
            error: err
          });
        }
        SectionModel.find({courseId: courseId}, function(err, sections) {
          if (err) {
            return res.status(500).json({
              title: 'An error occurred',
              error: err
            });
          }
          if (!sections) {
            return res.status(500).json({
              title: 'No Sections Found!',
              error: {message: 'Sections not found'}
            });
          }
          sections.forEach(function(section) {
            var sectionObj = {
              sectionId: section._id,
              completed: false
            };
            user.activeCourses[user.activeCourses.length - 1].sections.push(sectionObj);
            user.save(function(err, result) {
              if (err) {
                return res.status(500).json({
                  title: 'An error occurred',
                  error: err
                });
              }
              ExerciseModel.find({sectionId: section._id}, function(err, exercises) {
                if (err) {
                  return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                  });
                }
                if (!exercises) {
                  return res.status(500).json({
                    title: 'No Exercises Found!',
                    error: {message: 'Exercises not found'}
                  });
                }
                exercises.forEach(function(exercise) {
                  var exerciseObj = {
                    exerciseId: exercise._id,
                    completed: false
                  };
                  user.activeCourses[user.activeCourses.length - 1].sections[user.activeCourses[user.activeCourses.length - 1].sections.length - 1].exercises.push(exerciseObj);
                  user.save(function(err, result) {
                    if (err) {
                      return res.status(500).json({
                        title: 'An error completed',
                        error: err
                      });
                    }
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

// router.put('/:id/enroll', function(req, res) {
  
//   appUserModel.findById(req.params.id, function(err, user) {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       user.activeCourses.forEach(function(course) {
//         if (course.course.toString() === req.body.courseId) {
//           course.completed = req.body.isComplete;
//         }
//       });
//       user.save(function(err, user) {
//         if (err) {
//           res.status(500).send(err);
//         } else {
//           res.send(user);
//         }
//       });
//     }
//   });
// });

module.exports = router;