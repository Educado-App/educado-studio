const Params = require('../../../helpers/validation/params')
const ParamsSchema = require('../../../helpers/validation/paramsSchema')
const Id = require('../../../helpers/id')


const { RoleModel } = require('../db-models')
require('../../../users/db-models')

const makeRoleList = require('./roleList')

const roleList = makeRoleList({ dbModel: RoleModel, Params, ParamsSchema })

module.exports = {
    roleList
}


