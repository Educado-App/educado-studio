const mongoose = require("mongoose")
const Schema = mongoose.Schema

const profileSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    firstName: String,
    lastName: String,
    groups: [{type: Schema.Types.ObjectId, ref: "Role"}],
    courseMember: [{
        course: { type: Schema.Types.ObjectId, ref: "course" },
        role: [{
            _id: { type: Schema.Types.ObjectId, ref: "role" },
            name: { type: String }
        }]
    }],
    institution: [{
        name: { type: String },
        domain: {},
        address: [{
            email: { type: String },
            address: { type: String }
        }],
        role: [{
            _id: { type: Schema.Types.ObjectId, ref: "role" },
            name: { type: String }
        }],
    }]
});

profileSchema.virtual('name').get(() => {
    return `${this.firstName} + ${this.lastName}`
})

const ProfileModel = mongoose.model("Profile", profileSchema);

module.exports = { ProfileModel }


