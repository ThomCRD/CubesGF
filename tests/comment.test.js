const express = require('express');
const Comment = require("../API/models/comment");
const db = require("./testDb");
const nodeMockHttp = require('node-mocks-http')
const controlerComment = require('../API/controllers/comment');
const controlerRestaurant = require('../API/controllers/restaurant');
const controlerUser = require('../API/controllers/user');


beforeAll(async () => {
  await db.setUp();
});
afterEach(async () => {
  await db.dropCollections();
});
afterAll(async () => {
  await db.dropDatabase();
});


describe("Test controler Comment", () => {
  it("create comment ", async () => {

    let mockReqTrue = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/comment',
      body: {
        _iduser: "562b2649b2e70464f113c04d",
        _idRestaurant: "562b2649b2e70464f113c04e",
        contenuTexte: "Test",
        note: "3",
      }
    })
    let mockResTrue = nodeMockHttp.createResponse()
    await controlerComment.createComment(mockReqTrue, mockResTrue)
    let resultTrue = JSON.parse(mockResTrue._getData())
    let statusCommentTrue = mockResTrue._getStatusCode()
    expect(statusCommentTrue).toBe(200)
    expect(resultTrue.message).toBe("Comment created")
    expect(resultTrue.data._iduser).toEqual("562b2649b2e70464f113c04d")
    expect(resultTrue.data._idRestaurant).toEqual("562b2649b2e70464f113c04e")
    expect(resultTrue.data.contenuTexte).toEqual("Test")
    expect(resultTrue.data.note).toEqual("3")

    let mockReqFalse = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/comment',
      body: {
        _iduser: "300",
        _idRestaurant: "700",
        ContenuTexte: "Test",
        Notation: "3",
      }
    })
    let mockResFalse = nodeMockHttp.createResponse()
    await controlerComment.createComment(mockReqFalse, mockResFalse)
    let resultFalse = JSON.parse(mockResFalse._getData())
    let statusCommentFalse = mockResFalse._getStatusCode()
    expect(statusCommentFalse).toBe(400)
    expect(resultFalse.message).toBe("Data Missing")

  });
  it("Get all comment", async () => {
    let mockReq = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/comment',
      body: 
      {
          _id:"6293445ba397f4d94b3ff23f",
          _iduser: '562b2649b2e70464f113c04e',
          _idRestaurant: '562b2649b2e70464f113c04d',
          contenuTexte: 'Test',
          note: '3',
          __v: 0
      }
      
    })
    let mockRes = nodeMockHttp.createResponse()
    await controlerComment.createComment(mockReq, mockRes)

    let mockReq2 = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/comment',
      body: 
      {
        _id:"629344e6dbb7fc6ae5c7d0f1",
          _iduser: '562b2649b2e70464f113c04c',
          _idRestaurant: '53f1f09f2cdcc8f339e5efa2',
          contenuTexte: 'Test',
          note: '3',
          __v: 0
      }
      
    })
    let mockRes2 = nodeMockHttp.createResponse()
    await controlerComment.createComment(mockReq2, mockRes2)
    let mockReqGET = nodeMockHttp.createRequest(({
      method: 'GET',
      url: 'api/comments'}))
    let mockResGET = nodeMockHttp.createResponse()
    await controlerComment.getComments(mockReqGET, mockResGET)
    let resultGET = JSON.parse(mockResGET._getData())
    let statusCommentGET = mockResGET._getStatusCode()
    expect(statusCommentGET).toBe(200)
    expect(resultGET).toBeDefined()
    expect(resultGET.data[0]._id).toEqual("6293445ba397f4d94b3ff23f")
    expect(resultGET.data[1]._id).toEqual("629344e6dbb7fc6ae5c7d0f1")
  });
  it("Get one comment", async () => {
    let mockReq = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/comment',
      body: 
      {
        _id:"629336128b03db82aa8c5995",
        _iduser: '562b2649b2e70464f113c04c',
        _idRestaurant: '53f1f09f2cdcc8f339e5efa2',
        contenuTexte: 'Test',
        note: '3',
        __v: 0
      }
      
    })
    let mockRes = nodeMockHttp.createResponse()
    await controlerComment.createComment(mockReq, mockRes)

    let mockReq2 = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/comment',
      body: 
      {
        _id:"629336128b03db82aa8c5996",
        _iduser: '562b2649b2e70464f113c04b',
        _idRestaurant: '53f1f09f2cdcc8f339e5efa1',
        contenuTexte: 'Test',
        note: '3',
        __v: 0
      }
      
    })
    let mockRes2 = nodeMockHttp.createResponse()
    await controlerComment.createComment(mockReq2, mockRes2)


    let mockReqGET = nodeMockHttp.createRequest({
      method: 'GET',
      url: 'api/comment/',
      params:{id:'629336128b03db82aa8c5996'}
  
    })
    let mockResGET = nodeMockHttp.createResponse()
    await controlerComment.getComment(mockReqGET,mockResGET)
    let resultGET = JSON.parse(mockResGET._getData())
    let statusCommentGET = mockResGET._getStatusCode()
    expect(resultGET.data._id).toEqual("629336128b03db82aa8c5996")
    expect(resultGET.data._id).not.toEqual("629336128b03db82aa8c5995")
    expect(statusCommentGET).toEqual(200)

    let mockReqGETMissing = nodeMockHttp.createRequest({
      method: 'GET',
      url: 'api/comment/',

    })
    let mockResGETMissing = nodeMockHttp.createResponse()
    await controlerComment.getComment(mockReqGETMissing,mockResGETMissing)
    let resultGETMissing = JSON.parse(mockResGETMissing._getData())
    let statusCommentGETMissing = mockResGETMissing._getStatusCode()
    expect(statusCommentGETMissing).toEqual(400)
    expect(resultGETMissing.message).toEqual('Parameter missing')

    let mockReqGETFalse = nodeMockHttp.createRequest({
      method: 'GET',
      url: 'api/comment/',
      params:{id:'629336128b03db82aa8c5998'}

    })
    let mockResGETFalse = nodeMockHttp.createResponse()
    await controlerComment.getComment(mockReqGETFalse,mockResGETFalse)
    let resultGETFalse = JSON.parse(mockResGETFalse._getData())
    let statusCommentGETFalse = mockResGETFalse._getStatusCode()
    expect(statusCommentGETFalse).toEqual(404)
    expect(resultGETFalse.message).toEqual('the comment does not exist ')
  });
  it("Get one comment find mine", async () => {
    let mockReq = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/comment',
      body: 
      {
        _id:"629336128b03db82aa8c5995",
        _iduser: '562b2649b2e70464f113c04c',
        _idRestaurant: '53f1f09f2cdcc8f339e5efa2',
        contenuTexte: 'Test',
        note: '3',
        __v: 0
      }
      
    })
    let mockRes = nodeMockHttp.createResponse()
    await controlerComment.createComment(mockReq, mockRes)

    let mockReq2 = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/comment',
      body: 
      {
        _id:"629336128b03db82aa8c5996",
        _iduser: '562b2649b2e70464f113c04b',
        _idRestaurant: '53f1f09f2cdcc8f339e5efa1',
        contenuTexte: 'Test',
        note: '3',
        __v: 0
      }
      
    })
    let mockRes2 = nodeMockHttp.createResponse()
    await controlerComment.createComment(mockReq2, mockRes2)


    let mockReqGET = nodeMockHttp.createRequest({
      method: 'GET',
      url: 'api/comment/findMine/',
      params:{id:'562b2649b2e70464f113c04b'}
  
    })
    let mockResGET = nodeMockHttp.createResponse()
    await controlerComment.getCommentFindMine(mockReqGET,mockResGET)
    let resultGET = JSON.parse(mockResGET._getData())
    let statusCommentGET = mockResGET._getStatusCode()
    expect(resultGET.data[0]._id).toEqual("629336128b03db82aa8c5996")
    expect(resultGET.data[0]._id).not.toEqual("629336128b03db82aa8c5995")
    expect(statusCommentGET).toEqual(200)

    let mockReqGETMissing = nodeMockHttp.createRequest({
      method: 'GET',
      url: 'api/comment/',

    })
    let mockResGETMissing = nodeMockHttp.createResponse()
    await controlerComment.getComment(mockReqGETMissing,mockResGETMissing)
    let resultGETMissing = JSON.parse(mockResGETMissing._getData())
    let statusCommentGETMissing = mockResGETMissing._getStatusCode()
    expect(statusCommentGETMissing).toEqual(400)
    expect(resultGETMissing.message).toEqual('Parameter missing')

    let mockReqGETFalse = nodeMockHttp.createRequest({
      method: 'GET',
      url: 'api/comment/',
      params:{id:'629336128b03db82aa8c5998'}

    })
    let mockResGETFalse = nodeMockHttp.createResponse()
    await controlerComment.getComment(mockReqGETFalse,mockResGETFalse)
    let resultGETFalse = JSON.parse(mockResGETFalse._getData())
    let statusCommentGETFalse = mockResGETFalse._getStatusCode()
    expect(statusCommentGETFalse).toEqual(404)
    expect(resultGETFalse.message).toEqual('the comment does not exist ')
  });
  it("Get one comment find by user", async () => {
    let mockReq = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/comment',
      body: 
      {
        _id:"629336128b03db82aa8c5995",
        _iduser: '562b2649b2e70464f113c04c',
        _idRestaurant: '53f1f09f2cdcc8f339e5efa1',
        contenuTexte: 'Test',
        note: '3',
        __v: 0
      }
      
    })
    let mockRes = nodeMockHttp.createResponse()
    await controlerComment.createComment(mockReq, mockRes)

    let mockReq2 = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/comment',
      body: 
      {
        _id:"629336128b03db82aa8c5996",
        _iduser: '562b2649b2e70464f113c04b',
        _idRestaurant: '53f1f09f2cdcc8f339e5efa1',
        contenuTexte: 'Test',
        note: '3',
        __v: 0
      }
      
    })
    let mockRes2 = nodeMockHttp.createResponse()
    await controlerComment.createComment(mockReq2, mockRes2)

    let mockReq3 = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/restaurant',
      body:
      {
          _id: "53f1f09f2cdcc8f339e5efa1",
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

    let mockReqGET = nodeMockHttp.createRequest({
      method: 'GET',
      url: 'api/comment/findByUser/',
      params:{id:'562b2649b2e70464f113c04b'}
  
    })
    let mockResGET = nodeMockHttp.createResponse()
    await controlerComment.getCommentFindByUser(mockReqGET,mockResGET)
    let resultGET = JSON.parse(mockResGET._getData())
    let statusCommentGET = mockResGET._getStatusCode()
    expect(resultGET.data[0]._id).toEqual("629336128b03db82aa8c5996")
    expect(resultGET.data[0]._id).not.toEqual("629336128b03db82aa8c5995")
    expect(resultGET.data[0]._idRestaurant).toBeDefined
    expect(statusCommentGET).toEqual(200)

    let mockReqGETMissing = nodeMockHttp.createRequest({
      method: 'GET',
      url: 'api/comment/',

    })
    let mockResGETMissing = nodeMockHttp.createResponse()
    await controlerComment.getComment(mockReqGETMissing,mockResGETMissing)
    let resultGETMissing = JSON.parse(mockResGETMissing._getData())
    let statusCommentGETMissing = mockResGETMissing._getStatusCode()
    expect(statusCommentGETMissing).toEqual(400)
    expect(resultGETMissing.message).toEqual('Parameter missing')

    let mockReqGETFalse = nodeMockHttp.createRequest({
      method: 'GET',
      url: 'api/comment/',
      params:{id:'629336128b03db82aa8c5998'}

    })
    let mockResGETFalse = nodeMockHttp.createResponse()
    await controlerComment.getComment(mockReqGETFalse,mockResGETFalse)
    let resultGETFalse = JSON.parse(mockResGETFalse._getData())
    let statusCommentGETFalse = mockResGETFalse._getStatusCode()
    expect(statusCommentGETFalse).toEqual(404)
    expect(resultGETFalse.message).toEqual('the comment does not exist ')
  });
  it("Get one comment find by restaurant", async () => {
    let mockReq = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/comment',
      body: 
      {
        _id:"629336128b03db82aa8c5995",
        _iduser: '562b2649b2e70464f113c04c',
        _idRestaurant: '53f1f09f2cdcc8f339e5efa2',
        contenuTexte: 'Test',
        note: '3',
        __v: 0
      }
      
    })
    let mockRes = nodeMockHttp.createResponse()
    await controlerComment.createComment(mockReq, mockRes)

    let mockReq2 = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/comment',
      body: 
      {
        _id:"629336128b03db82aa8c5996",
        _iduser: '5247019073ed0c203c79b994',
        _idRestaurant: '53f1f09f2cdcc8f339e5efa1',
        contenuTexte: 'Test',
        note: '3',
        __v: 0
      }
      
    })
    let mockRes2 = nodeMockHttp.createResponse()
    await controlerComment.createComment(mockReq2, mockRes2)

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

    let mockReqGET = nodeMockHttp.createRequest({
      method: 'GET',
      url: 'api/comment/findByRestaurant/',
      params:{id:'53f1f09f2cdcc8f339e5efa1'}
  
    })
    let mockResGET = nodeMockHttp.createResponse()
    await controlerComment.getCommentFindByRestaurant(mockReqGET,mockResGET)
    let resultGET = JSON.parse(mockResGET._getData())
    console.log(resultGET)
    let statusCommentGET = mockResGET._getStatusCode()
    expect(resultGET.data[0]._id).toEqual("629336128b03db82aa8c5996")
    expect(resultGET.data[0]._id).not.toEqual("629336128b03db82aa8c5995")
    expect(resultGET.data[0]._idRestaurant).toBeDefined
    expect(statusCommentGET).toEqual(200)

    let mockReqGETMissing = nodeMockHttp.createRequest({
      method: 'GET',
      url: 'api/comment/',

    })
    let mockResGETMissing = nodeMockHttp.createResponse()
    await controlerComment.getComment(mockReqGETMissing,mockResGETMissing)
    let resultGETMissing = JSON.parse(mockResGETMissing._getData())
    let statusCommentGETMissing = mockResGETMissing._getStatusCode()
    expect(statusCommentGETMissing).toEqual(400)
    expect(resultGETMissing.message).toEqual('Parameter missing')

    let mockReqGETFalse = nodeMockHttp.createRequest({
      method: 'GET',
      url: 'api/comment/',
      params:{id:'629336128b03db82aa8c5998'}

    })
    let mockResGETFalse = nodeMockHttp.createResponse()
    await controlerComment.getComment(mockReqGETFalse,mockResGETFalse)
    let resultGETFalse = JSON.parse(mockResGETFalse._getData())
    let statusCommentGETFalse = mockResGETFalse._getStatusCode()
    expect(statusCommentGETFalse).toEqual(404)
    expect(resultGETFalse.message).toEqual('the comment does not exist ')
  });
  it("Put update comment", async () => {
    let mockReq = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/comment',
      body: 
      {
        _id: '629336ca3c46ac8ed920a8c9',
        _iduser: '562b2649b2e70464f113c04c',
        _idRestaurant: '53f1f09f2cdcc8f339e5efa2',
        contenuTexte: 'Test',
        note: '3',
        __v: 0
      }
      
    })
    let mockRes = nodeMockHttp.createResponse()
    await controlerComment.createComment(mockReq, mockRes)

    let mockReqPUT = nodeMockHttp.createRequest({
      method: 'PATCH',
      url: 'api/comment/',
      params:{id:'629336ca3c46ac8ed920a8c9'},
      body:{contenuTexte: 'Modify'}
    })
    let mockResPUT = nodeMockHttp.createResponse()
    await controlerComment.updateComment(mockReqPUT,mockResPUT)
    let resultPUT = JSON.parse(mockResPUT._getData())
    let statusCommentPUT = mockResPUT._getStatusCode()
    expect(resultPUT.data._id).toEqual("629336ca3c46ac8ed920a8c9")
    expect(resultPUT.data.contenuTexte).toEqual("Modify")
    expect(statusCommentPUT).toEqual(200)

    let mockReqPUTMissing = nodeMockHttp.createRequest({
      method: 'PATCH',
      url: 'api/comment/',
      body:{contenuTexte: 'Modify'}
    })
    let mockResPUTMissing = nodeMockHttp.createResponse()
    await controlerComment.updateComment(mockReqPUTMissing,mockResPUTMissing)
    let resultPUTMissing = JSON.parse(mockResPUTMissing._getData())
    let statusCommentPUTMissing = mockResPUTMissing._getStatusCode()
    expect(statusCommentPUTMissing).toEqual(400)
    expect(resultPUTMissing.message).toEqual('Parameter missing')

    let mockReqPUTFalse = nodeMockHttp.createRequest({
      method: 'PATCH',
      url: 'api/comment/',
      params:{id:'629336ca3c46ac8ed920a8c0'},
      body:{ContenuTexte: 'Modify'}
    })
    let mockResPUTFalse = nodeMockHttp.createResponse()
    await controlerComment.updateComment(mockReqPUTFalse,mockResPUTFalse)
    let resultPUTFalse = JSON.parse(mockResPUTFalse._getData())
    let statusCommentPUTFalse = mockResPUTFalse._getStatusCode()
    expect(statusCommentPUTFalse).toEqual(404)
    expect(resultPUTFalse.message).toEqual('the comment does not exist ')
    
  });
  it("Put delete comment", async () => {
    let mockReq = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/comment',
      body: 
      {
        _id: '62934b50ee4aa3bf1642a47a',
        _iduser: '562b2649b2e70464f113c04c',
        _idRestaurant: '53f1f09f2cdcc8f339e5efa2',
        contenuTexte: 'Test delete',
        note: '3',
        __v: 0
      }
      
    })
    let mockRes = nodeMockHttp.createResponse()
    await controlerComment.createComment(mockReq, mockRes)

    let mockReqDELFalse = nodeMockHttp.createRequest({
      method: 'DEL',
      url: 'api/comment/',
      params:{id:'62934b50ee4aa3bf1642a47b'},
    })
    let mockResDELFalse = nodeMockHttp.createResponse()
    await controlerComment.deleteComment(mockReqDELFalse,mockResDELFalse)
    let resultDELFalse = JSON.parse(mockResDELFalse._getData())
    let statusCommentDELFalse = mockResDELFalse._getStatusCode()
    expect(statusCommentDELFalse).toEqual(404)
    expect(resultDELFalse.message).toEqual('the comment does not exist ')

    let mockReqDEL = nodeMockHttp.createRequest({
      method: 'DELETE',
      url: 'api/comment/',
      params:{id:'62934b50ee4aa3bf1642a47a'},

    })
  
    let mockResDEL = nodeMockHttp.createResponse()
    await controlerComment.deleteComment(mockReqDEL,mockResDEL)
    let resultDEL = JSON.parse(mockResDEL._getData())
    let statusCommentDEL = mockResDEL._getStatusCode()
    expect(resultDEL.data._iduser).toEqual("562b2649b2e70464f113c04c")
    expect(resultDEL.data._idRestaurant).toEqual("53f1f09f2cdcc8f339e5efa2")
    expect(resultDEL.data.contenuTexte).toEqual("Test delete")
    expect(resultDEL.data.note).toEqual("3")
    expect(resultDEL.message).toEqual('Comment removed')
    expect(statusCommentDEL).toEqual(200)
    let mockReqGET = nodeMockHttp.createRequest({
      method: 'GET',
      url: 'api/comment/',
      params:{id:'62934b50ee4aa3bf1642a47a'}
  
    })
    let mockResGET = nodeMockHttp.createResponse()
    await controlerComment.getComment(mockReqGET,mockResGET)
    let resultGET = JSON.parse(mockResGET._getData())
    let statusCommentGET = mockResGET._getStatusCode()
    expect(statusCommentGET).toEqual(404)
    expect(resultGET.message).toEqual('the comment does not exist ')

    let mockReqDELMissing = nodeMockHttp.createRequest({
      method: 'DEL',
      url: 'api/comment/',
    })
    let mockResDELMissing = nodeMockHttp.createResponse()
    await controlerComment.deleteComment(mockReqDELMissing,mockResDELMissing)
    let resultDELMissing = JSON.parse(mockResDELMissing._getData())
    let statusCommentDELMissing = mockResDELMissing._getStatusCode()
    expect(statusCommentDELMissing).toEqual(400)
    expect(resultDELMissing.message).toEqual('Parameter missing')

  });
})




