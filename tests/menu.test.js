const express = require('express');
const Menu = require("../API/models/menu");
const db = require("./testDb");
const nodeMockHttp = require('node-mocks-http')
const controlerMenu = require('../API/controllers/menu');


beforeAll(async () => {
    await db.setUp();
});
afterEach(async () => {
    await db.dropCollections();
});
afterAll(async () => {
    await db.dropDatabase();
});


describe("Test controler Menu", () => {
    it("create menu ", async () => {

        let mockReqTrue = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/menu',
            body: 
            {
                promotions: "629549a125c2c09c52c89cfd",
                photo: "629da983c638d1d0f38ee1b2",
                name: "multifruit",
                ingredient: [
                    "banane", "pomme", "poire"
                ],
                price: 22,
            }

        })
        let mockResTrue = nodeMockHttp.createResponse()
        await controlerMenu.createMenu(mockReqTrue, mockResTrue)
        let resultTrue = JSON.parse(mockResTrue._getData())
        let statusCommentTrue = mockResTrue._getStatusCode()
        expect(statusCommentTrue).toBe(200)
        expect(resultTrue.message).toBe("Menu created")
        expect(resultTrue.data.promotions).toEqual("629549a125c2c09c52c89cfd")
        expect(resultTrue.data.photo).toEqual("629da983c638d1d0f38ee1b2")
        expect(resultTrue.data.name).toEqual("multifruit")
        expect(resultTrue.data.photo).toEqual("629da983c638d1d0f38ee1b2")
        expect(resultTrue.data.price).toEqual(22)
        expect(resultTrue.data.ingredient[0]).toEqual("banane")
        expect(resultTrue.data.ingredient[1]).toEqual("pomme")
        expect(resultTrue.data.ingredient[2]).toEqual("poire")
        expect(resultTrue.data._id).toBeDefined

        let mockReqFalse = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/menu',
            body: {
                _iduser: "300",
                _idRestaurant: "700",
                ContenuTexte: "Test",
                Notation: "3",
            }
        })
        let mockResFalse = nodeMockHttp.createResponse()
        await controlerMenu.createMenu(mockReqFalse, mockResFalse)
        let resultFalse = JSON.parse(mockResFalse._getData())
        let statusCommentFalse = mockResFalse._getStatusCode()
        expect(statusCommentFalse).toBe(400)
        expect(resultFalse.message).toBe("Data Missing")

    });
    it("Get all menu", async () => {
        let mockReq = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/menu',
            body:
            {
                _id: "629549a125c2c09c52c89cfd",
                promotions: "629549a125c2c09c52c89cfa",
                photo: "629da983c638d1d0f38ee1b2",
                name: "multifruit",
                ingredient: [
                    "banane", "pomme", "poire"
                ],
                price: 22,
            }

        })
        let mockRes = nodeMockHttp.createResponse()
        await controlerMenu.createMenu(mockReq, mockRes)

        let mockReq2 = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/menu',
            body:
            {
                _id: "629549a125c2c09c52c89cfc",
                promotions: "629549a125c2c09c52c89cfb",
                photo: "629da983c638d1d0f38ee1b2",
                name: "multifruit",
                ingredient: [
                    "banane", "pomme", "poire"
                ],
                price: 22,
            }

        })
        let mockRes2 = nodeMockHttp.createResponse()
        await controlerMenu.createMenu(mockReq2, mockRes2)
        let mockReqGET = nodeMockHttp.createRequest(({
            method: 'GET',
            url: 'api/restaurants'
        }))
        let mockResGET = nodeMockHttp.createResponse()
        await controlerMenu.getAllMenu(mockReqGET, mockResGET)
        let resultGET = JSON.parse(mockResGET._getData())
        let statusCommentGET = mockResGET._getStatusCode()
        expect(statusCommentGET).toBe(200)
        expect(resultGET).toBeDefined()
        expect(resultGET.data[0]._id).toEqual("629549a125c2c09c52c89cfd")
        expect(resultGET.data[1]._id).toEqual("629549a125c2c09c52c89cfc")
    });
    it("Get one menu", async () => {
        let mockReq = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/menu',
            body:
            {
                _id: "629549a125c2c09c52c89cfd",
                promotions: "629549a125c2c09c52c89cfa",
                photo: "629da983c638d1d0f38ee1b2",
                name: "multifruit",
                ingredient: [
                    "banane", "pomme", "poire"
                ],
                price: 22,
            }

        })
        let mockRes = nodeMockHttp.createResponse()
        await controlerMenu.createMenu(mockReq, mockRes)

        let mockReq2 = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/menu',
            body:
            {
                _id: "629549a125c2c09c52c89cfc",
                promotions: "629549a125c2c09c52c89cfb",
                photo: "629da983c638d1d0f38ee1b2",
                name: "multifruit",
                ingredient: [
                    "banane", "pomme", "poire"
                ],
                price: 22,
            }

        })
        let mockRes2 = nodeMockHttp.createResponse()
        await controlerMenu.createMenu(mockReq2, mockRes2)


        let mockReqGET = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/menu/',
            params: { id: '629549a125c2c09c52c89cfc' }

        })
        let mockResGET = nodeMockHttp.createResponse()
        await controlerMenu.getMenu(mockReqGET, mockResGET)
        let resultGET = JSON.parse(mockResGET._getData())
        let statusCommentGET = mockResGET._getStatusCode()
        expect(resultGET.data._id).toEqual("629549a125c2c09c52c89cfc")
        expect(resultGET.data._id).not.toEqual("629549a125c2c09c52c89cfd")
        expect(statusCommentGET).toEqual(200)

        let mockReqGETMissing = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/menu/',

        })
        let mockResGETMissing = nodeMockHttp.createResponse()
        await controlerMenu.getMenu(mockReqGETMissing, mockResGETMissing)
        let resultGETMissing = JSON.parse(mockResGETMissing._getData())
        let statusCommentGETMissing = mockResGETMissing._getStatusCode()
        expect(statusCommentGETMissing).toEqual(400)
        expect(resultGETMissing.message).toEqual('Parameter missing')

        let mockReqGETFalse = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/menu/',
            params: { id: '629549a125c2c09c52c89cff' }

        })
        let mockResGETFalse = nodeMockHttp.createResponse()
        await controlerMenu.getMenu(mockReqGETFalse, mockResGETFalse)
        let resultGETFalse = JSON.parse(mockResGETFalse._getData())
        let statusCommentGETFalse = mockResGETFalse._getStatusCode()
        expect(statusCommentGETFalse).toEqual(404)
        expect(resultGETFalse.message).toEqual('the menu does not exist ')
    });
    it("Put update menu", async () => {
        let mockReq = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/menu',
            body:
            {
                _id: "629549a125c2c09c52c89cfd",
                promotions: "629549a125c2c09c52c89cfa",
                photo: "629da983c638d1d0f38ee1b2",
                name: "multifruit",
                ingredient: [
                    "banane", "pomme", "poire"
                ],
                price: 22,
            }

        })
        let mockRes = nodeMockHttp.createResponse()
        await controlerMenu.createMenu(mockReq, mockRes)

        let mockReqPUT = nodeMockHttp.createRequest({
            method: 'PATCH',
            url: 'api/menu/',
            params: { id: '629549a125c2c09c52c89cfd' },
            body: { name: 'Modify' }
        })
        let mockResPUT = nodeMockHttp.createResponse()
        await controlerMenu.updateMenu(mockReqPUT, mockResPUT)
        let resultPUT = JSON.parse(mockResPUT._getData())
        let statusCommentPUT = mockResPUT._getStatusCode()
        expect(resultPUT.data._id).toEqual("629549a125c2c09c52c89cfd")
        expect(resultPUT.data.name).toEqual("Modify")
        expect(statusCommentPUT).toEqual(200)

        let mockReqPUTMissing = nodeMockHttp.createRequest({
            method: 'PATCH',
            url: 'api/menu/',
            body: { name: 'Modify' }
        })
        let mockResPUTMissing = nodeMockHttp.createResponse()
        await controlerMenu.updateMenu(mockReqPUTMissing, mockResPUTMissing)
        let resultPUTMissing = JSON.parse(mockResPUTMissing._getData())
        let statusCommentPUTMissing = mockResPUTMissing._getStatusCode()
        expect(statusCommentPUTMissing).toEqual(400)
        expect(resultPUTMissing.message).toEqual('Parameter missing')

        let mockReqPUTFalse = nodeMockHttp.createRequest({
            method: 'PATCH',
            url: 'api/menu/',
            params: { id: '629549a125c2c09c52c89cff' },
            body: { ContenuTexte: 'Modify' }
        })
        let mockResPUTFalse = nodeMockHttp.createResponse()
        await controlerMenu.updateMenu(mockReqPUTFalse, mockResPUTFalse)
        let resultPUTFalse = JSON.parse(mockResPUTFalse._getData())
        let statusCommentPUTFalse = mockResPUTFalse._getStatusCode()
        expect(statusCommentPUTFalse).toEqual(404)
        expect(resultPUTFalse.message).toEqual('the menu does not exist ')

    });
    it("Put delete menu", async () => {
        let mockReq = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/menu',
            body:
            {
                _id: "629549a125c2c09c52c89cfd",
                promotions: "629549a125c2c09c52c89cfa",
                photo: "629da983c638d1d0f38ee1b2",
                name: "multifruit",
                ingredient: [
                    "banane", "pomme", "poire"
                ],
                price: 22,
            }

        })
        let mockRes = nodeMockHttp.createResponse()
        await controlerMenu.createMenu(mockReq, mockRes)

        let mockReqDELFalse = nodeMockHttp.createRequest({
            method: 'DEL',
            url: 'api/menu/',
            params: { id: '629549a125c2c09c52c89cff' },
        })
        let mockResDELFalse = nodeMockHttp.createResponse()
        await controlerMenu.deleteMenu(mockReqDELFalse, mockResDELFalse)
        let resultDELFalse = JSON.parse(mockResDELFalse._getData())
        let statusCommentDELFalse = mockResDELFalse._getStatusCode()
        expect(statusCommentDELFalse).toEqual(404)
        expect(resultDELFalse.message).toEqual('the menu does not exist ')

        let mockReqDEL = nodeMockHttp.createRequest({
            method: 'DELETE',
            url: 'api/menu/',
            params: { id: '629549a125c2c09c52c89cfd' },

        })

        let mockResDEL = nodeMockHttp.createResponse()
        await controlerMenu.deleteMenu(mockReqDEL, mockResDEL)
        let resultDEL = JSON.parse(mockResDEL._getData())
        let statusCommentDEL = mockResDEL._getStatusCode()
        expect(resultDEL.data._id).toEqual("629549a125c2c09c52c89cfd")
        expect(resultDEL.message).toEqual('Menu removed')
        expect(statusCommentDEL).toEqual(200)
        let mockReqGET = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/menu/',
            params: { id: '629549a125c2c09c52c89cfd' }

        })
        let mockResGET = nodeMockHttp.createResponse()
        await controlerMenu.getMenu(mockReqGET, mockResGET)
        let resultGET = JSON.parse(mockResGET._getData())
        let statusCommentGET = mockResGET._getStatusCode()
        expect(statusCommentGET).toEqual(404)
        expect(resultGET.message).toEqual('the menu does not exist ')

        let mockReqDELMissing = nodeMockHttp.createRequest({
            method: 'DEL',
            url: 'api/menu/',
        })
        let mockResDELMissing = nodeMockHttp.createResponse()
        await controlerMenu.deleteMenu(mockReqDELMissing, mockResDELMissing)
        let resultDELMissing = JSON.parse(mockResDELMissing._getData())
        let statusCommentDELMissing = mockResDELMissing._getStatusCode()
        expect(statusCommentDELMissing).toEqual(400)
        expect(resultDELMissing.message).toEqual('Parameter missing')

    });
})




