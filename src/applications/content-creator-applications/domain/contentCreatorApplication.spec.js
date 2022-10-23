const { makeContentCreatorApplication } = require('.')
const makeFakeContentCreatorApplication = require('../../../../__tests__/fixtures/fakeContentCreatorApplication')

describe('Content Creator Application', () => {

    it('can get approved', async () => {

        const fakeApplication = makeFakeContentCreatorApplication()
        const application = makeContentCreatorApplication(fakeApplication)

        application.approve()

        expect(application.isApproved()).toBe(true)

    })

    it('can get rejected', async () => {

        const fakeApplication = makeFakeContentCreatorApplication()
        const application = makeContentCreatorApplication(fakeApplication)

        application.reject({ reason: 'test decline' })

        expect(application.isApproved()).toBe(false)
        expect(application.getRejectReason()).toBe('test decline')

    })

})