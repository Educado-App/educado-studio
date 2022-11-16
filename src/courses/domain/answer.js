module.exports = function buildMakeAnswer() {

    return function makeAnswer({
        text,
        correct = false,
        modifiedAt = new Date()
    }) {

        return Object.freeze({
            text,
            correct,
            modifiedAt,
        })

    }
}
