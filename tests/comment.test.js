const  Comment  = require("../API/models/comment");
const db = require("./testDb");
const nodeMockHttp  = require('node-mocks-http')
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

let dataCommentTrue = new Comment({
  _id: "2333",
  _iduser: "300",
  _idRestaurant: "700",
  ContenuTexte: "Test",
  Note: "3",
});
let dataCommentTrue2 = new Comment({
  _id: "2345",
  _iduser: "213",
  _idRestaurant: "2345",
  ContenuTexte: "Test",
  Note: "3",
});
let dataCommentFalse = new Comment({
  _id: "2455",
  _iduser: "300",
  _idRestaurant: "700",
  Note: "3",
});
describe("Test controler", () => {

  it("create comment successfully", async () => {

    let mockReq = nodeMockHttp.createRequest({body:dataCommentTrue})
    let mockRes = nodeMockHttp.createResponse()
    await controlerComment.createComment(mockReq,mockRes)
    let result = JSON.parse(mockRes._getData())
    let statusComment = mockRes._getStatusCode()
    expect(statusComment).toBe(200)
    expect(result.message).toBe("Comment created")
    expect(result.data._id).toBe(dataCommentTrue._id)
    expect(result.data._idRestaurant).toBe(dataCommentTrue._idRestaurant)
    expect(result.data._iduser).toBe(dataCommentTrue._iduser)
    expect(result.data.ContenuTexte).toBe(dataCommentTrue.ContenuTexte)
    expect(result.data.Note).toBe(dataCommentTrue.Note)
    
  });
  it("create comment failed", async () => {
    let mockReq = nodeMockHttp.createRequest({body:dataCommentFalse})
    let mockRes = nodeMockHttp.createResponse()
    await controlerComment.createComment(mockReq,mockRes)
    let result = JSON.parse(mockRes._getData())
    let statusComment = mockRes._getStatusCode()
    expect(statusComment).toBe(400)
    expect(result.message).toBe("Data Missing")
  });
  it("Get comment", async () => {
    let mockReq = nodeMockHttp.createRequest({body:dataCommentTrue2})
    let mockRes = nodeMockHttp.createResponse()
    await controlerComment.createComment(mockReq,mockRes)
    let result = JSON.parse(mockRes._getData())


    let mockReqGET = nodeMockHttp.createRequest()
    let mockResGET = nodeMockHttp.createResponse()
    await controlerComment.getComments(mockReqGET,mockResGET)
    let resultGET = mockResGET._getData()
    let statusCommentGET = mockResGET._getStatusCode()
    console.log(resultGET)
  });
})




