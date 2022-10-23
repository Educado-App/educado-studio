const Email = require('../../../helpers/email')
const Password = require('../../../helpers/password')

const { userList } = require('../../../users')
const { contentCreatorApplicationList } = require('../gateways')

const makeApproveCCApplication = require('./approveCCApplication')
const makeRejectCCApplication = require('./rejectCCApplication')
const makeAddCCApplication = require('./addCCApplication')

const approveCCApplication = makeApproveCCApplication({ userList, contentCreatorApplicationList, Email, Password })
const rejectCCApplication = makeRejectCCApplication({ contentCreatorApplicationList, Email })
const addCCApplication = makeAddCCApplication({ contentCreatorApplicationList })

module.exports = { approveCCApplication, rejectCCApplication, addCCApplication }