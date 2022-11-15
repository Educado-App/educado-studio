const AdminJS = require('adminjs')
const AdminJSExpress = require("@adminjs/express")
const AdminJSMongoose = require("@adminjs/mongoose")

const resources = require('./models')

/* 
    Attaches an admin panel to the application
*/
module.exports = function attachAdminJS(app, path) {

    AdminJS.registerAdapter({
        Database: AdminJSMongoose.Database,
        Resource: AdminJSMongoose.Resource
    })
    
    const adminJs = new AdminJS({
        databases: [],
        rootPath: path,
        resources
    })
    
    const adminRouter = AdminJSExpress.buildRouter(adminJs);
    app.use(adminJs.options.rootPath, adminRouter);
}