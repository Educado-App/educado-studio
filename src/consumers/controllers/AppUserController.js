const AppUser = require("../models/AppUser");

// Delete user controller
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await AppUser.findByIdAndDelete(id);
    if (!user) {
      return res.status(400).json("User not found");
    }
    res.status(200).json("User deleted successfully");
  } catch(e) {
  res.sendStatus(500);
  }
};

module.exports = { deleteUser }