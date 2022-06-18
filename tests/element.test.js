const db = require("./testDb");
const nodeMockHttp = require('node-mocks-http')
const controlerElement = require('../API/controllers/element');


beforeAll(async () => {
    await db.setUp();
});
afterEach(async () => {
    await db.dropCollections();
});
afterAll(async () => {
    await db.dropDatabase();
});


describe("Test controler Element", () => {
    it("create element ", async () => {

        let mockReqTrue = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/element',
            body:
            {
                name: "burger",
                volume: 4,
            }
        })
        let mockResTrue = nodeMockHttp.createResponse()
        await controlerElement.createElement(mockReqTrue, mockResTrue)
        let resultTrue = JSON.parse(mockResTrue._getData())
        let statusCommentTrue = mockResTrue._getStatusCode()
        expect(statusCommentTrue).toBe(200)
        expect(resultTrue.message).toBe("Element created")
        expect(resultTrue.data.name).toEqual("burger")
        expect(resultTrue.data.volume).toEqual(4)


        let mockReqFalse = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/element',
            body: {
                _iduser: "300",
                _idRestaurant: "700",
                ContenuTexte: "Test",
                Notation: "3",
            }
        })
        let mockResFalse = nodeMockHttp.createResponse()
        await controlerElement.createElement(mockReqFalse, mockResFalse)
        let resultFalse = JSON.parse(mockResFalse._getData())
        let statusCommentFalse = mockResFalse._getStatusCode()
        expect(statusCommentFalse).toBe(400)
        expect(resultFalse.message).toBe("Data Missing")

    });
    it("Get all element", async () => {
        let mockReq = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/element',
            body:
            {
                name: "burger",
                volume: 4,
                _id: "629554a6b6ed5cb7dbb0e475"
            }

        })
        let mockRes = nodeMockHttp.createResponse()
        await controlerElement.createElement(mockReq, mockRes)

        let mockReq2 = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/element',
            body:
            {
                name: "tacos",
                volume: 2,
                _id: "629554a6b6ed5cb7dbb0e474"
            }

        })
        let mockRes2 = nodeMockHttp.createResponse()
        await controlerElement.createElement(mockReq2, mockRes2)
        let mockReqGET = nodeMockHttp.createRequest(({
            method: 'GET',
            url: 'api/comments'
        }))
        let mockResGET = nodeMockHttp.createResponse()
        await controlerElement.getElements(mockReqGET, mockResGET)
        let resultGET = JSON.parse(mockResGET._getData())
        let statusCommentGET = mockResGET._getStatusCode()
        expect(statusCommentGET).toBe(200)
        expect(resultGET).toBeDefined()
        expect(resultGET.data[0]._id).toEqual("629554a6b6ed5cb7dbb0e475")
        expect(resultGET.data[1]._id).toEqual("629554a6b6ed5cb7dbb0e474")
    });
    it("Get one element", async () => {
        let mockReq = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/element',
            body:
            {
                name: "burger",
                volume: 4,
                _id: "629554a6b6ed5cb7dbb0e475"
            }

        })
        let mockRes = nodeMockHttp.createResponse()
        await controlerElement.createElement(mockReq, mockRes)

        let mockReq2 = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/element',
            body:
            {
                name: "burger",
                volume: 4,
                _id: "629554a6b6ed5cb7dbb0e476"
            }

        })
        let mockRes2 = nodeMockHttp.createResponse()
        await controlerElement.createElement(mockReq2, mockRes2)


        let mockReqGET = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/element/',
            params: { id: '629554a6b6ed5cb7dbb0e476' }

        })
        let mockResGET = nodeMockHttp.createResponse()
        await controlerElement.getElement(mockReqGET, mockResGET)
        let resultGET = JSON.parse(mockResGET._getData())
        let statusCommentGET = mockResGET._getStatusCode()
        expect(resultGET.data._id).toEqual("629554a6b6ed5cb7dbb0e476")
        expect(resultGET.data._id).not.toEqual("629554a6b6ed5cb7dbb0e475")
        expect(statusCommentGET).toEqual(200)

        let mockReqGETMissing = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/element/',

        })
        let mockResGETMissing = nodeMockHttp.createResponse()
        await controlerElement.getElement(mockReqGETMissing, mockResGETMissing)
        let resultGETMissing = JSON.parse(mockResGETMissing._getData())
        let statusCommentGETMissing = mockResGETMissing._getStatusCode()
        expect(statusCommentGETMissing).toEqual(400)
        expect(resultGETMissing.message).toEqual('Parameter missing')

        let mockReqGETFalse = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/element/',
            params: { id: '629336128b03db82aa8c5998' }

        })
        let mockResGETFalse = nodeMockHttp.createResponse()
        await controlerElement.getElement(mockReqGETFalse, mockResGETFalse)
        let resultGETFalse = JSON.parse(mockResGETFalse._getData())
        let statusCommentGETFalse = mockResGETFalse._getStatusCode()
        expect(statusCommentGETFalse).toEqual(404)
        expect(resultGETFalse.message).toEqual('the element does not exist ')

        let mockReqGETFalseError = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/element/',
            params: { id: '56' }

        })
        let mockResGETFalseError = nodeMockHttp.createResponse()
        await controlerElement.getElement(mockReqGETFalseError, mockResGETFalseError)
        let resultGETFalseError = JSON.parse(mockResGETFalseError._getData())
        let statusCommentGETFalseError = mockResGETFalseError._getStatusCode()
        expect(statusCommentGETFalseError).toEqual(500)
        expect(resultGETFalseError.message).toEqual('Erreur database')
    });
    it("Put update element", async () => {
        let mockReq = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/element',
            body:
            {
                name: "burger",
                volume: 4,
                _id: "629554a6b6ed5cb7dbb0e475"
            }

        })
        let mockRes = nodeMockHttp.createResponse()
        await controlerElement.createElement(mockReq, mockRes)

        let mockReqPUT = nodeMockHttp.createRequest({
            method: 'PATCH',
            url: 'api/element/',
            params: { id: '629554a6b6ed5cb7dbb0e475' },
            body: { name: 'Modify' }
        })
        let mockResPUT = nodeMockHttp.createResponse()
        await controlerElement.updateElement(mockReqPUT, mockResPUT)
        let resultPUT = JSON.parse(mockResPUT._getData())
        let statusCommentPUT = mockResPUT._getStatusCode()
        expect(resultPUT.data._id).toEqual("629554a6b6ed5cb7dbb0e475")
        expect(resultPUT.data.name).toEqual("Modify")
        expect(statusCommentPUT).toEqual(200)

        let mockReqPUTMissing = nodeMockHttp.createRequest({
            method: 'PATCH',
            url: 'api/element/',
            body: { name: 'Modify' }
        })
        let mockResPUTMissing = nodeMockHttp.createResponse()
        await controlerElement.updateElement(mockReqPUTMissing, mockResPUTMissing)
        let resultPUTMissing = JSON.parse(mockResPUTMissing._getData())
        let statusCommentPUTMissing = mockResPUTMissing._getStatusCode()
        expect(statusCommentPUTMissing).toEqual(400)
        expect(resultPUTMissing.message).toEqual('Parameter missing')

        let mockReqPUTFalse = nodeMockHttp.createRequest({
            method: 'PATCH',
            url: 'api/element/',
            params: { id: '629336ca3c46ac8ed920a8c0' },
            body: { ContenuTexte: 'Modify' }
        })
        let mockResPUTFalse = nodeMockHttp.createResponse()
        await controlerElement.updateElement(mockReqPUTFalse, mockResPUTFalse)
        let resultPUTFalse = JSON.parse(mockResPUTFalse._getData())
        let statusCommentPUTFalse = mockResPUTFalse._getStatusCode()
        expect(statusCommentPUTFalse).toEqual(404)
        expect(resultPUTFalse.message).toEqual('the element does not exist ')

        let mockReqPUTFalseError = nodeMockHttp.createRequest({
            method: 'PATCH',
            url: 'api/element/',
            params: { id: '87' },
            body: { ContenuTexte: 'Modify' }
        })
        let mockResPUTFalseError = nodeMockHttp.createResponse()
        await controlerElement.updateElement(mockReqPUTFalseError, mockResPUTFalseError)
        let resultPUTFalsError = JSON.parse(mockResPUTFalseError._getData())
        let statusCommentPUTFalseError = mockResPUTFalseError._getStatusCode()
        expect(statusCommentPUTFalseError).toEqual(500)
        expect(resultPUTFalsError.message).toEqual('Element not found')

    });
    it("Put delete element", async () => {
        let mockReq = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/element',
            body:
            {
                name: "burger",
                volume: 4,
                _id: "629554a6b6ed5cb7dbb0e475"
            }

        })
        let mockRes = nodeMockHttp.createResponse()
        await controlerElement.createElement(mockReq, mockRes)

        let mockReqDELFalse = nodeMockHttp.createRequest({
            method: 'DEL',
            url: 'api/element/',
            params: { id: '629554a6b6ed5cb7dbb0e474' },
        })
        let mockResDELFalse = nodeMockHttp.createResponse()
        await controlerElement.deleteElement(mockReqDELFalse, mockResDELFalse)
        let resultDELFalse = JSON.parse(mockResDELFalse._getData())
        let statusCommentDELFalse = mockResDELFalse._getStatusCode()
        expect(statusCommentDELFalse).toEqual(404)
        expect(resultDELFalse.message).toEqual('the element does not exist ')

        let mockReqDEL = nodeMockHttp.createRequest({
            method: 'DELETE',
            url: 'api/element/',
            params: { id: '629554a6b6ed5cb7dbb0e475' },

        })

        let mockResDEL = nodeMockHttp.createResponse()
        await controlerElement.deleteElement(mockReqDEL, mockResDEL)
        let resultDEL = JSON.parse(mockResDEL._getData())
        let statusCommentDEL = mockResDEL._getStatusCode()
        expect(resultDEL.data.name).toEqual("burger")
        expect(resultDEL.data.volume).toEqual(4)
        expect(resultDEL.message).toEqual('Element removed')
        expect(statusCommentDEL).toEqual(200)

        let mockReqGET = nodeMockHttp.createRequest({
            method: 'DEL',
            url: 'api/element/',
            params: { id: '629554a6b6ed5cb7dbb0e475' }

        })
        let mockResGET = nodeMockHttp.createResponse()
        await controlerElement.deleteElement(mockReqGET, mockResGET)
        let resultGET = JSON.parse(mockResGET._getData())
        let statusCommentGET = mockResGET._getStatusCode()
        expect(statusCommentGET).toEqual(404)
        expect(resultGET.message).toEqual('the element does not exist ')

        let mockReqGETError = nodeMockHttp.createRequest({
            method: 'DEL',
            url: 'api/element/',
            params: { id: '34' }

        })
        let mockResGETError = nodeMockHttp.createResponse()
        await controlerElement.deleteElement(mockReqGETError, mockResGETError)
        let resultGETError = JSON.parse(mockResGETError._getData())
        let statusCommentGETError = mockResGETError._getStatusCode()
        expect(statusCommentGETError).toEqual(500)
        expect(resultGETError.message).toEqual('Element not found')

        let mockReqDELMissing = nodeMockHttp.createRequest({
            method: 'DEL',
            url: 'api/element/',
        })
        let mockResDELMissing = nodeMockHttp.createResponse()
        await controlerElement.deleteElement(mockReqDELMissing, mockResDELMissing)
        let resultDELMissing = JSON.parse(mockResDELMissing._getData())
        let statusCommentDELMissing = mockResDELMissing._getStatusCode()
        expect(statusCommentDELMissing).toEqual(400)
        expect(resultDELMissing.message).toEqual('Parameter missing')

    });
})




