/**
  * Controller for enrolling in a course
  * When user downloads a course on the app it will update their user document
  * to contain the course id and completion. It will also contain all the connected
  * sections and exercises to that id and their completion status.
  * If the user tries to download it again, it should return the course, section, 
  * and exercises and their completion status so they can continue where they left off.
  * 
  * Last Modified: 10-12-2022
  **/

const { CourseModel } = require('../../../courses/db-models/Course')
const { SectionModel } = require('../../../courses/db-models/Section')
const { appUserList } = require('../gateways')

exports.enrollInCourse = async function (req, res, next) {
    try {
        const { id, courseId } = req.params;
        const user = await appUserList.findById(id)
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        // find the course in the user's activeCourses list
        const existingCourse = await appUserList.findCourseById(user, req.params.courseId)

        // find the course by ID and populate the sections
        const course = await CourseModel.findById(courseId).populate('sections')
        if (!course) {
            return res.status(404).json({
                message: 'Course not found'
            })
        }

        // create a new course object
        const newCourse = {
            courseId: course.id,
            isComplete: false,
            sections: []
        }

        // loop through each section in the course
        for (const section of course.sections) {
            const foundSection = await SectionModel.findById(section.id).populate('exercises')

            // create a new section object
            const newSection = {
                section: foundSection.id,
                isComplete: false,
                exercises: []
            }

            // loop through each exercise in the section and add it to the exercises 
            // array in the newSection object
            for (const exercise of foundSection.exercises) {
                newSection.exercises.push({
                    exercise: exercise.id,
                    isComplete: false
                })
            }

            newCourse.sections.push(newSection)
        }

        if (!existingCourse) {
            user.activeCourses.push(newCourse)
        } else {
            // if the course already exists, update the existing course object with the new information
            existingCourse.sections = newCourse.sections
        }

        // save the updated user object to the database
        await user.save()

        if (!existingCourse) {
            return res.json(user)
        } else {
            // if the course already exists, return the existing course information
            return res.json({
                course: {
                    id: existingCourse.courseId,
                    isComplete: existingCourse.isComplete,
                    sections: existingCourse.sections.map(section => {
                        return {
                            id: section.section,
                            isComplete: section.isComplete,
                            exercises: section.exercises.map(exercise => {
                                return {
                                    id: exercise.exercise,
                                    isComplete: exercise.isComplete
                                }
                            })
                        }
                    })
                }
            })
        }
    } catch (err) {
        return next(err)
    }

}
