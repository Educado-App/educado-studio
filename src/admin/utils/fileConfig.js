const uploadFeature = require("@adminjs/upload")
const config = require('../../../env/config/keys')

const AWSOptions = {
    bucket: config.s3Bucket,
    region: config.s3Region
}

/**
 * Integrates AdminJS upload feature with the custom mongoose FileField
 * to allow AWS storage for files in the admin panel
 */
module.exports = function getFileConfigurationAdminJS(fields) {
    let options = {
        properties: {}
    }
    let features = []

    for (let field of Object.values(fields)) {
        if (!field.options.isFile) continue

        let fieldName = field.path

        options['properties'][fieldName] = { isVisible: false }
        features.push(
            uploadFeature({
                provider: { aws: AWSOptions },
                properties: {
                    key: `${fieldName}.path`,
                    //bucket: 'icon.folder',
                    mimeType: `${fieldName}.type`,
                    size: `${fieldName}.size`,
                    filename: `${fieldName}.filename`,
                    file: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`,
                },
                validation: { mimeTypes: field.options.mimeTypes }
            }))
    }

    return {
        options,
        features
    }

}