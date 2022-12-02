class courseDetailController {
    
    permissions = ['VIEW_COURSE']

    async handle(httpRequest) {
        return await getCourse(httpRequest)
    }
}

module.exports = {
    courseDetailController
}