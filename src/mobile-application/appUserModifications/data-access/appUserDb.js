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
      _id: false,
      courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Courses'
      },
      isComplete: { 
        type: Boolean,
        default: false
      },

      sections: [{
        _id: false,
        section: {
          type: Schema.Types.ObjectId,
          ref: 'Sections'
        },
        isComplete: { 
          type: Boolean,
          default: false
        },
        
        exercises: [{
          _id: false,
          exercise: {
            type: Schema.Types.ObjectId,
            ref: 'Exercises'
          },
          isComplete: { 
            type: Boolean,
            default: false
          },
        }]
      }]
    }]
})

const appUserModel = mongoose.model(
  "appUser",
  AppUserSchema
)

module.exports = { appUserModel };