const { profileList } = require("../../../src/users/gateways")
const { sectionList, courseList } = require("../../../src/courses/gateways")

async function setupCourse(course) {

    /* Adds author */
    await profileList.add(course.author)

    /* Adds sections */
    course.sections.forEach(async (section) => await sectionList.add)

    /* Adds Course */
    await courseList.add(course)
}

async function teardownCourse(course) {

    /* Removes author */
    await profileList.remove(course.author)

    /* Removes sections */
    course.sections.forEach(async (section) => await sectionList.remove)

    /* Removes course */
    await courseList.remove(course)

}

module.exports = { setupCourse, teardownCourse }