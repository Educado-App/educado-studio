const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const AppUser = require("../models/AppUser");
const jwt = require("jsonwebtoken");
const auth = require("../routes/appUserAuthentication");
const AppUserController = require("../controllers/AppUserController");


module.exports = (app) => {

    // register endpoint
    app.post("/api/eml/register", (request, response) => {
        // hash the password
        bcrypt
        .hash(request.body.password, 10)
        .then((hashedPassword) => {
            // create a new user instance and collect the data
            const date = new Date();

            const appUser = new AppUser({
            phone: request.body.phone,
            password: hashedPassword,
            timeOfLogin: date,
            });
    
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

    // login endpoint
app.post("/api/eml/login", (request, response) => {
    // check if phone exists
    AppUser.findOne({ phone: request.body.phone })
  
      // if phone exists
      .then((appUser) => {
        // compare the password entered and the hashed password found
        bcrypt
          .compare(request.body.password, appUser.password)
  
          // if the passwords match
          .then((passwordCheck) => {
  
            // check if password matches
            if(!passwordCheck) {
              return response.status(400).send({
                message: "Passwords do not match",
                error,
              });
            }
  
            //   create JWT token
            const token = jwt.sign(
              {
                appUserId: appUser._id,
                appUserphone: appUser.phone,
              },
              "RANDOM-TOKEN"
            );
  
            //   return success response
            response.status(200).send({
              message: "Login Successful",
              phone: appUser.phone,
              token,
            });
          })
          // catch error if password does not match
          .catch((error) => {
            response.status(400).send({
              message: "Passwords do not match",
              error,
            });
          });
      })
      // catch error if phone does not exist
      .catch((e) => {
        response.status(404).send({
          message: "Phone number not found",
          e,
        });
      });
  });



    // authentication endpoint
    app.get("/api/eml/auth-endpoint", auth, (request, response) => {
        response.json({ message: "You are authorized" });
    });

    // User deletion endpoint
    app.delete(`/api/eml/delete/:id`, AppUserController.deleteUser);
}
