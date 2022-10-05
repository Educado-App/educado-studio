const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const AppUser = require("../models/AppUser");

module.exports = (app) => {
    
    // register endpoint
    app.post("/register", (request, response) => {
        // hash the password
        bcrypt
        .hash(request.body.password, 10)
        .then((hashedPassword) => {
            // create a new user instance and collect the data
            const appUser = new AppUser({
            phone: request.body.phone,
            password: hashedPassword,
            });

            // const date = new Date();
            // appUser.timeOfLogin: date;
    
            // save the new user
            appUser
            .save()
            // return success if the new user is added to the database successfully
            .then((result) => {
                response.status(201).send({
                message: "(App)User Created Successfully",
                result,
                });
            })
            // catch error if the new user wasn't added successfully to the database
            .catch((error) => {
                response.status(500).send({
                message: "Error creating user",
                error,
                });
            });
        })
        // catch error if the password hash isn't successful
        .catch((e) => {
            response.status(500).send({
            message: "Password was not hashed successfully",
            e,
            });
        });
    });

}