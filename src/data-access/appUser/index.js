/**
  * data-access for an app user
  * 
  * Last Modified: 09-11-2022
  * By: Anton + Charlotte
  **/

const makeAppUserDb = require('./appUserDb')
const appUserModel = require('../../models/AppUser')
//const buildMakeAppUser = require('../../appUsers/appUser')

const makeAppUser = makeAppUserDb({makeDb: appUserModel})



//const { makeDb } = require('../../../db')

//const mongoose = require('mongoose') -- Where is it?

//const makeAppUser = makeAppUserDb({makeDb})

module.exports = { makeAppUser }