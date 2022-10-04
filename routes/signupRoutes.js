const {
  ContentCreatorApplication,
} = require("../models/ContentCreatorApplication");

const router = require("express").Router();

// Content Creator Application Route
router.post("/signup/content-creator", async (req, res) => {
  const form = req.body;

  // Validate form ...
  try {
    const doc = ContentCreatorApplication(form);
    const created = await doc.save();

    res.status(201);
    res.send(created);
  } catch (error) {
    res.status(400);
    res.send(error.message);
  }
});

module.exports = router;
