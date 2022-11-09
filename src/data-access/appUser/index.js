/**
  * data-access for an app user
  * 
  * Last Modified: 09-11-2022
  * By: Anton + Charlotte
  **/

import makeAppUserDb from './appUserDb'
import appUserModel from '../appUsers'
//const mongoose = require('mongoose') -- Where is it?

const makeAppUser = makeAppUserDb(appUserModel)

module.exports = { makeAppUser }

