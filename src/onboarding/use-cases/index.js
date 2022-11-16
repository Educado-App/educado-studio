const Email = require('../../helpers/email')
const Password = require('../../helpers/password')

const { userList, profileList } = require('../../users/gateways')
const { contentCreatorApplicationList } = require('../gateways')

const makeApproveCCApplication = require('./approveCCApplication')
const makeRejectCCApplication = require('./rejectCCApplication')
const makeAddCCApplication = require('./addCCApplication')

const addCCApplication = makeAddCCApplication({ contentCreatorApplicationList, Email })
const approveCCApplication = makeApproveCCApplication({ userList, contentCreatorApplicationList, profileList, Email, Password })
const rejectCCApplication = makeRejectCCApplication({ contentCreatorApplicationList, Email })

module.exports = { 
    approveCCApplication, 
    rejectCCApplication, 
    addCCApplication 
}