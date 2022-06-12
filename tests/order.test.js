const express = require('express');
const Order = require("../API/models/order");
const db = require("./testDb");
const nodeMockHttp = require('node-mocks-http')
const controlerOrder = require('../API/controllers/order');
const controlerRestaurant = require('../API/controllers/restaurant');
const controlerUser = require('../API/controllers/user');
const controlerPromotion = require('../API/controllers/promotion');
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


describe("Test controler Order", () => {
    it("create order ", async () => {

        let mockReqTrue = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/order',
            body:
            {
                customer: "5247019073ed0c203c79b995",
                restaurant: "62937edb873c350de6b596b2",
                promotion: "62937edb873c350de6b596b1",
                menus: "5197c6b453cce2ec3a743811",
                delivery_time: "2022-06-04T14:31:23.000Z",
                total: 2
            }
        })
        let mockResTrue = nodeMockHttp.createResponse()
        await controlerOrder.createOrder(mockReqTrue, mockResTrue)
        let resultTrue = JSON.parse(mockResTrue._getData())
        let statusOrderTrue = mockResTrue._getStatusCode()
        expect(statusOrderTrue).toBe(200)
        expect(resultTrue.message).toBe("Order created")
        expect(resultTrue.data.customer).toEqual("5247019073ed0c203c79b995")
        expect(resultTrue.data.restaurant).toEqual("62937edb873c350de6b596b2")
        expect(resultTrue.data.promotion).toEqual("62937edb873c350de6b596b1")
        expect(resultTrue.data.menus).toEqual("5197c6b453cce2ec3a743811")
        expect(resultTrue.data.delivery_time).toEqual("2022-06-04T14:31:23.000Z")
        expect(resultTrue.data.total).toEqual(2)


        let mockReqFalse = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/order',
            body:
            {
                promotion: "62937edb873c350de6b596b1",
                menus: "5197c6b453cce2ec3a743811",
                delivery_time: "2022-06-04T14:31:23.000Z",
                total: 2
            }
        })
        let mockResFalse = nodeMockHttp.createResponse()
        await controlerOrder.createOrder(mockReqFalse, mockResFalse)
        let resultFalse = JSON.parse(mockResFalse._getData())
        let statusCommentFalse = mockResFalse._getStatusCode()
        expect(statusCommentFalse).toBe(400)
        expect(resultFalse.message).toBe("Data Missing")

    });
    it("Get all order", async () => {
        let mockReq = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/order',
            body:
            {
                _id: "629b7a10150433a92f9379cc",
                customer: "5247019073ed0c203c79b995",
                restaurant: "62937edb873c350de6b596b2",
                promotion: "62937edb873c350de6b596b1",
                menus: "5197c6b453cce2ec3a743811",
                delivery_time: "2022-06-04T14:31:23.000Z",
                total: 2
            }

        })
        let mockRes = nodeMockHttp.createResponse()
        await controlerOrder.createOrder(mockReq, mockRes)

        let mockReq2 = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/order',
            body:
            {
                _id: "629b7a10150433a92f9379cb",
                customer: "5247019073ed0c203c79b994",
                restaurant: "62937edb873c350de6b596b3",
                promotion: "62937edb873c350de6b596b1",
                menus: "5197c6b453cce2ec3a743811",
                delivery_time: "2022-06-04T14:31:23.000Z",
                total: 2
            }

        })
        let mockRes2 = nodeMockHttp.createResponse()
        await controlerOrder.createOrder(mockReq2, mockRes2)
        let mockReqGET = nodeMockHttp.createRequest(({
            method: 'GET',
            url: 'api/orders'
        }))
        let mockResGET = nodeMockHttp.createResponse()
        await controlerOrder.getAllOrders(mockReqGET, mockResGET)
        let resultGET = JSON.parse(mockResGET._getData())
        let statusOrdersGET = mockResGET._getStatusCode()
        expect(statusOrdersGET).toBe(200)
        expect(resultGET).toBeDefined()
        expect(resultGET.data[0]._id).toEqual("629b7a10150433a92f9379cc")
        expect(resultGET.data[1]._id).toEqual("629b7a10150433a92f9379cb")
    });
    it("Get one order", async () => {
        let mockReq = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/order',
            body:
            {
                _id: "629b7a10150433a92f9379cc",
                customer: "5247019073ed0c203c79b995",
                restaurant: "629549a125c2c09c52c89cfd",
                promotion: "62937edb873c350de6b596b1",
                menus: "5197c6b453cce2ec3a743811",
                delivery_time: "2022-06-04T14:31:23.000Z",
                total: 2
            }

        })
        let mockRes = nodeMockHttp.createResponse()
        await controlerOrder.createOrder(mockReq, mockRes)

        let mockReq2 = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/order',
            body:
            {
                _id: "629b7a10150433a92f9379cb",
                customer: "5247019073ed0c203c79b994",
                restaurant: "629549a125c2c09c52c89cfd",
                promotion: "62937edb873c350de6b596b1",
                menus: "5197c6b453cce2ec3a743811",
                delivery_time: "2022-06-04T14:31:23.000Z",
                total: 2
            }


        })
        let mockRes2 = nodeMockHttp.createResponse()
        await controlerOrder.createOrder(mockReq2, mockRes2)

        let mockReq3 = nodeMockHttp.createRequest({
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
        let mockRes3 = nodeMockHttp.createResponse()
        await controlerRestaurant.createRestaurant(mockReq3, mockRes3)

        let mockReqUser = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/register',
            body: {
                _id: "5247019073ed0c203c79b994",
                firstName: "Oscar",
                lastName: "Hamel",
                email: "oscar.hamel@gmail.com",
                password: "caramel",
                phone: "0606060606"
            }
        })
        let mockResUser = nodeMockHttp.createResponse()
        await controlerUser.createUser(mockReqUser, mockResUser)


        let mockReqProm = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/promotion',
            body:
            {
                _id: "62937edb873c350de6b596b1",
                menus: "629549a125c2c09c52c89cfd",
                start_date: "2022-06-06T00:00:00.000+00:00",
                end_date: "2022-06-09T00:00:00.000+00:00",
                price: 16,
            }

        })
        let mockResProm = nodeMockHttp.createResponse()
        await controlerPromotion.createPromotion(mockReqProm, mockResProm)

        let mockReqMenu = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/menu',
            body:
            {
                _id: "5197c6b453cce2ec3a743811",
                promotions: "629549a125c2c09c52c89cfa",
                photo: "629da983c638d1d0f38ee1b2",
                name: "multifruit",
                ingredient: [
                    "banane", "pomme", "poire"
                ],
                price: 22,
            }

        })
        let mockResMenu = nodeMockHttp.createResponse()
        await controlerMenu.createMenu(mockReqMenu, mockResMenu)

        let mockReqGET = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/order/',
            params: { id: '629b7a10150433a92f9379cb' }

        })
        let mockResGET = nodeMockHttp.createResponse()
        await controlerOrder.getOrder(mockReqGET, mockResGET)
        let resultGET = JSON.parse(mockResGET._getData())
        let statusOrderGET = mockResGET._getStatusCode()
        expect(resultGET.data._id).toEqual("629b7a10150433a92f9379cb")
        expect(resultGET.data._id).not.toEqual("629b7a10150433a92f9379cc")
        expect(resultGET.data.restaurant._id).toEqual("629549a125c2c09c52c89cfd")
        expect(resultGET.data.customer._id).toEqual("5247019073ed0c203c79b994")
        expect(resultGET.data.promotion._id).toEqual("62937edb873c350de6b596b1")
        expect(resultGET.data.menus._id).toEqual("5197c6b453cce2ec3a743811")
        expect(statusOrderGET).toEqual(200)

        let mockReqGETMissing = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/order/',

        })
        let mockResGETMissing = nodeMockHttp.createResponse()
        await controlerOrder.getOrder(mockReqGETMissing, mockResGETMissing)
        let resultGETMissing = JSON.parse(mockResGETMissing._getData())
        let statusCommentGETMissing = mockResGETMissing._getStatusCode()
        expect(statusCommentGETMissing).toEqual(400)
        expect(resultGETMissing.message).toEqual('Parameter missing')

        let mockReqGETFalse = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/order/',
            params: { id: '629b7a10150433a92f9379ca' }

        })
        let mockResGETFalse = nodeMockHttp.createResponse()
        await controlerOrder.getOrder(mockReqGETFalse, mockResGETFalse)
        let resultGETFalse = JSON.parse(mockResGETFalse._getData())
        let statusCommentGETFalse = mockResGETFalse._getStatusCode()
        expect(statusCommentGETFalse).toEqual(404)
        expect(resultGETFalse.message).toEqual('Order does not exist')
    });
    it("Get one order find mine", async () => {
        let mockReq = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/order',
            body:
            {
                _id: "629b7a10150433a92f9379cc",
                customer: "5247019073ed0c203c79b995",
                restaurant: "629549a125c2c09c52c89cfd",
                promotion: "62937edb873c350de6b596b1",
                menus: "5197c6b453cce2ec3a743811",
                delivery_time: "2022-06-04T14:31:23.000Z",
                total: 2
            }

        })
        let mockRes = nodeMockHttp.createResponse()
        await controlerOrder.createOrder(mockReq, mockRes)

        let mockReq2 = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/order',
            body:
            {
                _id: "629b7a10150433a92f9379cb",
                customer: "5247019073ed0c203c79b994",
                restaurant: "629549a125c2c09c52c89cfd",
                promotion: "62937edb873c350de6b596b1",
                menus: "5197c6b453cce2ec3a743811",
                delivery_time: "2022-06-04T14:31:23.000Z",
                total: 2
            }


        })
        let mockRes2 = nodeMockHttp.createResponse()
        await controlerOrder.createOrder(mockReq2, mockRes2)

        let mockReqProm = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/promotion',
            body:
            {
                _id: "62937edb873c350de6b596b1",
                menus: "629549a125c2c09c52c89cfd",
                start_date: "2022-06-06T00:00:00.000+00:00",
                end_date: "2022-06-09T00:00:00.000+00:00",
                price: 16,
            }

        })
        let mockResProm = nodeMockHttp.createResponse()
        await controlerPromotion.createPromotion(mockReqProm, mockResProm)

        let mockReqMenu = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/menu',
            body:
            {
                _id: "5197c6b453cce2ec3a743811",
                promotions: "629549a125c2c09c52c89cfa",
                photo: "629da983c638d1d0f38ee1b2",
                name: "multifruit",
                ingredient: [
                    "banane", "pomme", "poire"
                ],
                price: 22,
            }

        })
        let mockResMenu = nodeMockHttp.createResponse()
        await controlerMenu.createMenu(mockReqMenu, mockResMenu)

        let mockReqGET = nodeMockHttp.createRequest({
            method: 'GET',
            url: '/order/findMine/',
            params: { id: '629b7a10150433a92f9379cb' }

        })
        let mockResGET = nodeMockHttp.createResponse()
        await controlerOrder.getOrderFindMine(mockReqGET, mockResGET)
        let resultGET = JSON.parse(mockResGET._getData())
        let statusOrderGET = mockResGET._getStatusCode()
        expect(resultGET.data._id).toEqual("629b7a10150433a92f9379cb")
        expect(resultGET.data._id).not.toEqual("629b7a10150433a92f9379cc")
        expect(resultGET.data.promotion._id).toEqual("62937edb873c350de6b596b1")
        expect(resultGET.data.menus._id).toEqual("5197c6b453cce2ec3a743811")
        expect(statusOrderGET).toEqual(200)

        let mockReqGETMissing = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/order/',

        })
        let mockResGETMissing = nodeMockHttp.createResponse()
        await controlerOrder.getOrder(mockReqGETMissing, mockResGETMissing)
        let resultGETMissing = JSON.parse(mockResGETMissing._getData())
        let statusCommentGETMissing = mockResGETMissing._getStatusCode()
        expect(statusCommentGETMissing).toEqual(400)
        expect(resultGETMissing.message).toEqual('Parameter missing')

        let mockReqGETFalse = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/order/',
            params: { id: '629b7a10150433a92f9379ca' }

        })
        let mockResGETFalse = nodeMockHttp.createResponse()
        await controlerOrder.getOrder(mockReqGETFalse, mockResGETFalse)
        let resultGETFalse = JSON.parse(mockResGETFalse._getData())
        let statusCommentGETFalse = mockResGETFalse._getStatusCode()
        expect(statusCommentGETFalse).toEqual(404)
        expect(resultGETFalse.message).toEqual('Order does not exist')
    });
    it("Get one order by user", async () => {
        let mockReq = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/order',
            body:
            {
                _id: "629b7a10150433a92f9379cc",
                customer: "5247019073ed0c203c79b995",
                restaurant: "629549a125c2c09c52c89cfd",
                promotion: "62937edb873c350de6b596b1",
                menus: "5197c6b453cce2ec3a743811",
                delivery_time: "2022-06-04T14:31:23.000Z",
                total: 2
            }

        })
        let mockRes = nodeMockHttp.createResponse()
        await controlerOrder.createOrder(mockReq, mockRes)

        let mockReq2 = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/order',
            body:
            {
                _id: "629b7a10150433a92f9379cb",
                customer: "5247019073ed0c203c79b994",
                restaurant: "629549a125c2c09c52c89cfd",
                promotion: "62937edb873c350de6b596b1",
                menus: "5197c6b453cce2ec3a743811",
                delivery_time: "2022-06-04T14:31:23.000Z",
                total: 2
            }


        })
        let mockRes2 = nodeMockHttp.createResponse()
        await controlerOrder.createOrder(mockReq2, mockRes2)

        let mockReq3 = nodeMockHttp.createRequest({
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
        let mockRes3 = nodeMockHttp.createResponse()
        await controlerRestaurant.createRestaurant(mockReq3, mockRes3)

        let mockReqUser = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/register',
            body: {
                _id: "5247019073ed0c203c79b994",
                firstName: "Oscar",
                lastName: "Hamel",
                email: "oscar.hamel@gmail.com",
                password: "caramel",
                phone: "0606060606"
            }
        })
        let mockResUser = nodeMockHttp.createResponse()
        await controlerUser.createUser(mockReqUser, mockResUser)

        let mockReqProm = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/promotion',
            body:
            {
                _id: "62937edb873c350de6b596b1",
                menus: "629549a125c2c09c52c89cfd",
                start_date: "2022-06-06T00:00:00.000+00:00",
                end_date: "2022-06-09T00:00:00.000+00:00",
                price: 16,
            }

        })
        let mockResProm = nodeMockHttp.createResponse()
        await controlerPromotion.createPromotion(mockReqProm, mockResProm)

        let mockReqMenu = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/menu',
            body:
            {
                _id: "5197c6b453cce2ec3a743811",
                promotions: "629549a125c2c09c52c89cfa",
                photo: "629da983c638d1d0f38ee1b2",
                name: "multifruit",
                ingredient: [
                    "banane", "pomme", "poire"
                ],
                price: 22,
            }

        })
        let mockResMenu = nodeMockHttp.createResponse()
        await controlerMenu.createMenu(mockReqMenu, mockResMenu)

        let mockReqGET = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/order/findByUser/',
            params: { id: '5247019073ed0c203c79b994' }

        })
        let mockResGET = nodeMockHttp.createResponse()
        await controlerOrder.getOrderFindByUser(mockReqGET, mockResGET)
        let resultGET = JSON.parse(mockResGET._getData())
        let statusOrderGET = mockResGET._getStatusCode()
        expect(resultGET.data[0]._id).toEqual("629b7a10150433a92f9379cb")
        expect(resultGET.data[0]._id).not.toEqual("629b7a10150433a92f9379cc")
        expect(resultGET.data.restaurant).toBeDefined
        expect(resultGET.data.customer).toBeDefined
        expect(resultGET.data.promotion).toBeDefined
        expect(resultGET.data.menus).toBeDefined
        expect(statusOrderGET).toEqual(200)

        let mockReqGETMissing = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/order/',

        })
        let mockResGETMissing = nodeMockHttp.createResponse()
        await controlerOrder.getOrder(mockReqGETMissing, mockResGETMissing)
        let resultGETMissing = JSON.parse(mockResGETMissing._getData())
        let statusCommentGETMissing = mockResGETMissing._getStatusCode()
        expect(statusCommentGETMissing).toEqual(400)
        expect(resultGETMissing.message).toEqual('Parameter missing')

        let mockReqGETFalse = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/order/',
            params: { id: '629b7a10150433a92f9379ca' }

        })
        let mockResGETFalse = nodeMockHttp.createResponse()
        await controlerOrder.getOrder(mockReqGETFalse, mockResGETFalse)
        let resultGETFalse = JSON.parse(mockResGETFalse._getData())
        let statusCommentGETFalse = mockResGETFalse._getStatusCode()
        expect(statusCommentGETFalse).toEqual(404)
        expect(resultGETFalse.message).toEqual('Order does not exist')
    });
    it("Get one order by user", async () => {
        let mockReq = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/order',
            body:
            {
                _id: "629b7a10150433a92f9379cc",
                customer: "5247019073ed0c203c79b995",
                restaurant: "629549a125c2c09c52c89cfd",
                promotion: "62937edb873c350de6b596b1",
                menus: "5197c6b453cce2ec3a743811",
                delivery_time: "2022-06-04T14:31:23.000Z",
                total: 2
            }

        })
        let mockRes = nodeMockHttp.createResponse()
        await controlerOrder.createOrder(mockReq, mockRes)

        let mockReq2 = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/order',
            body:
            {
                _id: "629b7a10150433a92f9379cb",
                customer: "5247019073ed0c203c79b994",
                restaurant: "629549a125c2c09c52c89cfd",
                promotion: "62937edb873c350de6b596b1",
                menus: "5197c6b453cce2ec3a743811",
                delivery_time: "2022-06-04T14:31:23.000Z",
                total: 2
            }


        })
        let mockRes2 = nodeMockHttp.createResponse()
        await controlerOrder.createOrder(mockReq2, mockRes2)

        let mockReq3 = nodeMockHttp.createRequest({
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
        let mockRes3 = nodeMockHttp.createResponse()
        await controlerRestaurant.createRestaurant(mockReq3, mockRes3)

        let mockReqProm = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/promotion',
            body:
            {
                _id: "62937edb873c350de6b596b1",
                menus: "629549a125c2c09c52c89cfd",
                start_date: "2022-06-06T00:00:00.000+00:00",
                end_date: "2022-06-09T00:00:00.000+00:00",
                price: 16,
            }

        })
        let mockResProm = nodeMockHttp.createResponse()
        await controlerPromotion.createPromotion(mockReqProm, mockResProm)

        let mockReqMenu = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/menu',
            body:
            {
                _id: "5197c6b453cce2ec3a743811",
                promotions: "629549a125c2c09c52c89cfa",
                photo: "629da983c638d1d0f38ee1b2",
                name: "multifruit",
                ingredient: [
                    "banane", "pomme", "poire"
                ],
                price: 22,
            }

        })
        let mockResMenu = nodeMockHttp.createResponse()
        await controlerMenu.createMenu(mockReqMenu, mockResMenu)

        let mockReqGET = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/order/findByMyRestaurant/',
            params: { id: '629549a125c2c09c52c89cfd' }

        })
        let mockResGET = nodeMockHttp.createResponse()
        await controlerOrder.getOrderFindByRestaurant(mockReqGET, mockResGET)
        let resultGET = JSON.parse(mockResGET._getData())
        let statusOrderGET = mockResGET._getStatusCode()
        expect(resultGET.data[1]._id).toEqual("629b7a10150433a92f9379cb")
        expect(resultGET.data[0]._id).toEqual("629b7a10150433a92f9379cc")
        expect(resultGET.data.restaurant).toBeDefined
        expect(resultGET.data.customer).toBeDefined
        expect(resultGET.data.promotion).toBeDefined
        expect(resultGET.data.menus).toBeDefined
        expect(statusOrderGET).toEqual(200)

        let mockReqGETMissing = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/order/',

        })
        let mockResGETMissing = nodeMockHttp.createResponse()
        await controlerOrder.getOrder(mockReqGETMissing, mockResGETMissing)
        let resultGETMissing = JSON.parse(mockResGETMissing._getData())
        let statusCommentGETMissing = mockResGETMissing._getStatusCode()
        expect(statusCommentGETMissing).toEqual(400)
        expect(resultGETMissing.message).toEqual('Parameter missing')

        let mockReqGETFalse = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/order/',
            params: { id: '629b7a10150433a92f9379ca' }

        })
        let mockResGETFalse = nodeMockHttp.createResponse()
        await controlerOrder.getOrder(mockReqGETFalse, mockResGETFalse)
        let resultGETFalse = JSON.parse(mockResGETFalse._getData())
        let statusCommentGETFalse = mockResGETFalse._getStatusCode()
        expect(statusCommentGETFalse).toEqual(404)
        expect(resultGETFalse.message).toEqual('Order does not exist')
    });
    it("Put delete order", async () => {
        let mockReq = nodeMockHttp.createRequest({
            method: 'PUT',
            url: 'api/order',
            body:
            {
                _id: "629b7a10150433a92f9379cc",
                customer: "5247019073ed0c203c79b995",
                restaurant: "62937edb873c350de6b596b2",
                promotion: "62937edb873c350de6b596b1",
                menus: "5197c6b453cce2ec3a743811",
                delivery_time: "2022-06-04T14:31:23.000Z",
                total: 2
            }

        })
        let mockRes = nodeMockHttp.createResponse()
        await controlerOrder.createOrder(mockReq, mockRes)

        let mockReqDELFalse = nodeMockHttp.createRequest({
            method: 'DEL',
            url: 'api/order/',
            params: { id: '629b7a10150433a92f9379cb' },
        })
        let mockResDELFalse = nodeMockHttp.createResponse()
        await controlerOrder.deleteOrder(mockReqDELFalse, mockResDELFalse)
        let resultDELFalse = JSON.parse(mockResDELFalse._getData())
        let statusCommentDELFalse = mockResDELFalse._getStatusCode()
        expect(statusCommentDELFalse).toEqual(404)
        expect(resultDELFalse.message).toEqual('Order does not exist')

        let mockReqDEL = nodeMockHttp.createRequest({
            method: 'DELETE',
            url: 'api/order/',
            params: { id: '629b7a10150433a92f9379cc' },

        })

        let mockResDEL = nodeMockHttp.createResponse()
        await controlerOrder.deleteOrder(mockReqDEL, mockResDEL)
        let resultDEL = JSON.parse(mockResDEL._getData())
        let statusCommentDEL = mockResDEL._getStatusCode()
        expect(resultDEL.data._id).toEqual("629b7a10150433a92f9379cc")
        expect(resultDEL.message).toEqual('Order removed')
        expect(statusCommentDEL).toEqual(200)
        let mockReqGET = nodeMockHttp.createRequest({
            method: 'GET',
            url: 'api/order/',
            params: { id: '629b7a10150433a92f9379cc' }

        })
        let mockResGET = nodeMockHttp.createResponse()
        await controlerOrder.getOrder(mockReqGET, mockResGET)
        let resultGET = JSON.parse(mockResGET._getData())
        let statusOrderGET = mockResGET._getStatusCode()
        expect(statusOrderGET).toEqual(404)
        expect(resultGET.message).toEqual('Order does not exist')

        let mockReqDELMissing = nodeMockHttp.createRequest({
            method: 'DEL',
            url: 'api/order/',
        })
        let mockResDELMissing = nodeMockHttp.createResponse()
        await controlerOrder.deleteOrder(mockReqDELMissing, mockResDELMissing)
        let resultDELMissing = JSON.parse(mockResDELMissing._getData())
        let statusCommentDELMissing = mockResDELMissing._getStatusCode()
        expect(statusCommentDELMissing).toEqual(400)
        expect(resultDELMissing.message).toEqual('Parameter missing')

    });
})




