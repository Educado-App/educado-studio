const AdminJS = require('adminjs')
const AdminJSExpress = require("@adminjs/express")
const AdminJSMongoose = require("@adminjs/mongoose")

const loadResources = require('./utils/loadResources')

/**
 * Attaches an admin panel to the application.
 * 
 * For documentation on how to work with adminJs @see https://beta.adminbro.com/tutorial-installation-instructions.html
 */
module.exports = function attachAdminJS(app, path) {

    AdminJS.registerAdapter({
        Database: AdminJSMongoose.Database,
        Resource: AdminJSMongoose.Resource
    })

    const adminJs = new AdminJS({
        branding: {
            companyName: 'Educado Admin Panel',
        },
        databases: [],
        rootPath: path,
        resources: loadResources(),

    })

    const adminRouter = AdminJSExpress.buildRouter(adminJs);
    app.use(adminJs.options.rootPath, adminRouter);
}