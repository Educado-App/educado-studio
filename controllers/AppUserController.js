const mongoose = require("mongoose");

const AppUser = require("../models/AppUser");

// Delete user controller
const deleteUser = async (req, res) => {
  try {
    // Finds users id and deletes it from the collection
    await AppUser.findOneAndDelete({ id: req.params._id});
    res.json({ message: "Success" });
} catch(e) {
    res.sendStatus(500)
}
};

module.exports = { deleteUser }