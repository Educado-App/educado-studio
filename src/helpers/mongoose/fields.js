const mongoose = require('mongoose')
const { Schema } = mongoose;
const aws = require('../AWS')
const config = require('../../../env/config/keys')

/* 
   A getter field for mongoose models, to transform non-signed urls
   into signed urls to be send back to client 
*/
function StorageLink(url) {

    if (!url) return ""

    const EXPIRE_AFTER_SECONDS = 86436      // 1-day expiary

    const s3 = new aws.S3();
    const params = {
        Bucket: config.s3Bucket,
        Key: url,
        Expires: EXPIRE_AFTER_SECONDS
    };

    if (params.Key) {

        return s3.getSignedUrl("getObject", params)
    }

    return ""
}



// Class description
const FileSchema = new Schema({
    key: { type: String },
    bucket: { type: String },
    mime: { type: String }
})

const StorageFile = mongoose.model("File", FileSchema);

module.exports = {
    StorageLink,
    StorageFile
}
