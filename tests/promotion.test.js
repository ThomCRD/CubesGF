
const db = require("./testDb");
const nodeMockHttp = require('node-mocks-http')
const controlerPromotion = require('../API/controllers/promotion');


beforeAll(async () => {
    await db.setUp();
});
afterEach(async () => {
    await db.dropCollections();
});
afterAll(async () => {
    await db.dropDatabase();
});


describe("Test controler Promotion", () => {
    it("create promotion ", async () => {

        let mockReqTrue = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/promotion',
            body:
            {
                menus: "629549a125c2c09c52c89cfd",
                start_date: "2022-06-06T00:00:00.000+00:00",
                end_date: "2022-06-09T00:00:00.000+00:00",
                price: 16,
            }
        })
        let mockResTrue = nodeMockHttp.createResponse()
        await controlerPromotion.createPromotion(mockReqTrue, mockResTrue)
        let resultTrue = JSON.parse(mockResTrue._getData())
        let statusPromotionTrue = mockResTrue._getStatusCode()
        expect(statusPromotionTrue).toBe(200)
        expect(resultTrue.message).toBe("Promotion created")
        expect(resultTrue.data.menus).toEqual("629549a125c2c09c52c89cfd")
        expect(resultTrue.data.start_date).toEqual("2022-06-06T00:00:00.000Z")
        expect(resultTrue.data.end_date).toEqual("2022-06-09T00:00:00.000Z")
        expect(resultTrue.data.price).toEqual(16)

        let mockReqFalse = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/promotion',
            body: 
            {
                menus: "629549a125c2c09c52c89cfd",
                start_date: "2022-06-06T00:00:00.000+00:00",
                end_date: "2022-06-09T00:00:00.000+00:00",
            }
        })
        let mockResFalse = nodeMockHttp.createResponse()
        await controlerPromotion.createPromotion(mockReqFalse, mockResFalse)
        let resultFalse = JSON.parse(mockResFalse._getData())
        let statusCommentFalse = mockResFalse._getStatusCode()
        expect(statusCommentFalse).toBe(400)
        expect(resultFalse.message).toBe("Data Missing")

    });
    it("Get all promotion", async () => {
        let mockReq = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/promotion',
            body:
            {
                _id: "629549a125c2c09c52c89cfd",
                menus: "629549a125c2c09c52c89cfd",
                start_date: "2022-06-06T00:00:00.000+00:00",
                end_date: "2022-06-09T00:00:00.000+00:00",
                price: 16,
            }

        })
        let mockRes = nodeMockHttp.createResponse()
        await controlerPromotion.createPromotion(mockReq, mockRes)

        let mockReq2 = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/promotion',
            body:
            {
                _id: "629549a125c2c09c52c89cfc",
                menus: "629549a125c2c09c52c89cfa",
                start_date: "2022-06-06T00:00:00.000+00:00",
                end_date: "2022-06-09T00:00:00.000+00:00",
                price: 16,
            }

        })
        let mockRes2 = nodeMockHttp.createResponse()
        await controlerPromotion.createPromotion(mockReq2, mockRes2)
        let mockReqGET = nodeMockHttp.createRequest(({
            method: 'GET',
            url: 'api/promotions'
        }))
        let mockResGET = nodeMockHttp.createResponse()
        await controlerPromotion.getAllPromotions(mockReqGET, mockResGET)
        let resultGET = JSON.parse(mockResGET._getData())
        let statusCommentGET = mockResGET._getStatusCode()
        expect(statusCommentGET).toBe(200)
        expect(resultGET).toBeDefined()
        expect(resultGET.data[0]._id).toEqual("629549a125c2c09c52c89cfd")
        expect(resultGET.data[1]._id).toEqual("629549a125c2c09c52c89cfc")
    });
    it("Get one promotion", async () => {
        let mockReq = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/promotion',
            body:
            {
                _id: "629549a125c2c09c52c89cfd",
                menus: "629549a125c2c09c52c89cfd",
                start_date: "2022-06-06T00:00:00.000+00:00",
                end_date: "2022-06-09T00:00:00.000+00:00",
                price: 16,
            }

        })
        let mockRes = nodeMockHttp.createResponse()
        await controlerPromotion.createPromotion(mockReq, mockRes)

        let mockReq2 = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/promotion',
            body:
            {
                _id: "629549a125c2c09c52c89cfc",
                menus: "629549a125c2c09c52c89cfa",
                start_date: "2022-06-06T00:00:00.000+00:00",
                end_date: "2022-06-09T00:00:00.000+00:00",
                price: 16,
            }

        })
        let mockRes2 = nodeMockHttp.createResponse()
        await controlerPromotion.createPromotion(mockReq2, mockRes2)


        let mockReqGET = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/promotion/',
            params: { id: '629549a125c2c09c52c89cfc' }

        })
        let mockResGET = nodeMockHttp.createResponse()
        await controlerPromotion.getPromotion(mockReqGET, mockResGET)
        let resultGET = JSON.parse(mockResGET._getData())
        let statusCommentGET = mockResGET._getStatusCode()
        expect(resultGET.data._id).toEqual("629549a125c2c09c52c89cfc")
        expect(resultGET.data._id).not.toEqual("629549a125c2c09c52c89cfd")
        expect(statusCommentGET).toEqual(200)

        let mockReqGETMissing = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/promotion/',

        })
        let mockResGETMissing = nodeMockHttp.createResponse()
        await controlerPromotion.getPromotion(mockReqGETMissing, mockResGETMissing)
        let resultGETMissing = JSON.parse(mockResGETMissing._getData())
        let statusCommentGETMissing = mockResGETMissing._getStatusCode()
        expect(statusCommentGETMissing).toEqual(400)
        expect(resultGETMissing.message).toEqual('Parameter missing')

        let mockReqGETFalse = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/promotion/',
            params: { id: '629549a125c2c09c52c89cff' }

        })
        let mockResGETFalse = nodeMockHttp.createResponse()
        await controlerPromotion.getPromotion(mockReqGETFalse, mockResGETFalse)
        let resultGETFalse = JSON.parse(mockResGETFalse._getData())
        let statusCommentGETFalse = mockResGETFalse._getStatusCode()
        expect(statusCommentGETFalse).toEqual(404)
        expect(resultGETFalse.message).toEqual('the promotion does not exist ')

        let mockReqGETFalseError = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/promotion/',
            params: { id: '34' }

        })
        let mockResGETFalseError = nodeMockHttp.createResponse()
        await controlerPromotion.getPromotion(mockReqGETFalseError, mockResGETFalseError)
        let resultGETFalseError = JSON.parse(mockResGETFalseError._getData())
        let statusCommentGETFalseError = mockResGETFalseError._getStatusCode()
        expect(statusCommentGETFalseError).toEqual(500)
        expect(resultGETFalseError.message).toEqual('Erreur database')
    });
    it("Put update promotion", async () => {
        let mockReq = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/promotion',
            body:
            {
                _id: "629549a125c2c09c52c89cfd",
                menus: "629549a125c2c09c52c89cfd",
                start_date: "2022-06-06T00:00:00.000+00:00",
                end_date: "2022-06-09T00:00:00.000+00:00",
                price: 16,
            }

        })
        let mockRes = nodeMockHttp.createResponse()
        await controlerPromotion.createPromotion(mockReq, mockRes)

        let mockReqPUT = nodeMockHttp.createRequest({
            method: 'PATCH',
            url: 'api/promotion/',
            params: { id: '629549a125c2c09c52c89cfd' },
            body: { price: 15 }
        })
        let mockResPUT = nodeMockHttp.createResponse()
        await controlerPromotion.updatePromotion(mockReqPUT, mockResPUT)
        let resultPUT = JSON.parse(mockResPUT._getData())
        let statusCommentPUT = mockResPUT._getStatusCode()
        expect(resultPUT.data._id).toEqual("629549a125c2c09c52c89cfd")
        expect(resultPUT.data.price).toEqual(15)
        expect(statusCommentPUT).toEqual(200)

        let mockReqPUTMissing = nodeMockHttp.createRequest({
            method: 'PATCH',
            url: 'api/promotion/',
            body: { name: 'Modify' }
        })
        let mockResPUTMissing = nodeMockHttp.createResponse()
        await controlerPromotion.updatePromotion(mockReqPUTMissing, mockResPUTMissing)
        let resultPUTMissing = JSON.parse(mockResPUTMissing._getData())
        let statusCommentPUTMissing = mockResPUTMissing._getStatusCode()
        expect(statusCommentPUTMissing).toEqual(400)
        expect(resultPUTMissing.message).toEqual('Parameter missing')

        let mockReqPUTFalseError = nodeMockHttp.createRequest({
            method: 'PATCH',
            url: 'api/promotion/',
            params: { id: '23' },
            body: { ContenuTexte: 'Modify' }
        })
        let mockResPUTFalseError = nodeMockHttp.createResponse()
        await controlerPromotion.updatePromotion(mockReqPUTFalseError, mockResPUTFalseError)
        let resultPUTFalseError = JSON.parse(mockResPUTFalseError._getData())
        let statusCommentPUTFalseError = mockResPUTFalseError._getStatusCode()
        expect(statusCommentPUTFalseError).toEqual(500)
        expect(resultPUTFalseError.message).toEqual('Promotion not found')

        let mockReqPUTFalse = nodeMockHttp.createRequest({
            method: 'PATCH',
            url: 'api/promotion/',
            params: { id: '629549a125c2c09c52c89cff' },
            body: { ContenuTexte: 'Modify' }
        })
        let mockResPUTFalse = nodeMockHttp.createResponse()
        await controlerPromotion.updatePromotion(mockReqPUTFalse, mockResPUTFalse)
        let resultPUTFalse = JSON.parse(mockResPUTFalse._getData())
        let statusCommentPUTFalse = mockResPUTFalse._getStatusCode()
        expect(statusCommentPUTFalse).toEqual(404)
        expect(resultPUTFalse.message).toEqual('the promotion does not exist ')

    });
    it("Put delete promotion", async () => {
        let mockReq = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/promotion',
            body:
            {
                _id: "629549a125c2c09c52c89cfd",
                menus: "629549a125c2c09c52c89cfd",
                start_date: "2022-06-06T00:00:00.000+00:00",
                end_date: "2022-06-09T00:00:00.000+00:00",
                price: 16,
            }

        })
        let mockRes = nodeMockHttp.createResponse()
        await controlerPromotion.createPromotion(mockReq, mockRes)

        let mockReqDELFalse = nodeMockHttp.createRequest({
            method: 'DEL',
            url: 'api/promotion/',
            params: { id: '629549a125c2c09c52c89cff' },
        })
        let mockResDELFalse = nodeMockHttp.createResponse()
        await controlerPromotion.deletePromotion(mockReqDELFalse, mockResDELFalse)
        let resultDELFalse = JSON.parse(mockResDELFalse._getData())
        let statusCommentDELFalse = mockResDELFalse._getStatusCode()
        expect(statusCommentDELFalse).toEqual(404)
        expect(resultDELFalse.message).toEqual('the promotion does not exist ')

        let mockReqDELFalseError = nodeMockHttp.createRequest({
            method: 'DEL',
            url: 'api/promotion/',
            params: { id: 23 },
        })
        let mockResDELFalseError = nodeMockHttp.createResponse()
        await controlerPromotion.deletePromotion(mockReqDELFalseError, mockResDELFalseError)
        let resultDELFalseError = JSON.parse(mockResDELFalseError._getData())
        let statusCommentDELFalseError = mockResDELFalseError._getStatusCode()
        expect(statusCommentDELFalseError).toEqual(500)
        expect(resultDELFalseError.message).toEqual('Promotion not found')

        let mockReqDEL = nodeMockHttp.createRequest({
            method: 'DELETE',
            url: 'api/promotion/',
            params: { id: '629549a125c2c09c52c89cfd' },

        })

        let mockResDEL = nodeMockHttp.createResponse()
        await controlerPromotion.deletePromotion(mockReqDEL, mockResDEL)
        let resultDEL = JSON.parse(mockResDEL._getData())
        let statusCommentDEL = mockResDEL._getStatusCode()
        expect(resultDEL.data._id).toEqual("629549a125c2c09c52c89cfd")
        expect(resultDEL.message).toEqual('Promotion removed')
        expect(statusCommentDEL).toEqual(200)
        let mockReqGET = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/promotion/',
            params: { id: '629549a125c2c09c52c89cfd' }

        })
        let mockResGET = nodeMockHttp.createResponse()
        await controlerPromotion.getPromotion(mockReqGET, mockResGET)
        let resultGET = JSON.parse(mockResGET._getData())
        let statusCommentGET = mockResGET._getStatusCode()
        expect(statusCommentGET).toEqual(404)
        expect(resultGET.message).toEqual('the promotion does not exist ')

        let mockReqDELMissing = nodeMockHttp.createRequest({
            method: 'DEL',
            url: 'api/promotion/',
        })
        let mockResDELMissing = nodeMockHttp.createResponse()
        await controlerPromotion.deletePromotion(mockReqDELMissing, mockResDELMissing)
        let resultDELMissing = JSON.parse(mockResDELMissing._getData())
        let statusCommentDELMissing = mockResDELMissing._getStatusCode()
        expect(statusCommentDELMissing).toEqual(400)
        expect(resultDELMissing.message).toEqual('Parameter missing')

    });
})




