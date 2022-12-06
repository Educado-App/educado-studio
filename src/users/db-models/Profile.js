const mongoose = require("mongoose")
const Schema = mongoose.Schema

const profileSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    firstName: String,
    lastName: String,
    groups: [{type: Schema.Types.ObjectId, ref: "Role"}],
    courseMember: [{
        course: { type: Schema.Types.ObjectId, ref: "Course" },
        role: { type: Schema.Types.ObjectId, ref: "Role" }
    }],
    institution: [{
        name: { type: String },
        domain: {},
        address: [{
            email: { type: String },
            address: { type: String }
        }],
        role: { type: Schema.Types.ObjectId, ref: "Role" },
    }]
});

const ProfileModel = mongoose.model("Profile", profileSchema);

module.exports = { ProfileModel }


