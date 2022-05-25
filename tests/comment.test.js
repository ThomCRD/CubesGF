const express = require('express');
const Comment = require("../API/models/comment");
const db = require("./testDb");
const nodeMockHttp = require('node-mocks-http')
const controlerComment = require('../API/controllers/comment');


beforeAll(async () => {
  await db.setUp();
});
afterEach(async () => {
  await db.dropCollections();
});
afterAll(async () => {
  await db.dropDatabase();
});

let dataCommentTrueCreate = new Comment({
  _id: "2333",
  _iduser: "300",
  _idRestaurant: "700",
  ContenuTexte: "Test",
  Note: "3",
  __v: 0
});
let dataCommentTrueGet = new Comment(
    {
      _id: '2345',
      _iduser: '213',
      _idRestaurant: '2345',
      ContenuTexte: 'Test',
      Note: '3',
      __v: 0
    }
);
let dataCommentTrueGet2 = new Comment(
  {
    _id: '223',
    _iduser: '213',
    _idRestaurant: '223',
    ContenuTexte: 'Test',
    Note: '3',
    __v: 0
  }
);
let dataCommentDEL = new Comment(
  {
    _id: '3',
    _iduser: '34',
    _idRestaurant: '56',
    ContenuTexte: 'Test delete',
    Note: '3',
    __v: 0
  }
);


describe("Test controler Comment", () => {
  it("create comment ", async () => {

    let mockReqTrue = nodeMockHttp.createRequest({
      method: 'POST',
      url: 'api/comment',
      body: {
        _id: "2333",
        _iduser: "300",
        _idRestaurant: "700",
        ContenuTexte: "Test",
        Note: "3",
      }
    })
    let mockResTrue = nodeMockHttp.createResponse()
    await controlerComment.createComment(mockReqTrue, mockResTrue)
    let resultTrue = JSON.parse(mockResTrue._getData())
    let statusCommentTrue = mockResTrue._getStatusCode()
    expect(statusCommentTrue).toBe(200)
    expect(resultTrue.message).toBe("Comment created")
    expect(resultTrue.data).toEqual(dataCommentTrueCreate._doc)

    let mockReqFalse = nodeMockHttp.createRequest({
      method: 'POST',
      url: 'api/comment',
      body: {
        _id: "2333",
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
      method: 'POST',
      url: 'api/comment',
      body: 
      {
          _id: '2345',
          _iduser: '213',
          _idRestaurant: '2345',
          ContenuTexte: 'Test',
          Note: '3',
          __v: 0
      }
      
    })
    let mockRes = nodeMockHttp.createResponse()
    await controlerComment.createComment(mockReq, mockRes)

    let mockReq2 = nodeMockHttp.createRequest({
      method: 'POST',
      url: 'api/comment',
      body: 
      {
          _id: '223',
          _iduser: '213',
          _idRestaurant: '223',
          ContenuTexte: 'Test',
          Note: '3',
          __v: 0
      }
      
    })
    let mockRes2 = nodeMockHttp.createResponse()
    await controlerComment.createComment(mockReq2, mockRes2)


    let mockReqGET = nodeMockHttp.createRequest(({
      method: 'GET',
      url: 'api/comment'}))
    let mockResGET = nodeMockHttp.createResponse()
    await controlerComment.getComments(mockReqGET, mockResGET)
    let resultGET = JSON.parse(mockResGET._getData())
    let statusCommentGET = mockResGET._getStatusCode()
    expect(statusCommentGET).toBe(200)
    expect(resultGET).toBeDefined()
    expect(resultGET.data[0]).toEqual(dataCommentTrueGet._doc)
    expect(resultGET.data[1]).toEqual(dataCommentTrueGet2._doc)
  });
  it("Get one comment", async () => {
    let mockReq = nodeMockHttp.createRequest({
      method: 'POST',
      url: 'api/comment',
      body: 
      {
        _id: '1',
        _iduser: '2',
        _idRestaurant: '3',
        ContenuTexte: 'Test',
        Note: '3',
        __v: 0
      }
      
    })
    let mockRes = nodeMockHttp.createResponse()
    await controlerComment.createComment(mockReq, mockRes)

    let mockReq2 = nodeMockHttp.createRequest({
      method: 'POST',
      url: 'api/comment',
      body: 
      {
        _id: '4',
        _iduser: '5',
        _idRestaurant: '6',
        ContenuTexte: 'Test',
        Note: '3',
        __v: 0
      }
      
    })
    let mockRes2 = nodeMockHttp.createResponse()
    await controlerComment.createComment(mockReq2, mockRes2)


    let mockReqGET = nodeMockHttp.createRequest({
      method: 'GET',
      url: 'api/comment/',
      params:{commentID:'4'}
  
    })
    let mockResGET = nodeMockHttp.createResponse()
    await controlerComment.getComment(mockReqGET,mockResGET)
    let resultGET = JSON.parse(mockResGET._getData())
    let statusCommentGET = mockResGET._getStatusCode()
    expect(resultGET.data._id).toEqual("4")
    expect(resultGET.data._id).not.toEqual("1")
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
      params:{commentID:'3'}

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
      method: 'POST',
      url: 'api/comment',
      body: 
      {
        _id: '4',
        _iduser: '5',
        _idRestaurant: '6',
        ContenuTexte: 'Test',
        Note: '3',
        __v: 0
      }
      
    })
    let mockRes = nodeMockHttp.createResponse()
    await controlerComment.createComment(mockReq, mockRes)


    let mockReqPUT = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/comment/',
      params:{commentID:'4'},
      body:{ContenuTexte: 'Modify'}
    })
    let mockResPUT = nodeMockHttp.createResponse()
    await controlerComment.updateComment(mockReqPUT,mockResPUT)
    let resultPUT = JSON.parse(mockResPUT._getData())
    let statusCommentPUT = mockResPUT._getStatusCode()
    expect(resultPUT.data._id).toEqual("4")
    expect(resultPUT.data.ContenuTexte).toEqual("Modify")
    expect(statusCommentPUT).toEqual(200)

    let mockReqPUTMissing = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/comment/',
      body:{ContenuTexte: 'Modify'}
    })
    let mockResPUTMissing = nodeMockHttp.createResponse()
    await controlerComment.updateComment(mockReqPUTMissing,mockResPUTMissing)
    let resultPUTMissing = JSON.parse(mockResPUTMissing._getData())
    let statusCommentPUTMissing = mockResPUTMissing._getStatusCode()
    expect(statusCommentPUTMissing).toEqual(400)
    expect(resultPUTMissing.message).toEqual('Parameter missing')

    let mockReqPUTFalse = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/comment/',
      params:{commentID:'3'},
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
      method: 'POST',
      url: 'api/comment',
      body: 
      {
        _id: '3',
        _iduser: '34',
        _idRestaurant: '56',
        ContenuTexte: 'Test delete',
        Note: '3',
        __v: 0
      }
      
    })
    let mockRes = nodeMockHttp.createResponse()
    await controlerComment.createComment(mockReq, mockRes)

    let mockReqDELFalse = nodeMockHttp.createRequest({
      method: 'DEL',
      url: 'api/comment/',
      params:{commentID:'4'},
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
      params:{commentID:'3'},

    })
  
    let mockResDEL = nodeMockHttp.createResponse()
    await controlerComment.deleteComment(mockReqDEL,mockResDEL)
    let resultDEL = JSON.parse(mockResDEL._getData())
    let statusCommentDEL = mockResDEL._getStatusCode()
    expect(resultDEL.data).toEqual(dataCommentDEL._doc)
    expect(resultDEL.message).toEqual('Comment removed')
    expect(statusCommentDEL).toEqual(200)
    let mockReqGET = nodeMockHttp.createRequest({
      method: 'GET',
      url: 'api/comment/',
      params:{commentID:'3'}
  
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




