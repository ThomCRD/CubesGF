const db = require("./testDb");
const nodeMockHttp = require('node-mocks-http')
const controlerUser = require('../API/controllers/user');
const controlerAuth = require('../API/controllers/auth');
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
  it("Get all Users", async () => {
    let mockReqTrue = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/register-customer',
      body: {
        _id: "629352698dc707a4b435287a",
        firstName: "Anna",
        lastName: "Tomie",
        email: "Anna.Tomie@gmail.com",
        password: "corps",
        phone: "0606060606"
      }

    })
    let mockResTrue = nodeMockHttp.createResponse()
    await controlerAuth.userRegister(mockReqTrue.body, "user", mockResTrue)

    let mockReqTrue2 = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/register',
      body: {
        _id: "629354777e225e716e6c18fb",
        firstName: "Camille ",
        lastName: "Zole",
        email: "Camille.Zole@gmail.com",
        password: "fou",
        phone: "0606060606"
      }
    })
    let mockResTrue2 = nodeMockHttp.createResponse()
    await controlerAuth.userRegister(mockReqTrue2.body, "user", mockResTrue2)

    let mockReqGET = nodeMockHttp.createRequest(({
      method: 'GET',
      url: 'api/users'
    }))
    let mockResGET = nodeMockHttp.createResponse()
    await controlerUser.getAllUsers(mockReqGET, mockResGET)
    let resultGET = JSON.parse(mockResGET._getData())
    let statusCommentGET = mockResGET._getStatusCode()
    expect(statusCommentGET).toBe(200)
    expect(resultGET).toBeDefined()
    expect(resultGET.data[0]._id).toEqual("629352698dc707a4b435287a")
    expect(resultGET.data[1]._id).toEqual("629354777e225e716e6c18fb")
  });
  it("Get one User", async () => {
    let mockReqTrue = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/register',
      body: {
        _id: "629354777e225e716e6c18fb",
        firstName: "Edmond",
        lastName: "Prochain",
        email: "Edmond.Prochain@gmail.com",
        password: "saveme",
        phone: "0606060606"
      }
    })
    let mockResTrue = nodeMockHttp.createResponse()
    await controlerAuth.userRegister(mockReqTrue.body, "user", mockResTrue)

    let mockReqTrue2 = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/register',
      body: {
        _id: "629354777e225e716e6c18fa",
        firstName: "Garcin",
        lastName: "Lazare",
        email: "Garcin.Lazare@gmail.com",
        password: "enretard",
        phone: "0606060606"
      }
    })
    let mockResTrue2 = nodeMockHttp.createResponse()
    await controlerAuth.userRegister(mockReqTrue2.body, "user", mockResTrue2)


    let mockReqGET = nodeMockHttp.createRequest({
      method: 'GET',
      url: 'api/user/',
      params: { id: '629354777e225e716e6c18fa' }

    })
    let mockResGET = nodeMockHttp.createResponse()
    await controlerUser.getUser(mockReqGET, mockResGET)
    let resultGET = JSON.parse(mockResGET._getData())
    let statusCommentGET = mockResGET._getStatusCode()
    expect(resultGET.data._id).toEqual("629354777e225e716e6c18fa")
    expect(resultGET.data._id).not.toEqual("629354777e225e716e6c18fb")
    expect(statusCommentGET).toEqual(200)

    let mockReqGETMissing = nodeMockHttp.createRequest({
      method: 'GET',
      url: 'api/user/',

    })
    let mockResGETMissing = nodeMockHttp.createResponse()
    await controlerUser.getUser(mockReqGETMissing, mockResGETMissing)
    let resultGETMissing = JSON.parse(mockResGETMissing._getData())
    let statusCommentGETMissing = mockResGETMissing._getStatusCode()
    expect(statusCommentGETMissing).toEqual(400)
    expect(resultGETMissing.message).toEqual('Parameter missing')

    let mockReqGETFalse = nodeMockHttp.createRequest({
      method: 'GET',
      url: 'api/user/',
      params: { id: '629354777e225e716e6c18fc' }

    })
    let mockResGETFalse = nodeMockHttp.createResponse()
    await controlerUser.getUser(mockReqGETFalse, mockResGETFalse)
    let resultGETFalse = JSON.parse(mockResGETFalse._getData())
    let statusCommentGETFalse = mockResGETFalse._getStatusCode()
    expect(statusCommentGETFalse).toEqual(404)
    expect(resultGETFalse.message).toEqual('User does not exist')
  });
  it("patch update User", async () => {
    let mockReqTrue = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/register',
      body: {
        _id: "629355dbd7c0adc46022486c",
        firstName: "Henri",
        lastName: "G",
        email: "Henri.Gole@gmail.com",
        password: "mouahahaha",
        phone: "0606060606"
      }
    })
    let mockResTrue = nodeMockHttp.createResponse()
    await controlerAuth.userRegister(mockReqTrue.body, "user", mockResTrue)

    let mockReqPUT = nodeMockHttp.createRequest({
      method: 'PATCH',
      url: 'api/user/',
      params: { id: '629355dbd7c0adc46022486c' },
      body: { lastName: 'Gole' }
    })
    let mockResPUT = nodeMockHttp.createResponse()
    await controlerUser.updateUser(mockReqPUT, mockResPUT)
    let resultPUT = JSON.parse(mockResPUT._getData())
    let statusCommentPUT = mockResPUT._getStatusCode()
    expect(resultPUT.data._id).toEqual("629355dbd7c0adc46022486c")
    expect(resultPUT.data.lastName).toEqual("Gole")
    expect(statusCommentPUT).toEqual(200)

    let mockReqPUTMissing = nodeMockHttp.createRequest({
      method: 'PATCH',
      url: 'api/user/',
      body: { lastName: 'Gaule' }
    })
    let mockResPUTMissing = nodeMockHttp.createResponse()
    await controlerUser.updateUser(mockReqPUTMissing, mockResPUTMissing)
    let resultPUTMissing = JSON.parse(mockResPUTMissing._getData())
    let statusCommentPUTMissing = mockResPUTMissing._getStatusCode()
    expect(statusCommentPUTMissing).toEqual(400)
    expect(resultPUTMissing.message).toEqual('Parameter missing')

    let mockReqPUTFalse = nodeMockHttp.createRequest({
      method: 'PATCH',
      url: 'api/user/',
      params: { id: '629355dbd7c0adc46022486v' },
      body: { lastName: 'Gaule' }
    })
    let mockResPUTFalse = nodeMockHttp.createResponse()
    await controlerUser.updateUser(mockReqPUTFalse, mockResPUTFalse)
    let resultPUTFalse = JSON.parse(mockResPUTFalse._getData())
    let statusCommentPUTFalse = mockResPUTFalse._getStatusCode()
    expect(statusCommentPUTFalse).toEqual(500)
    expect(resultPUTFalse.message).toEqual('User not found')

  });
  it("PATCH delete user", async () => {
    let mockReqTrue = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/register',
      body: {
        _id: "62935854759703891777071a",
        firstName: "Jacques",
        lastName: "Ouzi",
        email: "Jacques.Ouzi@gmail.com",
        password: "OKLM",
        phone: "0606060606"
      }
    })
    let mockResTrue = nodeMockHttp.createResponse()
    await controlerAuth.userRegister(mockReqTrue.body, "user", mockResTrue)

    let mockReqDELFalse = nodeMockHttp.createRequest({
      method: 'DEL',
      url: 'api/user/',
      params: { id: '629355dbd7c0adc46022486c' },
    })
    let mockResDELFalse = nodeMockHttp.createResponse()
    await controlerUser.deleteUser(mockReqDELFalse, mockResDELFalse)
    let resultDELFalse = JSON.parse(mockResDELFalse._getData())
    let statusCommentDELFalse = mockResDELFalse._getStatusCode()
    expect(statusCommentDELFalse).toEqual(404)
    expect(resultDELFalse.message).toEqual('User does not exist ')

    let mockReqDELMissing = nodeMockHttp.createRequest({
      method: 'DEL',
      url: 'api/user/',
    })
    let mockResDELMissing = nodeMockHttp.createResponse()
    await controlerUser.deleteUser(mockReqDELMissing, mockResDELMissing)
    let resultDELMissing = JSON.parse(mockResDELMissing._getData())
    let statusCommentDELMissing = mockResDELMissing._getStatusCode()
    expect(statusCommentDELMissing).toEqual(400)
    expect(resultDELMissing.message).toEqual('Parameter missing')

    let mockReqDEL = nodeMockHttp.createRequest({
      method: 'DELETE',
      url: 'api/comment/',
      params: { id: '62935854759703891777071a' },

    })

    let mockResDEL = nodeMockHttp.createResponse()
    await controlerUser.deleteUser(mockReqDEL, mockResDEL)
    let resultDEL = JSON.parse(mockResDEL._getData())
    let statusCommentDEL = mockResDEL._getStatusCode()
    expect(resultDEL.message).toEqual('User removed')
    expect(statusCommentDEL).toEqual(200)

    let mockReqGET = nodeMockHttp.createRequest({
      method: 'GET',
      url: 'api/user/',
      params: { id: '62935854759703891777071a' }

    })
    let mockResGET = nodeMockHttp.createResponse()
    await controlerUser.getUser(mockReqGET, mockResGET)
    let resultGET = JSON.parse(mockResGET._getData())
    let statusCommentGET = mockResGET._getStatusCode()
    expect(statusCommentGET).toEqual(404)
    expect(resultGET.message).toEqual('User does not exist')

  });
})
