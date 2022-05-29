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

let dataAdressTrueCreate = new Adress({
    _id:"42",
    country :"France",
    city:"Toulouse",
    street :"4 rue des endroits",
    postal_code:"31000",
    __v: 0
});
let dataAdressTrueGet = new Adress(
    {
        _id:"43",
        country :"France",
        city:"Toulouse",
        street :"4 rue des endroits",
        postal_code:"31000",
        __v: 0
    }
);
let dataAdressTrueGet2 = new Adress(
  {
    _id:"44",
    country :"France",
    city:"Toulouse",
    street :"4 rue des endroits",
    postal_code:"31000",
    __v: 0
  }
);
let dataAdressDEL = new Adress(
  {
    _id:"45",
    country :"France",
    city:"Toulouse",
    street :"4 rue des endroits",
    postal_code:"31000",
    __v: 0
  }
);


describe("Test controler Adress", () => {
  it("create adress ", async () => {

    let mockReqTrue = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/adress',
      body: {
        _id:"42",
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
    expect(resultTrue.data).toEqual(dataAdressTrueCreate._doc)

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
        _id:"43",
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
        _id:"44",
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
    expect(resultGET.data[0]).toEqual(dataAdressTrueGet._doc)
    expect(resultGET.data[1]).toEqual(dataAdressTrueGet2._doc)
  });
  it("Get one comment", async () => {
    let mockReq = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/adress',
      body: 
      {
        _id:"47",
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
        _id:"48",
        country :"France",
        city:"Toulouse",
        street :"4 rue des endroits",
        postal_code:"31000",
      }
      
    })
    let mockRes2 = nodeMockHttp.createResponse()
    await controlerAdress.createAdress(mockReq2, mockRes2)


    let mockReqGET = nodeMockHttp.createRequest({
      method: 'GET',
      url: 'api/adress/',
      params:{adressID:'47'}
  
    })
    let mockResGET = nodeMockHttp.createResponse()
    await controlerAdress.getAdress(mockReqGET,mockResGET)
    let resultGET = JSON.parse(mockResGET._getData())
    let statusAdressGET = mockResGET._getStatusCode()
    expect(resultGET.data._id).toEqual("47")
    expect(resultGET.data._id).not.toEqual("48")
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
      params:{adressID:'68'}

    })
    let mockResGETFalse = nodeMockHttp.createResponse()
    await controlerAdress.getAdress(mockReqGETFalse,mockResGETFalse)
    let resultGETFalse = JSON.parse(mockResGETFalse._getData())
    let statusAdressGETFalse = mockResGETFalse._getStatusCode()
    expect(statusAdressGETFalse).toEqual(404)
    expect(resultGETFalse.message).toEqual('the adress does not exist ')
  });
  it("Put update comment", async () => {
    let mockReq = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/adress',
      body: 
      {
        _id:"50",
        country :"France",
        city:"Toulouse",
        street :"4 rue des endroits",
        postal_code:"31000",
        __v: 0
      }
      
    })
    let mockRes = nodeMockHttp.createResponse()
    await controlerAdress.createAdress(mockReq, mockRes)

    let mockReqPUT = nodeMockHttp.createRequest({
      method: 'PATCH',
      url: 'api/adress/',
      params:{adressID:'50'},
      body:{city: 'Modify'}
    })
    let mockResPUT = nodeMockHttp.createResponse()
    await controlerAdress.updateAdress(mockReqPUT,mockResPUT)
    let resultPUT = JSON.parse(mockResPUT._getData())
    let statusAdressPUT = mockResPUT._getStatusCode()
    expect(resultPUT.data._id).toEqual("50")
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
      params:{adressID:'3'},
      body:{city: 'Modify'}
    })
    let mockResPUTFalse = nodeMockHttp.createResponse()
    await controlerAdress.updateAdress(mockReqPUTFalse,mockResPUTFalse)
    let resultPUTFalse = JSON.parse(mockResPUTFalse._getData())
    let statusAdressPUTFalse = mockResPUTFalse._getStatusCode()
    expect(statusAdressPUTFalse).toEqual(404)
    expect(resultPUTFalse.message).toEqual('the adress does not exist ')
 
  });
  it("Put delete comment", async () => {
    let mockReq = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/adress',
      body: 
      {
        _id:"45",
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
      params:{adressID:'4'},
    })
    let mockResDELFalse = nodeMockHttp.createResponse()
    await controlerAdress.deleteAdress(mockReqDELFalse,mockResDELFalse)
    let resultDELFalse = JSON.parse(mockResDELFalse._getData())
    let statusAdressDELFalse = mockResDELFalse._getStatusCode()
    expect(statusAdressDELFalse).toEqual(404)
    expect(resultDELFalse.message).toEqual('the adress does not exist ')

    let mockReqDEL = nodeMockHttp.createRequest({
      method: 'DELETE',
      url: 'api/adress/',
      params:{adressID:'45'},

    })
  
    let mockResDEL = nodeMockHttp.createResponse()
    await controlerAdress.deleteAdress(mockReqDEL,mockResDEL)
    let resultDEL = JSON.parse(mockResDEL._getData())
    let statusAdressDEL = mockResDEL._getStatusCode()
    expect(resultDEL.data).toEqual(dataAdressDEL._doc)
    expect(resultDEL.message).toEqual('Adress removed')
    expect(statusAdressDEL).toEqual(200)
    let mockReqGET = nodeMockHttp.createRequest({
      method: 'GET',
      url: 'api/adress/',
      params:{adressID:'3'}
  
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




