const passport = require('passport') // Import passport library module

const mongoose = require('mongoose');
const Course = mongoose.model('courses');

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


    // Delete all documents for user 
    app.get('/api/course/delete_all',requireLogin,async (req,res) => {
        await Course.deleteMany({_user: req.user.id},(err) => {console.log(err)});
        res.send('Completed');
    })

}

