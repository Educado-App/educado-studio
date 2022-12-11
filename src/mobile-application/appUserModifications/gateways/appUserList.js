/**
  * A list over different interactions used with the database
  * 
  * Last Modified: 10-12-2022
  **/

module.exports = function makeAppUserList({ dbModel }) {

    return Object.freeze({
        add,
        findByPhone,
        findById,
        remove,
        findCourseById,
        findSectionById,
        findExerciseById,
    })


    async function add({ ...appUserModel }) {
        return await dbModel.create({
            ...appUserModel
        })
    }

    async function findByPhone(phone) {
        return await dbModel
            .findOne({ phone: phone })
    }

    async function findById(id) {
        return await dbModel.findById(id)
    }

    async function remove(id) {
        // Returns the removed document
        return await dbModel.findOneAndDelete({ _id: id })
    }

    // find the course in the user's activeCourses list
    async function findCourseById(user, courseId) {
        for (const userCourse of user.activeCourses) {
            if (userCourse.courseId == courseId) {
                // return the existing course object
                return userCourse;
            }
        }
        return null;
    }


    // find the section in the course's sections array
    async function findSectionById(course, sectionId) {
        if (!course) return null;
        for (const courseSection of course.sections) {
            if (courseSection.section == sectionId) {
                // return the existing section object
                return courseSection;
            }
        }
        return null;
    }


    // find the exercise in the section's exercises array
    async function findExerciseById(section, exerciseId) {
        for (const sectionExercise of section.exercises) {
            if (sectionExercise.exercise == exerciseId) {
                return sectionExercise;
            }
        }
        return null;
    }
}