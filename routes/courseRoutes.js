const passport = require('passport') // Import passport library module

const mongoose = require('mongoose');
const Course = mongoose.model('courses');

const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
    // Create course
    app.post('/api/create/course',requireLogin,async (req,res) => {
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


}

