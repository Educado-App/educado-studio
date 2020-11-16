const passport = require('passport') // Import passport library module

const mongoose = require('mongoose');
const Course = mongoose.model('courses');
const Section = mongoose.model('sections');

const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
    // Create course
    app.post('/api/course/create',requireLogin,async (req,res) => {
        const {title,description} = req.body;

        const course = new Course({
            title: title, 
            description: description,
            _user: req.user.id,
            dateCreated: Date.now(),
            dateUpdated: Date.now(),
        })

        try {
            await course.save();
            res.send(course);
        } catch (err) {
            res.status(422).send(err);
        }
        
    });


    // Get all courses for user
    app.get('/api/course/getall',requireLogin,async (req,res) => {
        const list = await Course.find({_user: req.user.id});
        res.send(list);
    })


    // Get sections for course
    app.get('/api/course/getsections',requireLogin,async (req,res) => {
        const {courseId} = req.body; // get the courseId from request

        // const testId = '5f9a870a78b29b0a6af21d89'; // testid

        currentCourse = await Course.findOne({_id: courseId}); // Get current course
        const currentSectionIds = currentCourse.sections; // Extract sections object from course

        let currentSections = []; // Emty array for keeping sections data

        // Loop over each section ID and save content in currentSections
        for (i=0;i<currentSectionIds.length;i++) {
            section = await Section.findOne({_id: currentSectionIds[i]})
            currentSections.push(section);
        }

        res.send(currentSections) // Send back currentSections
    })

    // Update section title
    app.post('/api/course/update/sectiontitle',async (req,res) => {
        // ...
        // get new value & section ID
        const {value,sectionId} = req.body;
        console.log(value,sectionId);

        // find object in database and update title to new value
        (await Section.findOneAndUpdate({_id: sectionId},{title: value})).save;
        
        // Send response
        res.send('Completed');

    })


    // Update section position
    app.post('/api/course/update/sectionsorder',async (req,res) => {
        // Get sections from request
        const {sections} = req.body;

        // Loop over each section object
        for (i=0;i<sections.length;i++) {
            // Find section by id and update position
            (await Section.findOneAndUpdate({_id: sections[i].id},{position: sections[i].position})).save;
        }

        // Send response
        res.send('Completed');
    })






    // Delete all documents for user 
    app.get('/api/course/delete_all',requireLogin,async (req,res) => {
        await Course.deleteMany({_user: req.user.id},(err) => {console.log(err)});
        res.send('Completed');
    })

}

