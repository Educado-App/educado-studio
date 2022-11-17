/* Uses AWS to store files */
const aws = require("aws-sdk");

/* Set up configuration to AWS S3 */
aws.config.setPromisesDependency();
aws.config.update({
    region: "eu-central-1",
});

module.exports = aws