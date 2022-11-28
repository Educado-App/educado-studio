const mongoose = require("mongoose")
const Schema = mongoose.Schema

const profileSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    firstName: String,
    lastName: String,
})

const ProfileModel = mongoose.model("Profile", profileSchema);

module.exports = { ProfileModel }


