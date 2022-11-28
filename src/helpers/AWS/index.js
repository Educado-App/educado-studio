const aws = require('aws-sdk')

/**
 * Setup configuration to AWS S3
 * Credentials are loaded automatically from .env file inside /env/config
 */

aws.config.setPromisesDependency()
aws.config.update({
    region: "eu-central-1"
})

module.exports = aws