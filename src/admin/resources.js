/* 
 *   Import your mongoose model and insert it into the resurce list to have it registered in
 *   the admin panel
*/

const { UserModel, ProfileModel } = require("../users/db-models");
const { CourseModel, SectionModel, ExerciseModel, CategoryModel } = require('../courses/db-models')
const { ContentCreatorApplication } = require('../onboarding/db-models')


module.exports = [
    CategoryModel,
    UserModel,
    ProfileModel,
    CourseModel,
    SectionModel,
    ExerciseModel,
    ContentCreatorApplication,
]