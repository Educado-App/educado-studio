const { MultipleError } = require('../error')
const Id = require('../Id')
const Ajv = require('ajv')
const ajv = new Ajv({ coerceTypes: true, allErrors: true })
const AjvErrors = require('ajv-errors')
const AjvFormats = require('ajv-formats')

AjvErrors(ajv)
AjvFormats(ajv, { mode: "fast", formats: ["date", "time"], keywords: true })

module.exports = Object.freeze({
    validate
})

/**
 * Uses Ajv schema parsing for validation of data
 * For examples and documentation:
 * @see https://ajv.js.org/guide/getting-started.html
 * @returns Validated data, coerced into respective types
 */
function validate({ schema, data, throwOnFail = false }) {

    const _validate = ajv.compile(schema)
    const valid = _validate(data)
    if (!valid) {
        const errors = formatAjvErrors(_validate.errors)
        if (throwOnFail) throw new MultipleError(errors)
        else data['errors'] = errors
    }

    return data
}


function formatAjvErrors(errors) {
    const formatted = errors.map((error) => {

        const queryParameter = error.instancePath.replace('/', '')
        const message = error.message

        const base = {
            queryParameter,
            message
        }

        const extras = {}
        error.params.allowedValues ? extras['allowedValues'] = error.params.allowedValues : null

        return {
            ...base,
            ...extras
        }
    })

    return formatted
}


/*    Additional AJV formats    */

ajv.addFormat('objectId', {
    type: 'string',
    validate: (id) => Id.isValid(id)
})