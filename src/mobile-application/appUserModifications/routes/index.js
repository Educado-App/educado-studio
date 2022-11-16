const router = require("express").Router();

const { makeExpressCallback } = require('../../../helpers/express')
const { appUserController } = require('../controllers')


router.post("/register", makeExpressCallback(appUserController))
router.post("/login", makeExpressCallback(appUserController))

module.exports = router;


// router.post("/api/eml/register", async (req, res) => {
//     const { phone, password } = req.body;
//     const appUser = new appUserModel({
//         phone: phone,
//         password: password,
//         date: "today"
//     })
//     try {
//         await appUser.save();
//         res.send(appUser);
//       } catch (err) {
//         res.status(422).send(err);
//       }
// })

 module.exports = router;


/*
// Content Creator Application Route
router.post("/course/", async (req, res) => {
    const { title, description } = req.body;
  
    const course = new CourseModel({
      title: title,
      description: description,
      category: "",
      _user: req.user.id,
      dateCreated: Date.now(),
      dateUpdated: Date.now(),
      sections: [],
    });
  
    try {
      await course.save();
      res.send(course);
    } catch (err) {
      res.status(422).send(err);
    }
  });
  
  // Course routes
  
  router.post("/courses", async (req, res) => {
    const { title, description } = req.body;
  
    const course = new CourseModel({
      title: title,
      description: description,
      category: "",
      _user: req.user.id,
      dateCreated: Date.now(),
      dateUpdated: Date.now(),
      sections: [],
    });

    */