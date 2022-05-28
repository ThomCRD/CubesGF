const express = require('express');
const User = require("../API/models/user");
const db = require("./testDb");
const nodeMockHttp = require('node-mocks-http')
const controlerUser = require('../API/controllers/user');
const bcrypt = require('bcryptjs');

beforeAll(async () => {
    await db.setUp();
  });
  afterEach(async () => {
    await db.dropCollections();
  });
  afterAll(async () => {
    await db.dropDatabase();
  });

  describe("Test controler User", () => {

    it("create user ", async () => {
  
      let mockReqTrue = nodeMockHttp.createRequest({
        method: 'POST',
        url: 'api/register',
        body: {
          _id: "2333",
          firstName: "Oscar",
          lastName: "Hamel",
          email: "oscar.hamel@gmail.com",
          password: "caramel",
          phone: "0606060606"
        }
      })
      let mockResTrue = nodeMockHttp.createResponse()
      await controlerUser.createUser(mockReqTrue, mockResTrue)
      let resultTrue = JSON.parse(mockResTrue._getData())
      let statusUserTrue = mockResTrue._getStatusCode()
      expect(statusUserTrue).toBe(200)
      expect(resultTrue.message).toBe("User created")
      expect(resultTrue.data._id).toEqual("2333")
      expect(resultTrue.data.firstName).toEqual("Oscar")
      expect(resultTrue.data.lastName).toEqual("Hamel")
      expect(resultTrue.data.email).toEqual("oscar.hamel@gmail.com")
      expect(resultTrue.data.phone).toEqual("0606060606")
      const test = await bcrypt.compare("caramel",resultTrue.data.password )
      expect(test).toEqual(true)

  
      let mockReqFalseEmail = nodeMockHttp.createRequest({
        method: 'POST',
        url: 'api/register',
        body: {
          _id: "23",
          firstName: "Alain",
          lastName: "Térieur",
          email: "Alain.Térieur@gmail",
          password: "dedans",
          phone: "0606060606"
        }
      })
      let mockResFalseEmail = nodeMockHttp.createResponse()
      await controlerUser.createUser(mockReqFalseEmail, mockResFalseEmail)
      let resultFalseEmail = JSON.parse(mockResFalseEmail._getData())
      let statusCommentFalseEmail = mockResFalseEmail._getStatusCode()
      expect(statusCommentFalseEmail).toBe(500)
      expect(resultFalseEmail.message).toBe("Database error")
      expect(resultFalseEmail.error.errors.email.message).toBe("invalid email")

      let mockReqTrueUserAlreadyExists = nodeMockHttp.createRequest({
        method: 'POST',
        url: 'api/register',
        body: {
          _id: "2333",
          firstName: "Oscar",
          lastName: "Hamel",
          email: "oscar.hamel@gmail.com",
          password: "caramel",
          phone: "0606060606"
        }
      })
      let mockResTrueUserAlreadyExists = nodeMockHttp.createResponse()
      await controlerUser.createUser(mockReqTrueUserAlreadyExists, mockResTrueUserAlreadyExists)
      let resultTrueUserAlreadyExists = JSON.parse(mockResTrueUserAlreadyExists._getData())
      let statusUserTrueUserAlreadyExist = mockResTrueUserAlreadyExists._getStatusCode()
      expect(statusUserTrueUserAlreadyExist).toBe(400)
      expect(resultTrueUserAlreadyExists.message).toEqual("The user :2333 does exist")

      let mockReqTrueUserDataMissing = nodeMockHttp.createRequest({
        method: 'POST',
        url: 'api/register',
        body: {
          _id: "123",
          firstName: "Alex",
          lastName: "Térieur",
          email: "Alex.Térieur@gmail.com",
          password: "dehors",
        }
      })
      let mockResTrueUserDataMissing = nodeMockHttp.createResponse()
      await controlerUser.createUser(mockReqTrueUserDataMissing, mockResTrueUserDataMissing)
      let resultTrueUserDataMissing = JSON.parse(mockResTrueUserDataMissing._getData())
      let statusUserTrueDataMissing = mockResTrueUserDataMissing._getStatusCode()
      expect(statusUserTrueDataMissing).toBe(400)
      expect(resultTrueUserDataMissing.message).toEqual("Data Missing")
      
    });
    it("Get all Users", async () => {
        let mockReqTrue = nodeMockHttp.createRequest({
            method: 'POST',
            url: 'api/register',
            body: {
              _id: "1",
              firstName: "Anna",
              lastName: "Tomie",
              email: "Anna.Tomie@gmail.com",
              password: "corps",
              phone: "0606060606"
            }
          })
          let mockResTrue = nodeMockHttp.createResponse()
          await controlerUser.createUser(mockReqTrue, mockResTrue)
    
          let mockReqTrue2 = nodeMockHttp.createRequest({
            method: 'POST',
            url: 'api/register',
            body: {
              _id: "2",
              firstName: "Camille ",
              lastName: "Zole",
              email: "Camille.Zole@gmail.com",
              password: "fou",
              phone: "0606060606"
            }
          })
          let mockResTrue2 = nodeMockHttp.createResponse()
          await controlerUser.createUser(mockReqTrue2, mockResTrue2)
    
        let mockReqGET = nodeMockHttp.createRequest(({
          method: 'GET',
          url: 'api/users'}))
        let mockResGET = nodeMockHttp.createResponse()
        await controlerUser.getAllUsers(mockReqGET, mockResGET)
        let resultGET = JSON.parse(mockResGET._getData())
        let statusCommentGET = mockResGET._getStatusCode()
        expect(statusCommentGET).toBe(200)
        expect(resultGET).toBeDefined()
        expect(resultGET.data[0]._id).toEqual("1")
        expect(resultGET.data[1]._id).toEqual("2")
      });
    it("Get one User", async () => {
        let mockReqTrue = nodeMockHttp.createRequest({
            method: 'POST',
            url: 'api/register',
            body: {
              _id: "11",
              firstName: "Edmond",
              lastName: "Prochain",
              email: "Edmond.Prochain@gmail.com",
              password: "saveme",
              phone: "0606060606"
            }
          })
          let mockResTrue = nodeMockHttp.createResponse()
          await controlerUser.createUser(mockReqTrue, mockResTrue)
    
          let mockReqTrue2 = nodeMockHttp.createRequest({
            method: 'POST',
            url: 'api/register',
            body: {
              _id: "22",
              firstName: "Garcin",
              lastName: "Lazare",
              email: "Garcin.Lazare@gmail.com",
              password: "enretard",
              phone: "0606060606"
            }
          })
          let mockResTrue2 = nodeMockHttp.createResponse()
          await controlerUser.createUser(mockReqTrue2, mockResTrue2)
    
    
        let mockReqGET = nodeMockHttp.createRequest({
          method: 'GET',
          url: 'api/user/',
          params:{userID:'22'}
      
        })
        let mockResGET = nodeMockHttp.createResponse()
        await controlerUser.getUser(mockReqGET,mockResGET)
        let resultGET = JSON.parse(mockResGET._getData())
        let statusCommentGET = mockResGET._getStatusCode()
        expect(resultGET.data._id).toEqual("22")
        expect(resultGET.data._id).not.toEqual("11")
        expect(statusCommentGET).toEqual(200)
    
        let mockReqGETMissing = nodeMockHttp.createRequest({
          method: 'GET',
          url: 'api/user/',
    
        })
        let mockResGETMissing = nodeMockHttp.createResponse()
        await controlerUser.getUser(mockReqGETMissing,mockResGETMissing)
        let resultGETMissing = JSON.parse(mockResGETMissing._getData())
        let statusCommentGETMissing = mockResGETMissing._getStatusCode()
        expect(statusCommentGETMissing).toEqual(400)
        expect(resultGETMissing.message).toEqual('Parameter missing')
    
        let mockReqGETFalse = nodeMockHttp.createRequest({
          method: 'GET',
          url: 'api/user/',
          params:{userID:'3'}
    
        })
        let mockResGETFalse = nodeMockHttp.createResponse()
        await controlerUser.getUser(mockReqGETFalse,mockResGETFalse)
        let resultGETFalse = JSON.parse(mockResGETFalse._getData())
        let statusCommentGETFalse = mockResGETFalse._getStatusCode()
        expect(statusCommentGETFalse).toEqual(404)
        expect(resultGETFalse.message).toEqual('User does not exist')
      });
    it("Put update User", async () => {
        let mockReqTrue = nodeMockHttp.createRequest({
            method: 'POST',
            url: 'api/register',
            body: {
              _id: "111",
              firstName: "Henri",
              lastName: "G",
              email: "Henri.Gole@gmail.com",
              password: "mouahahaha",
              phone: "0606060606"
            }
          })
          let mockResTrue = nodeMockHttp.createResponse()
          await controlerUser.createUser(mockReqTrue, mockResTrue)
    
        let mockReqPUT = nodeMockHttp.createRequest({
          method: 'PUT',
          url: 'api/user/',
          params:{userID:'111'},
          body:{lastName: 'Gole'}
        })
        let mockResPUT = nodeMockHttp.createResponse()
        await controlerUser.updateUser(mockReqPUT,mockResPUT)
        let resultPUT = JSON.parse(mockResPUT._getData())
        let statusCommentPUT = mockResPUT._getStatusCode()
        expect(resultPUT.data._id).toEqual("111")
        expect(resultPUT.data.lastName).toEqual("Gole")
        expect(statusCommentPUT).toEqual(200)
    
        let mockReqPUTMissing = nodeMockHttp.createRequest({
          method: 'PUT',
          url: 'api/user/',
          body:{lastName: 'Gaule'}
        })
        let mockResPUTMissing = nodeMockHttp.createResponse()
        await controlerUser.updateUser(mockReqPUTMissing,mockResPUTMissing)
        let resultPUTMissing = JSON.parse(mockResPUTMissing._getData())
        let statusCommentPUTMissing = mockResPUTMissing._getStatusCode()
        expect(statusCommentPUTMissing).toEqual(400)
        expect(resultPUTMissing.message).toEqual('Parameter missing')
    
        let mockReqPUTFalse = nodeMockHttp.createRequest({
          method: 'PUT',
          url: 'api/user/',
          params:{userID:'3'},
          body:{lastName: 'Gaule'}
        })
        let mockResPUTFalse = nodeMockHttp.createResponse()
        await controlerUser.updateUser(mockReqPUTFalse,mockResPUTFalse)
        let resultPUTFalse = JSON.parse(mockResPUTFalse._getData())
        let statusCommentPUTFalse = mockResPUTFalse._getStatusCode()
        expect(statusCommentPUTFalse).toEqual(404)
        expect(resultPUTFalse.message).toEqual('User does not exist ')
        
      });
    it("Put delete comment", async () => {
        let mockReqTrue = nodeMockHttp.createRequest({
            method: 'POST',
            url: 'api/register',
            body: {
              _id: "666",
              firstName: "Jacques",
              lastName: "Ouzi",
              email: "Jacques.Ouzi@gmail.com",
              password: "OKLM",
              phone: "0606060606"
            }
          })
          let mockResTrue = nodeMockHttp.createResponse()
          await controlerUser.createUser(mockReqTrue, mockResTrue)
    
        let mockReqDELFalse = nodeMockHttp.createRequest({
          method: 'DEL',
          url: 'api/user/',
          params:{userID:'66'},
        })
        let mockResDELFalse = nodeMockHttp.createResponse()
        await controlerUser.deleteUser(mockReqDELFalse,mockResDELFalse)
        let resultDELFalse = JSON.parse(mockResDELFalse._getData())
        let statusCommentDELFalse = mockResDELFalse._getStatusCode()
        expect(statusCommentDELFalse).toEqual(404)
        expect(resultDELFalse.message).toEqual('User does not exist ')

        let mockReqDELMissing = nodeMockHttp.createRequest({
            method: 'DEL',
            url: 'api/user/',
          })
          let mockResDELMissing = nodeMockHttp.createResponse()
          await controlerUser.deleteUser(mockReqDELMissing,mockResDELMissing)
          let resultDELMissing = JSON.parse(mockResDELMissing._getData())
          let statusCommentDELMissing = mockResDELMissing._getStatusCode()
          expect(statusCommentDELMissing).toEqual(400)
          expect(resultDELMissing.message).toEqual('Parameter missing')
    
        let mockReqDEL = nodeMockHttp.createRequest({
          method: 'DELETE',
          url: 'api/comment/',
          params:{userID:'666'},
    
        })
      
        let mockResDEL = nodeMockHttp.createResponse()
        await controlerUser.deleteUser(mockReqDEL,mockResDEL)
        let resultDEL = JSON.parse(mockResDEL._getData())
        let statusCommentDEL = mockResDEL._getStatusCode()
        expect(resultDEL.message).toEqual('User removed')
        expect(statusCommentDEL).toEqual(200)

        let mockReqGET = nodeMockHttp.createRequest({
          method: 'GET',
          url: 'api/user/',
          params:{userID:'666'}
      
        })
        let mockResGET = nodeMockHttp.createResponse()
        await controlerUser.getUser(mockReqGET,mockResGET)
        let resultGET = JSON.parse(mockResGET._getData())
        let statusCommentGET = mockResGET._getStatusCode()
        expect(statusCommentGET).toEqual(404)
        expect(resultGET.message).toEqual('User does not exist')
    
      });
  })
  