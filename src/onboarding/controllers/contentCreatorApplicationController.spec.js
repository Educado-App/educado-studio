const makeFakeContentCreatorApplication = require('../../../__tests__/fixtures/fakeContentCreatorApplication')

const { contentCreatorApplicationController: handle } = require('.')
const { contentCreatorApplicationList } = require('../gateways')
const { userList } = require('../../users/gateways')

describe('Content Creator Application Controller', () => {

    afterEach(async () => {
        await contentCreatorApplicationList.remove({})
        await userList.remove({})
    })

    it('successfully posts a content creator application', async () => {

        const fakeApplication = makeFakeContentCreatorApplication()

        const request = {
            header: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: fakeApplication,
            params: {},
            queryParams: {},
        }

        const response = await handle(request)

        expect(response.status).toBe(201)
        expect(response.success).toBe(true)
    })

    it('gets a specific content creator application', async () => {
        const fakeApplication = makeFakeContentCreatorApplication()

        await contentCreatorApplicationList.add(fakeApplication)

        const request = {
            header: { 'Content-Type': 'application/json' },
            method: 'GET',
            params: { id: fakeApplication.id },
        }

        const expected = {
            success: true,
            status: 200,
            data: fakeApplication
        }

        const actual = await handle(request)

        expect(actual.status).toBe(expected.status)
        expect(actual.success).toBe(expected.success)

    })

    it('handles approving a single content creator application', async () => {
        const fakeApplication = makeFakeContentCreatorApplication()

        await contentCreatorApplicationList.add(fakeApplication)

        const request = {
            header: { 'Content-Type': 'application/json' },
            method: 'PUT',
            params: { id: fakeApplication.id },
            queryParams: { action: 'approve' },
            body: {}
        }

        const response = await handle(request)

        const found = await userList.findByEmail(fakeApplication.email)

        expect(found).not.toBeNull()
        expect(response.status).toBe(200)
        expect(response.success).toBe(true)
        expect(response.data.approved).toBe(true)

    })

    it('rejects a single content creator application', async () => {
        const fakeApplication = makeFakeContentCreatorApplication()
        await contentCreatorApplicationList.add(fakeApplication)

        const request = {
            header: { 'Content-Type': 'application/json' },
            method: 'PUT',
            params: { id: fakeApplication.id },
            queryParams: { action: 'reject' },
            body: {
                reason: "I don't like test users being approved"
            }
        }

        const response = await handle(request)

        expect(response.success).toBe(true)
        expect(response.data.approved).toBe(false)
        expect(response.data.rejectReason).toBe("I don't like test users being approved")

    })

})