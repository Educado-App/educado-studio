// const AppUser = require("../../models/AppUser");
// const connectDb = require('../../../__tests__/fixtures/db')

// const userInformation = {
//     phone: "99999999",
//     password: "1234",
//     timeOfLogin: new Date()
// };

// // Test if user can be created and stored in database
// describe('User model test', () => {

    
//     beforeAll(async () => await connectDb());   //Connects to an in-memory database for faster testing
//     afterEach(async () => await AppUser.remove({}))

//     it('create & save user successfully', async () => {
//         const inserted = await AppUser.create(userInformation)

//         // Object Id is defined when successfully saved to collection.
//         expect(inserted._id).toBeDefined();

//     });


//     // Test Schema is working
//     // You shouldn't be able to add in any field that isn't defined in the schema
//     it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
//         const userWithInvalidField = new AppUser({
//             phone: "99999998",
//             password: "1234",
//             dateOfBirth: new Date()
//         });

//         const created = await AppUser.create(userWithInvalidField);
//         const savedUserWithInvalidField = await AppUser.findById(created._id);

//         expect(savedUserWithInvalidField._id).toBeDefined();
//     });

    
    

// })

// /* --- HJÆLP - bliver ved med at fail:
// * https://www.freecodecamp.org/news/how-to-test-in-express-and-mongoose-apps/
// * https://www.makeuseof.com/express-apis-jest-test/?fbclid=IwAR3Am55XRJ6fIBLpBsGsa1ro2pDN4exdhnNa_7xut-egAo6nNhrelMhAKEM 
// */

