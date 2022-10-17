const router = require("express").Router();
const { ContentCreatorApplication } = require("../models/ContentCreatorApplication");
const Email = require('../helpers/email')

// Content Creator Application Route
router.post("/signup/content-creator", async (req, res) => {
  const form = req.body;

  // Validate form ...
  try {
    const doc = ContentCreatorApplication(form);
    const created = await doc.save();

    Email.send({
      to: created.email,
      subject: "Successfully applied for content creator status!",
      text: "Congratulations " + created.firstName + " " + created.lastName +
        "!\n\nYou have successfully applied for " +
        "content creator status! Please wait while our moderators review " +
        "your application. This can take anywhere from 1-10 days. If you haven't " +
        "heard back from us then, feel free to reach out to us! " +
        "\n\nBest regards, the Educado team"
    });

    res.status(201);
    res.send(created);
  } catch (error) {
    res.status(400);
    res.send(error.message);
  }
});

// Content Creator Application Route
router.get("/signup/content-creator/GetAllApplications", async (req, res) => {
  try {
    const listOfForm = await ContentCreatorApplication.find();
    res.json(listOfForm);

    res.status(201);
  } catch (error) {
    res.status(400);
    res.send(error.message);
  }
});

module.exports = router;
