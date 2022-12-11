const { profileList } = require("../../../src/users/gateways")
const { sectionList, courseList, categoryList } = require("../../../src/courses/gateways")

/**
 * Sets up all the relations necasarry to have a single course in the database
 * 
 * @return the course that got setup
 */
async function setupCourse(course) {

    /* Adds author */
    await profileList.add(course.author)

    /* Adds category */
    await categoryList.add(course.category)

    /* Adds sections */
    course.sections.forEach(async (section) => await sectionList.add)

    /* Adds Course */
    return await courseList.add(course)
}

async function teardownCourse(course) {

    /* Removes author */
    await profileList.remove(course.author)

    /* Removes category */
    await categoryList.remove(course.category)

    /* Removes sections */
    course.sections.forEach(async (section) => await sectionList.remove)

    /* Removes course */
    await courseList.remove(course)

}

module.exports = { setupCourse, teardownCourse }