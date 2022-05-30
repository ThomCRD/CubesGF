const express = require('express');
const Restaurant = require("../API/models/restaurant");
const db = require("./testDb");
const nodeMockHttp = require('node-mocks-http')
const controlerRestaurant = require('../API/controllers/restaurant');


beforeAll(async () => {
    await db.setUp();
});
afterEach(async () => {
    await db.dropCollections();
});
afterAll(async () => {
    await db.dropDatabase();
});


describe("Test controler Restaurant", () => {
    it("create restaurant ", async () => {

        let mockReqTrue = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/restaurant',
            body: {
                franchise: "5247019073ed0c203c79b995",
                name: "La casa de papel",
                adress: "62937edb873c350de6b596b2",
                photo: "62937edb873c350de6b596b1",
                menu: [
                    "5197c6b453cce2ec3a743811",
                    "5197c6b453cce2ec3a743812"
                ],
                comment: [
                    "507f191e810c19729de860ea",
                    "507f191e810c19729de860eb"
                ]
            }
        })
        let mockResTrue = nodeMockHttp.createResponse()
        await controlerRestaurant.createRestaurant(mockReqTrue, mockResTrue)
        let resultTrue = JSON.parse(mockResTrue._getData())
        let statusCommentTrue = mockResTrue._getStatusCode()
        expect(statusCommentTrue).toBe(200)
        expect(resultTrue.message).toBe("Restaurant created")
        expect(resultTrue.data.franchise).toEqual("5247019073ed0c203c79b995")
        expect(resultTrue.data.name).toEqual("La casa de papel")
        expect(resultTrue.data.adress).toEqual("62937edb873c350de6b596b2")
        expect(resultTrue.data.photo).toEqual("62937edb873c350de6b596b1")
        expect(resultTrue.data.menu[0]).toEqual("5197c6b453cce2ec3a743811")
        expect(resultTrue.data.menu[1]).toEqual("5197c6b453cce2ec3a743812")
        expect(resultTrue.data.comment[0]).toEqual("507f191e810c19729de860ea")
        expect(resultTrue.data.comment[1]).toEqual("507f191e810c19729de860eb")

        let mockReqFalse = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/restaurant',
            body: {
                _iduser: "300",
                _idRestaurant: "700",
                ContenuTexte: "Test",
                Notation: "3",
            }
        })
        let mockResFalse = nodeMockHttp.createResponse()
        await controlerRestaurant.createRestaurant(mockReqFalse, mockResFalse)
        let resultFalse = JSON.parse(mockResFalse._getData())
        let statusCommentFalse = mockResFalse._getStatusCode()
        expect(statusCommentFalse).toBe(400)
        expect(resultFalse.message).toBe("Data Missing")

    });
    it("Get all restaurant", async () => {
        let mockReq = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/restaurant',
            body:
            {
                _id: "629549a125c2c09c52c89cfd",
                franchise: "5247019073ed0c203c79b995",
                name: "La casa de papel",
                adress: "62937edb873c350de6b596b2",
                photo: "62937edb873c350de6b596b1",
                menu: [
                    "5197c6b453cce2ec3a743811",
                    "5197c6b453cce2ec3a743812"
                ],
                comment: [
                    "507f191e810c19729de860ea",
                    "507f191e810c19729de860eb"
                ]
            }

        })
        let mockRes = nodeMockHttp.createResponse()
        await controlerRestaurant.createRestaurant(mockReq, mockRes)

        let mockReq2 = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/restaurant',
            body:
            {
                _id: "629549a125c2c09c52c89cfc",
                franchise: "5247019073ed0c203c79b996",
                name: "La casa de papon",
                adress: "62937edb873c350de6b596b3",
                photo: "62937edb873c350de6b596b4",
                menu: [
                    "5197c6b453cce2ec3a743813",
                    "5197c6b453cce2ec3a743814"
                ],
                comment: [
                    "507f191e810c19729de860ec",
                    "507f191e810c19729de860ed"
                ]
            }

        })
        let mockRes2 = nodeMockHttp.createResponse()
        await controlerRestaurant.createRestaurant(mockReq2, mockRes2)
        let mockReqGET = nodeMockHttp.createRequest(({
            method: 'GET',
            url: 'api/restaurants'
        }))
        let mockResGET = nodeMockHttp.createResponse()
        await controlerRestaurant.getRestaurants(mockReqGET, mockResGET)
        let resultGET = JSON.parse(mockResGET._getData())
        let statusCommentGET = mockResGET._getStatusCode()
        expect(statusCommentGET).toBe(200)
        expect(resultGET).toBeDefined()
        console.log(resultGET.data[0]._id)
        expect(resultGET.data[0]._id).toEqual("629549a125c2c09c52c89cfd")
        expect(resultGET.data[1]._id).toEqual("629549a125c2c09c52c89cfc")
    });
    it("Get one restaurant", async () => {
        let mockReq = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/restaurant',
            body:
            {
                _id: "629549a125c2c09c52c89cfd",
                franchise: "5247019073ed0c203c79b995",
                name: "La casa de papel",
                adress: "62937edb873c350de6b596b2",
                photo: "62937edb873c350de6b596b1",
                menu: [
                    "5197c6b453cce2ec3a743811",
                    "5197c6b453cce2ec3a743812"
                ],
                comment: [
                    "507f191e810c19729de860ea",
                    "507f191e810c19729de860eb"
                ]
            }

        })
        let mockRes = nodeMockHttp.createResponse()
        await controlerRestaurant.createRestaurant(mockReq, mockRes)

        let mockReq2 = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/restaurant',
            body:
            {
                _id: "629549a125c2c09c52c89cfc",
                franchise: "5247019073ed0c203c79b996",
                name: "La casa de papon",
                adress: "62937edb873c350de6b596b3",
                photo: "62937edb873c350de6b596b4",
                menu: [
                    "5197c6b453cce2ec3a743813",
                    "5197c6b453cce2ec3a743814"
                ],
                comment: [
                    "507f191e810c19729de860ec",
                    "507f191e810c19729de860ed"
                ]
            }

        })
        let mockRes2 = nodeMockHttp.createResponse()
        await controlerRestaurant.createRestaurant(mockReq2, mockRes2)


        let mockReqGET = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/restaurant/',
            params: { id: '629549a125c2c09c52c89cfc' }

        })
        let mockResGET = nodeMockHttp.createResponse()
        await controlerRestaurant.getRestaurant(mockReqGET, mockResGET)
        let resultGET = JSON.parse(mockResGET._getData())
        let statusCommentGET = mockResGET._getStatusCode()
        expect(resultGET.data._id).toEqual("629549a125c2c09c52c89cfc")
        expect(resultGET.data._id).not.toEqual("629549a125c2c09c52c89cfd")
        expect(statusCommentGET).toEqual(200)

        let mockReqGETMissing = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/restaurant/',

        })
        let mockResGETMissing = nodeMockHttp.createResponse()
        await controlerRestaurant.getRestaurant(mockReqGETMissing, mockResGETMissing)
        let resultGETMissing = JSON.parse(mockResGETMissing._getData())
        let statusCommentGETMissing = mockResGETMissing._getStatusCode()
        expect(statusCommentGETMissing).toEqual(400)
        expect(resultGETMissing.message).toEqual('Parameter missing')

        let mockReqGETFalse = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/restaurant/',
            params: { id: '629549a125c2c09c52c89cff' }

        })
        let mockResGETFalse = nodeMockHttp.createResponse()
        await controlerRestaurant.getRestaurant(mockReqGETFalse, mockResGETFalse)
        let resultGETFalse = JSON.parse(mockResGETFalse._getData())
        let statusCommentGETFalse = mockResGETFalse._getStatusCode()
        expect(statusCommentGETFalse).toEqual(404)
        expect(resultGETFalse.message).toEqual('the restaurant does not exist ')
    });
    it("Put update restaurant", async () => {
        let mockReq = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/restaurant',
            body:
            {
                _id: "629549a125c2c09c52c89cfd",
                franchise: "5247019073ed0c203c79b995",
                name: "La casa de papel",
                adress: "62937edb873c350de6b596b2",
                photo: "62937edb873c350de6b596b1",
                menu: [
                    "5197c6b453cce2ec3a743811",
                    "5197c6b453cce2ec3a743812"
                ],
                comment: [
                    "507f191e810c19729de860ea",
                    "507f191e810c19729de860eb"
                ]
            }

        })
        let mockRes = nodeMockHttp.createResponse()
        await controlerRestaurant.createRestaurant(mockReq, mockRes)

        let mockReqPUT = nodeMockHttp.createRequest({
            method: 'PATCH',
            url: 'api/restaurant/',
            params: { id: '629549a125c2c09c52c89cfd' },
            body: { name: 'Modify' }
        })
        let mockResPUT = nodeMockHttp.createResponse()
        await controlerRestaurant.updateRestaurant(mockReqPUT, mockResPUT)
        let resultPUT = JSON.parse(mockResPUT._getData())
        let statusCommentPUT = mockResPUT._getStatusCode()
        expect(resultPUT.data._id).toEqual("629549a125c2c09c52c89cfd")
        expect(resultPUT.data.name).toEqual("Modify")
        expect(statusCommentPUT).toEqual(200)

        let mockReqPUTMissing = nodeMockHttp.createRequest({
            method: 'PATCH',
            url: 'api/restaurant/',
            body: { name: 'Modify' }
        })
        let mockResPUTMissing = nodeMockHttp.createResponse()
        await controlerRestaurant.updateRestaurant(mockReqPUTMissing, mockResPUTMissing)
        let resultPUTMissing = JSON.parse(mockResPUTMissing._getData())
        let statusCommentPUTMissing = mockResPUTMissing._getStatusCode()
        expect(statusCommentPUTMissing).toEqual(400)
        expect(resultPUTMissing.message).toEqual('Parameter missing')

        let mockReqPUTFalse = nodeMockHttp.createRequest({
            method: 'PATCH',
            url: 'api/restaurant/',
            params: { id: '629549a125c2c09c52c89cff' },
            body: { ContenuTexte: 'Modify' }
        })
        let mockResPUTFalse = nodeMockHttp.createResponse()
        await controlerRestaurant.updateRestaurant(mockReqPUTFalse, mockResPUTFalse)
        let resultPUTFalse = JSON.parse(mockResPUTFalse._getData())
        let statusCommentPUTFalse = mockResPUTFalse._getStatusCode()
        expect(statusCommentPUTFalse).toEqual(404)
        expect(resultPUTFalse.message).toEqual('the restaurant does not exist ')

    });
    it("Put delete restaurant", async () => {
        let mockReq = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/restaurant',
            body:
            {
                _id: "629549a125c2c09c52c89cfd",
                franchise: "5247019073ed0c203c79b995",
                name: "La casa de papel",
                adress: "62937edb873c350de6b596b2",
                photo: "62937edb873c350de6b596b1",
                menu: [
                    "5197c6b453cce2ec3a743811",
                    "5197c6b453cce2ec3a743812"
                ],
                comment: [
                    "507f191e810c19729de860ea",
                    "507f191e810c19729de860eb"
                ]
            }

        })
        let mockRes = nodeMockHttp.createResponse()
        await controlerRestaurant.createRestaurant(mockReq, mockRes)

        let mockReqDELFalse = nodeMockHttp.createRequest({
            method: 'DEL',
            url: 'api/restaurant/',
            params: { id: '629549a125c2c09c52c89cff' },
        })
        let mockResDELFalse = nodeMockHttp.createResponse()
        await controlerRestaurant.deleteRestaurant(mockReqDELFalse, mockResDELFalse)
        let resultDELFalse = JSON.parse(mockResDELFalse._getData())
        let statusCommentDELFalse = mockResDELFalse._getStatusCode()
        expect(statusCommentDELFalse).toEqual(404)
        expect(resultDELFalse.message).toEqual('the restaurant does not exist ')

        let mockReqDEL = nodeMockHttp.createRequest({
            method: 'DELETE',
            url: 'api/restaurant/',
            params: { id: '629549a125c2c09c52c89cfd' },

        })

        let mockResDEL = nodeMockHttp.createResponse()
        await controlerRestaurant.deleteRestaurant(mockReqDEL, mockResDEL)
        let resultDEL = JSON.parse(mockResDEL._getData())
        let statusCommentDEL = mockResDEL._getStatusCode()
        expect(resultDEL.data._id).toEqual("629549a125c2c09c52c89cfd")
        expect(resultDEL.message).toEqual('Restaurant removed')
        expect(statusCommentDEL).toEqual(200)
        let mockReqGET = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/restaurant/',
            params: { id: '629549a125c2c09c52c89cfd' }

        })
        let mockResGET = nodeMockHttp.createResponse()
        await controlerRestaurant.getRestaurant(mockReqGET, mockResGET)
        let resultGET = JSON.parse(mockResGET._getData())
        let statusCommentGET = mockResGET._getStatusCode()
        expect(statusCommentGET).toEqual(404)
        expect(resultGET.message).toEqual('the restaurant does not exist ')

        let mockReqDELMissing = nodeMockHttp.createRequest({
            method: 'DEL',
            url: 'api/restaurant/',
        })
        let mockResDELMissing = nodeMockHttp.createResponse()
        await controlerRestaurant.deleteRestaurant(mockReqDELMissing, mockResDELMissing)
        let resultDELMissing = JSON.parse(mockResDELMissing._getData())
        let statusCommentDELMissing = mockResDELMissing._getStatusCode()
        expect(statusCommentDELMissing).toEqual(400)
        expect(resultDELMissing.message).toEqual('Parameter missing')

    });
})




