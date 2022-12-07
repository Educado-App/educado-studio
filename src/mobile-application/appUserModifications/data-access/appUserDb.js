// /**
//   * data-access for an app user
//   * 
//   * Last Modified: 10-11-2022
//   **/

// Mongoose model class for User
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Class description
const AppUserSchema = new Schema({
    phone: { 
        type: String,
    },
    username: { type: String, unique: false },
    salt: { type: String },
    hash: { type: String },
    createdAt: { type: String },

    activeCourses: [{
      course: {
        type: Schema.Types.ObjectId,
        ref: 'Courses'
      },
      completed: Boolean,

      sections: [{
        section: {
          type: Schema.Types.ObjectId,
          ref: 'Sections'
        },
        completed: Boolean,
        
        exercises: [{
          exercise: {
            type: Schema.Types.ObjectId,
            ref: 'Exercises'
          },
          completed: Boolean
        }]
      }]
    }]
})

const appUserModel = mongoose.model(
  "appUser",
  AppUserSchema
)

module.exports = { appUserModel };