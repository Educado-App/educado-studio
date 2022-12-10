/**
  * Controller for updating an exercise isComplete status
  * 
  * Last Modified: 10-12-2022
  **/

const { appUserList } = require('../gateways')

exports.updateExerciseStatus = async function (req, res, next) {
	try {
		const user = await appUserList.findById(req.params.id)
		if (!user) {
			return res.status(404).json({
				message: 'User not found'
			})
		}

		// find the course in the user's activeCourses list
		const course = await appUserList.findCourseById(user, req.params.courseId)
		if (!course) {
			return res.status(404).json({
				message: 'Course not found'
			})
		}

		// find the section in the course's sections array
		const section = await appUserList.findSectionById(course, req.params.sectionId)
		if (!section) {
			return res.status(404).json({
				message: 'Section not found'
			})
		}

		// find the exercise in the section's exercises array
		const exercise = await appUserList.findExerciseById(section, req.params.exerciseId)
		if (!exercise) {
			return res.status(404).json({
				message: 'Exercise not found'
			})
		}

		// update isComplete of the exercise with true
		exercise.isComplete = true

		// find the index of the exercise and update
		const exerciseIndex = section.exercises.findIndex(e => e._id == exercise._id)
		section.exercises[exerciseIndex] = exercise

		const sectionIndex = course.sections.findIndex(s => s._id == section._id)
		course.sections[sectionIndex] = section

		user.activeCourses[req.params.courseId] = course

		await user.save()

		res.json(user)
	} catch (err) {
		return next(err)
	}

}
