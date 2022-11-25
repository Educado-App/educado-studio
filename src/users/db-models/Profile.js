const mongoose = require("mongoose")
const Schema = mongoose.Schema

const profileSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    firstName: String,
    lastName: String,
    roles: [{type: Schema.Types.ObjectId, ref: "roles"}],
});

profileSchema.virtual('name').get(() => {
    return `${this.firstName} + ${this.lastName}`
})

const ProfileModel = mongoose.model("Profile", profileSchema);

module.exports = { ProfileModel }


