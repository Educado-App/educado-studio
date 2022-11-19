/* Register plugins here. Your plugin should take a single schema parameter as input */
module.exports = [
    normalizeOutput
]

/**
 * Removes _id and __v version key from output when documents gets transformed into json or POJO 
 * Taken and modified from: https://github.com/abrahamcalf/normalize-mongoose/blob/master/index.js
 */
function normalizeOutput(schema) {
    const {
        toObject,
        normalizeId = true,
        removeVersion = true,
        toObject: { transform } = {},
    } = schema.options

    const transformer = {
        transform(doc, returnValue, options) {

            if (removeVersion) {
                const { __v } = returnValue;

                if (!__v) {
                    delete returnValue.__v;
                }
            }

            if (normalizeId) {
                const { _id, id } = returnValue;

                if (_id && !id) {
                    returnValue.id = _id.toString();
                    delete returnValue._id;
                }
            }

            if (transform) {
                return transform(doc, returnValue, options);
            }
        }
    }

    schema.options.toObject = { ...toObject, ...transformer }
}