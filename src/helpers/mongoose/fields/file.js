const mongoose = require("mongoose");
const aws = require('../../AWS')
const config = require('../../../../env/config/keys')
const { Schema } = mongoose;

const FileSchema = new Schema({
    path: String,
    type: String,
    size: Number,
    folder: String,
    filename: String,
})

/**
 * Converts file objects into signed bucket urls used for the frontend to access files
 */
function toAWSUrl(file) {
    if (!file || !file.path) return ""

    const EXPIRE_AFTER_SECONDS = 86436      // 1-day expiary

    const s3 = new aws.S3();
    const params = {
        Bucket: config.s3Bucket,
        Key: file.path,
        Expires: EXPIRE_AFTER_SECONDS
    };

    if (params.Key) {
        return s3.getSignedUrl("getObject", params)
    }

    return file
}

function FileField({
    mimeTypes = [],
} = {}) {

    return Object.freeze({
        type: FileSchema,
        get: toAWSUrl,
        isFile: true,
        mimeTypes: mimeTypes,
    })

}

function ImageField() {

    const ALLOWED_MIME_TYPES = [
        'image/jpeg',
        'image/png'
    ]

    return Object.freeze({
        type: FileSchema,
        get: toAWSUrl,
        isFile: true,
        mimeTypes: ALLOWED_MIME_TYPES,
    })

}

function VideoField() {

    const ALLOWED_MIME_TYPES = [
        'video/mp4',
        'video/mpeg'
    ]

    return Object.freeze({
        type: FileSchema,
        get: toAWSUrl,
        isFile: true,
        mimeTypes: ALLOWED_MIME_TYPES,
    })
}

module.exports = { FileField, ImageField, VideoField }