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
let User = require('../data-access/appUserDb')
let Course = require('../../../courses/db-models/Course')
const { appUserList } = require('../gateways')
const { courseList } = require('../../../courses/gateways')


router.post("/register", makeExpressCallback(registerAppUserController))
router.delete("/delete/:id", restrictedApp, makeExpressCallback(deleteAppUserController))

// router.get('/:id', function(req, res) {
//   const id = req.params.id
//   console.log(id)
//   User.findById(id, function(err, user) {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       Course.findById(req.body.courseId, function(err, course) {
//         if (err) {
//           res.status(500).send(err);
//         } else {
//           user.activeCourses.push({
//             course: course._id,
//             completed: false
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
// router.put('/:id', function(req, res) {
//   User.findById(req.params.id, function(err, user) {
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