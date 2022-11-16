/**
  * Use-case for logging in an app user
  * 
  * Last Modified: 16-11-2022
  * By: Anton + Charlotte
  **/

module.exports = function makeLoginAppUser(dbModel) {
    return async function (phone) {
        dbModel.findOne({ phone: phone})
        if (dbModel === null) {
            return res.status(400).send({
                message : "User not found."
            });
        }
        else {
            if (dbModel.isValid(dbModel.password, dbModel.hash, dbModel.salt)) {
                return res.status(201).send({
                    message : "User Logged In",
                })
            }
            else {
                return res.status(400).send({
                    message : "Wrong Password"
                });
            }
        }
        // .then((appUser) => {
        //     appUser.isValid(appUser.password, appUser.hash, appUser.salt)
        // })
        // .catch(e)
    }
}


// // check if phone exists
//     AppUser.findOne({ phone: request.body.phone })
  
//       // if phone exists
//       .then((appUser) => {
//         // compare the password entered and the hashed password found
//         bcrypt
//           .compare(request.body.password, appUser.password)
  
//           // if the passwords match
//           .then((passwordCheck) => {
  
//             // check if password matches
//             if(!passwordCheck) {
//               return response.status(400).send({
//                 message: "Passwords do not match",
//                 error,
//               });
//             }
  
//             //   create JWT token
//             const token = jwt.sign(
//               {
//                 appUserId: appUser._id,
//                 appUserphone: appUser.phone,
//               },
//               "RANDOM-TOKEN"
//             );
  
//             //   return success response
//             response.status(200).send({
//               message: "Login Successful",
//               phone: appUser.phone,
//               token,
//             });
//           })
//           // catch error if password does not match
//           .catch((error) => {
//             response.status(400).send({
//               message: "Passwords do not match",
//               error,
//             });
//           });
//       })
//       // catch error if phone does not exist
//       .catch((e) => {
//         response.status(404).send({
//           message: "Phone number not found",
//           e,
//         });
//       });