const getFileConfigurationAdminJS = require('./fileConfig')

const resources = require('../resources')

/**
 * Loads in every resource specified in the resources.js file
 * 
 * Configures any resources. 
 * @note As of right now the only resources
 * that gets configured is mongoose models that contain the custom FileField.
 * 
 */
module.exports = function loadResources() {

    let configuredResources = []

    for (let resource of resources) {
        let model = resource.resource || resource
        let fields = model.schema.paths

        let configuredResource = { resource }
        for (let field of Object.values(fields)) {

            if (field.options.isFile === true) {
                // Configures the file for Admin JS
                let configuration = getFileConfigurationAdminJS(fields)
            
                configuredResource = {
                    resource: model,
                    options: configuration.options,
                    features: configuration.features,
                }
                break
            }
        }

        configuredResources.push(configuredResource)
    }

    return configuredResources
}