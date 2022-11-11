/**
  * data-access for an app user
  * 
  * Last Modified: 09-11-2022
  * By: Anton + Charlotte
  **/

const makeAppUserDb = require('./appUserDb')
//const appUserModel = require('../../models/AppUser')
//const buildMakeAppUser = require('../../appUsers/appUser')
const {makeDb} = require("../../../db")

const makeAppUser = makeAppUserDb({makeDb})



//const { makeDb } = require('../../../db')

//const mongoose = require('mongoose') -- Where is it?

//const makeAppUser = makeAppUserDb({mongodb})

module.exports = { makeAppUser }