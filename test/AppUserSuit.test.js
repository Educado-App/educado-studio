const AppUser = require("../models/AppUser");
const request = require("supertest");
const baseURL = "http://localhost:8888"
const {MongoClient} = require('mongodb');
let connection;
let db;


let mongoose = require("mongoose");

const userInformation = {
    phone: "99999999",
    password: "1234",
    timeOfLogin: new Date()
};

beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = await connection.db(globalThis.__MONGO_DB_NAME__);
});

afterAll(async () => {
    await mongoose.connection.close();
});

// Test if user can be created and stored in database
describe('User model test', () => {

    it('create & save user successfully', async () => {
        const users = db.collection('appusers');
        await users.insertOne(userInformation);
        console.log(userInformation);

        const insertedUser = await users.findOne({_id: userInformation._id});
        // Object Id is defined when successfully saved to collection.
        expect(insertedUser._id).toBeDefined();
        expect(insertedUser).toEqual(userInformation);

    });


    // Test Schema is working
    // You shouldn't be able to add in any field that isn't defined in the schema
    it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
        const userWithInvalidField = new AppUser({ 
            phone: "99999998",
            password: "1234",
            dateOfBirth: new Date()
        });

        const users = db.collection('appusers');
        await users.insertOne(userWithInvalidField);
        const savedUserWithInvalidField = await users.findOne({_id: userWithInvalidField._id});
        expect(savedUserWithInvalidField._id).toBeDefined();
        expect(savedUserWithInvalidField.dateOfBirth).toBeUndefined();
    });

  })

  /* --- HJÆLP - Sletter alle records i appuser, ikke kun den der bliver bedt om. Sat op ud fra denne her:
  * https://www.freecodecamp.org/news/how-to-test-in-express-and-mongoose-apps/
  */
//   describe('DELETE /api/eml/delete/:id', () => {
//     it('should delete a user', async () => {
        
//         const res = await request(baseURL).delete(`/api/eml/delete/:${userInformation._id}`);
//         expect(res.statusCode).toBe(200);
//       });

//   })
