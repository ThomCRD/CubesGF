const express = require('express');
const Adress = require("../API/models/adress");
const db = require("./testDb");
const nodeMockHttp = require('node-mocks-http')
const controlerAdress = require('../API/controllers/adress');


beforeAll(async () => {
  await db.setUp();
});
afterEach(async () => {
  await db.dropCollections();
});
afterAll(async () => {
  await db.dropDatabase();
});


describe("Test controler Adress", () => {
  it("create adress ", async () => {

    let mockReqTrue = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/adress',
      body: {
        country :"France",
        city:"Toulouse",
        street :"4 rue des endroits",
        postal_code:"31000"
      }
    })
    let mockResTrue = nodeMockHttp.createResponse()
    await controlerAdress.createAdress(mockReqTrue, mockResTrue)
    let resultTrue = JSON.parse(mockResTrue._getData())
    let statusAdressTrue = mockResTrue._getStatusCode()
    expect(statusAdressTrue).toBe(200)
    expect(resultTrue.message).toBe("Adress created")
    expect(resultTrue.data.country).toEqual("France")
    expect(resultTrue.data.city).toEqual("Toulouse")
    expect(resultTrue.data.street).toEqual("4 rue des endroits")
    expect(resultTrue.data.postal_code).toEqual("31000")

    let mockReqFalse = nodeMockHttp.createRequest({
      method: 'PUT',
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
    await controlerAdress.createAdress(mockReqFalse, mockResFalse)
    let resultFalse = JSON.parse(mockResFalse._getData())
    let statusAdressFalse = mockResFalse._getStatusCode()
    expect(statusAdressFalse).toBe(400)
    expect(resultFalse.message).toBe("Data Missing")

  });
  it("Get all adress", async () => {
    let mockReq = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/adress',
      body: 
      {
        _id:"62932c0a348cafeabcc314ec",
        country :"France",
        city:"Bordeaux",
        street :"4 rue des filatier",
        postal_code:"33000",
      }
      
    })
    let mockRes = nodeMockHttp.createResponse()
    await controlerAdress.createAdress(mockReq, mockRes)

    let mockReq2 = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/adress',
      body: 
      {
        _id:"62932c0a348cafeabcc314eb",
        country :"France",
        city:"Toulouse",
        street :"4 rue des endroits",
        postal_code:"31000",
      }
      
    })
    let mockRes2 = nodeMockHttp.createResponse()
    await controlerAdress.createAdress(mockReq2, mockRes2)


    let mockReqGET = nodeMockHttp.createRequest(({
      method: 'GET',
      url: 'api/adresses'}))
    let mockResGET = nodeMockHttp.createResponse()
    await controlerAdress.getadresses(mockReqGET, mockResGET)
    let resultGET = JSON.parse(mockResGET._getData())
    let statusAdressGET = mockResGET._getStatusCode()
    expect(statusAdressGET).toBe(200)
    expect(resultGET).toBeDefined()
    expect(resultGET.data[0]._id).toEqual("62932c0a348cafeabcc314ec")
    expect(resultGET.data[1]._id).toEqual("62932c0a348cafeabcc314eb")
  });
  it("Get one comment", async () => {
    let mockReq = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/adress',
      body: 
      {
        _id:"629336128b03db82aa8c5992",
        country :"France",
        city:"Toulouse",
        street :"4 rue des endroits",
        postal_code:"31000",
      }
      
    })
    let mockRes = nodeMockHttp.createResponse()
    await controlerAdress.createAdress(mockReq, mockRes)

    let mockReq2 = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/adress',
      body: 
      {
        _id:"629336128b03db82aa8c5991",
        country :"France",
        city:"Lille",
        street :"4 rue des endroits",
        postal_code:"59000",
      }
      
    })
    let mockRes2 = nodeMockHttp.createResponse()
    await controlerAdress.createAdress(mockReq2, mockRes2)


    let mockReqGET = nodeMockHttp.createRequest({
      method: 'GET',
      url: 'api/adress/',
      params:{id:'629336128b03db82aa8c5991'}
  
    })
    let mockResGET = nodeMockHttp.createResponse()
    await controlerAdress.getAdress(mockReqGET,mockResGET)
    let resultGET = JSON.parse(mockResGET._getData())
    let statusAdressGET = mockResGET._getStatusCode()
    expect(resultGET.data._id).toEqual("629336128b03db82aa8c5991")
    expect(resultGET.data._id).not.toEqual("629336128b03db82aa8c5992")
    expect(statusAdressGET).toEqual(200)

    let mockReqGETMissing = nodeMockHttp.createRequest({
      method: 'GET',
      url: 'api/adress/',

    })
    let mockResGETMissing = nodeMockHttp.createResponse()
    await controlerAdress.getAdress(mockReqGETMissing,mockResGETMissing)
    let resultGETMissing = JSON.parse(mockResGETMissing._getData())
    let statusAdressGETMissing = mockResGETMissing._getStatusCode()
    expect(statusAdressGETMissing).toEqual(400)
    expect(resultGETMissing.message).toEqual('Parameter missing')

    let mockReqGETFalse = nodeMockHttp.createRequest({
      method: 'GET',
      url: 'api/adress/',
      params:{id:'629336128b03db82aa8c5993'}

    })
    let mockResGETFalse = nodeMockHttp.createResponse()
    await controlerAdress.getAdress(mockReqGETFalse,mockResGETFalse)
    let resultGETFalse = JSON.parse(mockResGETFalse._getData())
    let statusAdressGETFalse = mockResGETFalse._getStatusCode()
    expect(statusAdressGETFalse).toEqual(404)
    expect(resultGETFalse.message).toEqual('the adress does not exist ')
  });
  it("patch update comment", async () => {
    let mockReq = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/adress',
      body: 
      {
        _id:"629336ca3c46ac8ed920a8c6",
        country :"France",
        city:"Lyon",
        street :"4 rue des endroits",
        postal_code:"69000",
        __v: 0
      }
      
    })
    let mockRes = nodeMockHttp.createResponse()
    await controlerAdress.createAdress(mockReq, mockRes)

    let mockReqPUT = nodeMockHttp.createRequest({
      method: 'PATCH',
      url: 'api/adress/',
      params:{id:'629336ca3c46ac8ed920a8c6'},
      body:{city: 'Modify'}
    })
    let mockResPUT = nodeMockHttp.createResponse()
    await controlerAdress.updateAdress(mockReqPUT,mockResPUT)
    let resultPUT = JSON.parse(mockResPUT._getData())
    let statusAdressPUT = mockResPUT._getStatusCode()
    expect(resultPUT.data._id).toEqual("629336ca3c46ac8ed920a8c6")
    expect(resultPUT.message).toEqual("the address is changed")
    expect(resultPUT.data.city).toEqual("Modify")
    expect(statusAdressPUT).toEqual(200)

    let mockReqPUTMissing = nodeMockHttp.createRequest({
      method: 'PATCH',
      url: 'api/adress/',
      body:{city: 'Modify'}
    })
    let mockResPUTMissing = nodeMockHttp.createResponse()
    await controlerAdress.updateAdress(mockReqPUTMissing,mockResPUTMissing)
    let resultPUTMissing = JSON.parse(mockResPUTMissing._getData())
    let statusAdressPUTMissing = mockResPUTMissing._getStatusCode()
    expect(statusAdressPUTMissing).toEqual(400)
    expect(resultPUTMissing.message).toEqual('Parameter missing')

    let mockReqPUTFalse = nodeMockHttp.createRequest({
      method: 'PATCH',
      url: 'api/adress/',
      params:{id:'629336ca3c46ac8ed920a8c64'},
      body:{city: 'Modify'}
    })
    let mockResPUTFalse = nodeMockHttp.createResponse()
    await controlerAdress.updateAdress(mockReqPUTFalse,mockResPUTFalse)
    let resultPUTFalse = JSON.parse(mockResPUTFalse._getData())
    let statusAdressPUTFalse = mockResPUTFalse._getStatusCode()
    expect(statusAdressPUTFalse).toEqual(500)
    expect(resultPUTFalse.message).toEqual('Adress not found')
 
  });
  it("Put delete comment", async () => {
    let mockReq = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/adress',
      body: 
      {
        _id:"629339278358c4931003327e",
        country :"France",
        city:"Toulouse",
        street :"4 rue des endroits",
        postal_code:"31000",
        __v: 0
      }
      
    })
    let mockRes = nodeMockHttp.createResponse()
    await controlerAdress.createAdress(mockReq, mockRes)
  
    let mockReqDELFalse = nodeMockHttp.createRequest({
      method: 'DEL',
      url: 'api/adress/',
      params:{id:"629339278358c4931003327z"},
    })
    let mockResDELFalse = nodeMockHttp.createResponse()
    await controlerAdress.deleteAdress(mockReqDELFalse,mockResDELFalse)
    let resultDELFalse = JSON.parse(mockResDELFalse._getData())
    let statusAdressDELFalse = mockResDELFalse._getStatusCode()
    expect(statusAdressDELFalse).toEqual(500)
    expect(resultDELFalse.message).toEqual('Adress not found')

    let mockReqDEL = nodeMockHttp.createRequest({
      method: 'DELETE',
      url: 'api/adress/',
      params:{id:'629339278358c4931003327e'},

    })
  
    let mockResDEL = nodeMockHttp.createResponse()
    await controlerAdress.deleteAdress(mockReqDEL,mockResDEL)
    let resultDEL = JSON.parse(mockResDEL._getData())
    let statusAdressDEL = mockResDEL._getStatusCode()
    expect(resultDEL.data.country).toEqual("France")
    expect(resultDEL.data.city).toEqual("Toulouse")
    expect(resultDEL.data.street).toEqual("4 rue des endroits")
    expect(resultDEL.data.postal_code).toEqual("31000")
    expect(resultDEL.message).toEqual('Adress removed')
    expect(statusAdressDEL).toEqual(200)
    let mockReqGET = nodeMockHttp.createRequest({
      method: 'GET',
      url: 'api/adress/',
      params:{id:'629339278358c4931003327e'}
  
    })
    let mockResGET = nodeMockHttp.createResponse()
    await controlerAdress.getAdress(mockReqGET,mockResGET)
    let resultGET = JSON.parse(mockResGET._getData())
    let statusAdressGET = mockResGET._getStatusCode()
    expect(statusAdressGET).toEqual(404)
    expect(resultGET.message).toEqual('the adress does not exist ')

    let mockReqDELMissing = nodeMockHttp.createRequest({
      method: 'DEL',
      url: 'api/adress/',
    })
    let mockResDELMissing = nodeMockHttp.createResponse()
    await controlerAdress.deleteAdress(mockReqDELMissing,mockResDELMissing)
    let resultDELMissing = JSON.parse(mockResDELMissing._getData())
    let statusAdressDELMissing = mockResDELMissing._getStatusCode()
    expect(statusAdressDELMissing).toEqual(400)
    expect(resultDELMissing.message).toEqual('Parameter missing')

  });
})




