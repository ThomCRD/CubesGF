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

  it("create customer ", async () => {

    let mockReqUser = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/register-customer',
      body: {
        _id: "629352698dc707a4b435287c",
        firstName: "Rene",
        lastName: "Kikoul",
        email: "rene.kikoul@gmail.com",
        password: "rhume",
        phone: "0606060606"
      }
    })
    let mockResUser = nodeMockHttp.createResponse()
    await controlerAuth.userRegister(mockReqUser.body, "user", mockResUser)
    let resultUser = JSON.parse(mockResUser._getData())
    let statusUser = mockResUser._getStatusCode()
    expect(statusUser).toBe(201)
    expect(resultUser.message).toBe("Hurry! now you are successfully registred. Please nor login.")
    expect(resultUser.data._id).toEqual("629352698dc707a4b435287c")
    expect(resultUser.data.firstName).toEqual("Rene")
    expect(resultUser.data.lastName).toEqual("Kikoul")
    expect(resultUser.data.email).toEqual("rene.kikoul@gmail.com")
    expect(resultUser.data.phone).toEqual("0606060606")
    expect(resultUser.data.role).toEqual("user")
    const test = await bcrypt.compare("rhume", resultUser.data.password)
    expect(test).toEqual(true)

    let mockReqUserFalse = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/register-customer',
      body: {
        firstName: "Rene",
        lastName: "Kikoul",
        email: "rene.kikoul@gmail.com",
        password: "rhume",
        phone: "0606060606"
      }
    })
    let mockResUserFalse = nodeMockHttp.createResponse()
    await controlerAuth.userRegister(mockReqUserFalse.body, "user", mockResUserFalse)
    let resultUserFalse = JSON.parse(mockResUserFalse._getData())
    let statusUserFalse = mockResUserFalse._getStatusCode()
    expect(statusUserFalse).toBe(400)
    expect(resultUserFalse.message).toBe("Email is already registered.")

    let mockReqUserError = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/register-customer',
      body: {
        firstName: "Rene",
        lastName: "Kikoul",
        email: "rene.kikoul@gmail.com",
        password: "rhume",
        phone: "0606060606"
      }
    })
    let mockResUserError = nodeMockHttp.createResponse()
    await controlerAuth.userRegister(mockReqUserError, "user", mockResUserError)
    let resultUserError = JSON.parse(mockResUserError._getData())
    let statusUserError = mockResUserError._getStatusCode()
    expect(statusUserError).toBe(500)
    expect(resultUserError.message).toBe("Unable to create your account.")


  });
  it("login customer ", async () => {

    let mockReqUser = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/register-customer',
      body: {
        _id: "629352698dc707a4b435287c",
        firstName: "Rene",
        lastName: "Kikoul",
        email: "rene.kikoul@gmail.com",
        password: "rhume",
        phone: "0606060606"
      }
    })
    let mockResUser = nodeMockHttp.createResponse()
    await controlerAuth.userRegister(mockReqUser.body, "user", mockResUser)

    
    let mockReqUserValide = nodeMockHttp.createRequest({
      method: 'post',
      url: 'api/login-customer',
      body: {
        email: "rene.kikoul@gmail.com",
        password: "rhume",

      }
    })
    let mockResUserValide = nodeMockHttp.createResponse()
    await controlerAuth.userLogin(mockReqUserValide.body, "user", mockResUserValide)
    let resultUser = JSON.parse(mockResUserValide._getData())
    let statusUser = mockResUserValide._getStatusCode()
    expect(resultUser.role).toBe("user")
    expect(resultUser.email).toBe("rene.kikoul@gmail.com")
    expect(resultUser.expiresIn).toBe(168)
    expect(resultUser.token).toBeDefined
    expect(resultUser.message).toBe('Hurray! You are now logged in.')
    expect(resultUser.success).toBe(true)
    expect(statusUser).toBe(200)

    let mockReqUserNoValide = nodeMockHttp.createRequest({
      method: 'post',
      url: 'api/login-customer',
      body: {
        email: "rene.kikoul@gmail.com",
        password: "rhume",

      }
    })
    let mockResUserNoValide = nodeMockHttp.createResponse()
    await controlerAuth.userLogin(mockReqUserNoValide.body, "admin", mockResUserNoValide)
    let resultUserNoValide = JSON.parse(mockResUserNoValide._getData())
    let statusUserNoValide = mockResUserNoValide._getStatusCode()
    expect(resultUserNoValide.success).toBe(false)
    expect(resultUserNoValide.message).toBe('Please make sure you are logging in from the right portal.')
    expect(statusUserNoValide).toBe(403)

    let mockReqUserEmail = nodeMockHttp.createRequest({
      method: 'post',
      url: 'api/login-customer',
      body: {
        email: "rene.kik@gmail.com",
        password: "rhume",

      }
    })
    let mockResUserEmail = nodeMockHttp.createResponse()
    await controlerAuth.userLogin(mockReqUserEmail.body, "user", mockResUserEmail)
    let resultUserEmail = JSON.parse(mockResUserEmail._getData())
    let statusUserEmail = mockResUserEmail._getStatusCode()
    expect(resultUserEmail.success).toBe(false)
    expect(resultUserEmail.message).toBe('Email is not found. Invalid login credentials.')
    expect(statusUserEmail).toBe(404)

    let mockReqUserPWD = nodeMockHttp.createRequest({
      method: 'post',
      url: 'api/login-customer',
      body: {
        email: "rene.kikoul@gmail.com",
        password: "rhu",

      }
    })
    let mockResUserPWD = nodeMockHttp.createResponse()
    await controlerAuth.userLogin(mockReqUserPWD.body, "user", mockResUserPWD)
    let resultUserPWD = JSON.parse(mockResUserPWD._getData())
    let statusUserPWD = mockResUserPWD._getStatusCode()
    expect(resultUserPWD.success).toBe(false)
    expect(resultUserPWD.message).toBe('Incorrect password.')
    expect(statusUserPWD).toBe(403)

  });
  it("create admin ", async () => {

    let mockReqUser = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api//register-admin',
      body: {
        _id: "629352698dc707a4b435287c",
        firstName: "admin",
        lastName: "admin",
        email: "admin@gmail.com",
        password: "azerty",
      }
    })
    let mockResUser = nodeMockHttp.createResponse()
    await controlerAuth.userRegister(mockReqUser.body, "admin", mockResUser)
    let resultUser = JSON.parse(mockResUser._getData())
    let statusUser = mockResUser._getStatusCode()
    expect(statusUser).toBe(201)
    expect(resultUser.message).toBe("Hurry! now you are successfully registred. Please nor login.")
    expect(resultUser.data._id).toEqual("629352698dc707a4b435287c")
    expect(resultUser.data.firstName).toEqual("admin")
    expect(resultUser.data.lastName).toEqual("admin")
    expect(resultUser.data.email).toEqual("admin@gmail.com")
    expect(resultUser.data.role).toEqual("admin")
    const test = await bcrypt.compare("azerty", resultUser.data.password)
    expect(test).toEqual(true)

    let mockReqUserFalse = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/register-admin',
      body: {
        _id: "629352698dc707a4b435287c",
        firstName: "admin",
        lastName: "admin",
        email: "admin@gmail.com",
        password: "azerty",
      }
    })
    let mockResUserFalse = nodeMockHttp.createResponse()
    await controlerAuth.userRegister(mockReqUserFalse.body, "admin", mockResUserFalse)
    let resultUserFalse = JSON.parse(mockResUserFalse._getData())
    let statusUserFalse = mockResUserFalse._getStatusCode()
    expect(statusUserFalse).toBe(400)
    expect(resultUserFalse.message).toBe("Email is already registered.")

    let mockReqUserError = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/register-admin',
      body: {
        _id: "629352698dc707a4b435287c",
        firstName: "admin",
        lastName: "admin",
        email: "admin@gmail.com",
        password: "azerty",
      }
    })
    let mockResUserError = nodeMockHttp.createResponse()
    await controlerAuth.userRegister(mockReqUserError, "user", mockResUserError)
    let resultUserError = JSON.parse(mockResUserError._getData())
    let statusUserError = mockResUserError._getStatusCode()
    expect(statusUserError).toBe(500)
    expect(resultUserError.message).toBe("Unable to create your account.")


  });
  it("login admin ", async () => {

    let mockReqUser = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/register-admin',
      body: {
        _id: "629352698dc707a4b435287c",
        firstName: "admin",
        lastName: "admin",
        email: "admin@gmail.com",
        password: "azerty",
      }
    })
    let mockResUser = nodeMockHttp.createResponse()
    await controlerAuth.userRegister(mockReqUser.body, "admin", mockResUser)

    
    let mockReqUserValide = nodeMockHttp.createRequest({
      method: 'post',
      url: 'api/login-admin',
      body: {
        email: "admin@gmail.com",
        password: "azerty",

      }
    })
    let mockResUserValide = nodeMockHttp.createResponse()
    await controlerAuth.userLogin(mockReqUserValide.body, "admin", mockResUserValide)
    let resultUser = JSON.parse(mockResUserValide._getData())
    let statusUser = mockResUserValide._getStatusCode()
    expect(resultUser.role).toBe("admin")
    expect(resultUser.email).toBe("admin@gmail.com")
    expect(resultUser.expiresIn).toBe(168)
    expect(resultUser.token).toBeDefined
    expect(resultUser.message).toBe('Hurray! You are now logged in.')
    expect(resultUser.success).toBe(true)
    expect(statusUser).toBe(200)

    let mockReqUserNoValide = nodeMockHttp.createRequest({
      method: 'post',
      url: 'api/login-admin',
      body: {
        email: "admin@gmail.com",
        password: "azerty",

      }
    })
    let mockResUserNoValide = nodeMockHttp.createResponse()
    await controlerAuth.userLogin(mockReqUserNoValide.body, "user", mockResUserNoValide)
    let resultUserNoValide = JSON.parse(mockResUserNoValide._getData())
    let statusUserNoValide = mockResUserNoValide._getStatusCode()
    expect(resultUserNoValide.success).toBe(false)
    expect(resultUserNoValide.message).toBe('Please make sure you are logging in from the right portal.')
    expect(statusUserNoValide).toBe(403)

    let mockReqUserEmail = nodeMockHttp.createRequest({
      method: 'post',
      url: 'api/login-customer',
      body: {
        email: "admn@gmail.com",
        password: "azerty",

      }
    })
    let mockResUserEmail = nodeMockHttp.createResponse()
    await controlerAuth.userLogin(mockReqUserEmail.body, "admin", mockResUserEmail)
    let resultUserEmail = JSON.parse(mockResUserEmail._getData())
    let statusUserEmail = mockResUserEmail._getStatusCode()
    expect(resultUserEmail.success).toBe(false)
    expect(resultUserEmail.message).toBe('Email is not found. Invalid login credentials.')
    expect(statusUserEmail).toBe(404)

    let mockReqUserPWD = nodeMockHttp.createRequest({
      method: 'post',
      url: 'api/login-customer',
      body: {
        email: "admin@gmail.com",
        password: "aerty",

      }
    })
    let mockResUserPWD = nodeMockHttp.createResponse()
    await controlerAuth.userLogin(mockReqUserPWD.body, "admin", mockResUserPWD)
    let resultUserPWD = JSON.parse(mockResUserPWD._getData())
    let statusUserPWD = mockResUserPWD._getStatusCode()
    expect(resultUserPWD.success).toBe(false)
    expect(resultUserPWD.message).toBe('Incorrect password.')
    expect(statusUserPWD).toBe(403)

  });
  it("create franchise ", async () => {

    let mockReqUser = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api//register-franchise',
      body: {
        _id: "629352698dc707a4b435287c",
        firstName: "franchise",
        siren: "73282932000074",
        email: "franchise@gmail.com",
        password: "azerty",
        phone: "0607050606"
      }
    })
    let mockResUser = nodeMockHttp.createResponse()
    await controlerAuth.userRegister(mockReqUser.body, "franchisee", mockResUser)
    let resultUser = JSON.parse(mockResUser._getData())
    let statusUser = mockResUser._getStatusCode()
    expect(statusUser).toBe(201)
    expect(resultUser.message).toBe("Hurry! now you are successfully registred. Please nor login.")
    expect(resultUser.data._id).toEqual("629352698dc707a4b435287c")
    expect(resultUser.data.firstName).toEqual("franchise")
    expect(resultUser.data.siren).toEqual("73282932000074")
    expect(resultUser.data.email).toEqual("franchise@gmail.com")
    expect(resultUser.data.role).toEqual("franchisee")
    expect(resultUser.data.phone).toEqual("0607050606")
    const test = await bcrypt.compare("azerty", resultUser.data.password)
    expect(test).toEqual(true)

    let mockReqUserFalse = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/register-franchise',
      body: {
        _id: "629352698dc707a4b435287c",
        firstName: "franchise",
        siren: "73282932000074",
        email: "franchise@gmail.com",
        password: "azerty",
        phone: "0607050606"
      }
    })
    let mockResUserFalse = nodeMockHttp.createResponse()
    await controlerAuth.userRegister(mockReqUserFalse.body, "franchisee", mockResUserFalse)
    let resultUserFalse = JSON.parse(mockResUserFalse._getData())
    let statusUserFalse = mockResUserFalse._getStatusCode()
    expect(statusUserFalse).toBe(400)
    expect(resultUserFalse.message).toBe("Email is already registered.")

    let mockReqUserError = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/register-franchise',
      body: {
        _id: "629352698dc707a4b435287c",
        firstName: "franchise",
        siren: "73282932000074",
        email: "franchise@gmail.com",
        password: "azerty",
        phone: "0607050606"
      }
    })
    let mockResUserError = nodeMockHttp.createResponse()
    await controlerAuth.userRegister(mockReqUserError, "user", mockResUserError)
    let resultUserError = JSON.parse(mockResUserError._getData())
    let statusUserError = mockResUserError._getStatusCode()
    expect(statusUserError).toBe(500)
    expect(resultUserError.message).toBe("Unable to create your account.")


  });
  it("login franchise ", async () => {

    let mockReqUser = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/register-franchise',
      body: {
        _id: "629352698dc707a4b435287c",
        firstName: "franchise",
        siren: "73282932000074",
        email: "franchise@gmail.com",
        password: "azerty",
        phone: "0607050606"
      }
    })
    let mockResUser = nodeMockHttp.createResponse()
    await controlerAuth.userRegister(mockReqUser.body, "franchisee", mockResUser)

    
    let mockReqUserValide = nodeMockHttp.createRequest({
      method: 'post',
      url: 'api/login-franchise',
      body: {
        email: "franchise@gmail.com",
        password: "azerty",

      }
    })
    let mockResUserValide = nodeMockHttp.createResponse()
    await controlerAuth.userLogin(mockReqUserValide.body, "franchisee", mockResUserValide)
    let resultUser = JSON.parse(mockResUserValide._getData())
    let statusUser = mockResUserValide._getStatusCode()
    expect(resultUser.role).toBe("franchisee")
    expect(resultUser.email).toBe("franchise@gmail.com")
    expect(resultUser.expiresIn).toBe(168)
    expect(resultUser.token).toBeDefined
    expect(resultUser.message).toBe('Hurray! You are now logged in.')
    expect(resultUser.success).toBe(true)
    expect(statusUser).toBe(200)

    let mockReqUserNoValide = nodeMockHttp.createRequest({
      method: 'post',
      url: 'api/login-customer',
      body: {
        email: "franchise@gmail.com",
        password: "azerty",

      }
    })
    let mockResUserNoValide = nodeMockHttp.createResponse()
    await controlerAuth.userLogin(mockReqUserNoValide.body, "user", mockResUserNoValide)
    let resultUserNoValide = JSON.parse(mockResUserNoValide._getData())
    let statusUserNoValide = mockResUserNoValide._getStatusCode()
    expect(resultUserNoValide.success).toBe(false)
    expect(resultUserNoValide.message).toBe('Please make sure you are logging in from the right portal.')
    expect(statusUserNoValide).toBe(403)

    let mockReqUserEmail = nodeMockHttp.createRequest({
      method: 'post',
      url: 'api/login-customer',
      body: {
        email: "franchie@gmail.com",
        password: "azerty",

      }
    })
    let mockResUserEmail = nodeMockHttp.createResponse()
    await controlerAuth.userLogin(mockReqUserEmail.body, "franchisee", mockResUserEmail)
    let resultUserEmail = JSON.parse(mockResUserEmail._getData())
    let statusUserEmail = mockResUserEmail._getStatusCode()
    expect(resultUserEmail.success).toBe(false)
    expect(resultUserEmail.message).toBe('Email is not found. Invalid login credentials.')
    expect(statusUserEmail).toBe(404)

    let mockReqUserPWD = nodeMockHttp.createRequest({
      method: 'post',
      url: 'api/login-customer',
      body: {
        email: "franchise@gmail.com",
        password: "azrty",

      }
    })
    let mockResUserPWD = nodeMockHttp.createResponse()
    await controlerAuth.userLogin(mockReqUserPWD.body, "franchisee", mockResUserPWD)
    let resultUserPWD = JSON.parse(mockResUserPWD._getData())
    let statusUserPWD = mockResUserPWD._getStatusCode()
    expect(resultUserPWD.success).toBe(false)
    expect(resultUserPWD.message).toBe('Incorrect password.')
    expect(statusUserPWD).toBe(403)

  });
  it("create supplier ", async () => {

    let mockReqUser = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api//register-supplier',
      body: {
        _id: "629352698dc707a4b435287c",
        firstName: "supplier",
        lastName: "supplier",
        email: "supplier.supplier@gmail.com",
        password: "azerty",
        phone: "0606060606"
      }
    })
    let mockResUser = nodeMockHttp.createResponse()
    await controlerAuth.userRegister(mockReqUser.body, "supplier", mockResUser)
    let resultUser = JSON.parse(mockResUser._getData())
    let statusUser = mockResUser._getStatusCode()
    expect(statusUser).toBe(201)
    expect(resultUser.message).toBe("Hurry! now you are successfully registred. Please nor login.")
    expect(resultUser.data._id).toEqual("629352698dc707a4b435287c")
    expect(resultUser.data.firstName).toEqual("supplier")
    expect(resultUser.data.lastName).toEqual("supplier")
    expect(resultUser.data.email).toEqual("supplier.supplier@gmail.com")
    expect(resultUser.data.role).toEqual("supplier")
    expect(resultUser.data.phone).toEqual("0606060606")
    const test = await bcrypt.compare("azerty", resultUser.data.password)
    expect(test).toEqual(true)

    let mockReqUserFalse = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/register-supplier',
      body: {
        _id: "629352698dc707a4b435287c",
        firstName: "supplier",
        lastName: "supplier",
        email: "supplier.supplier@gmail.com",
        password: "azerty",
        phone: "0606060606"
      }
    })
    let mockResUserFalse = nodeMockHttp.createResponse()
    await controlerAuth.userRegister(mockReqUserFalse.body, "supplier", mockResUserFalse)
    let resultUserFalse = JSON.parse(mockResUserFalse._getData())
    let statusUserFalse = mockResUserFalse._getStatusCode()
    expect(statusUserFalse).toBe(400)
    expect(resultUserFalse.message).toBe("Email is already registered.")

    let mockReqUserError = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/register-supplier',
      body: {
        _id: "629352698dc707a4b435287c",
        firstName: "supplier",
        lastName: "supplier",
        email: "supplier.supplier@gmail.com",
        password: "azerty",
        phone: "0606060606"
      }
    })
    let mockResUserError = nodeMockHttp.createResponse()
    await controlerAuth.userRegister(mockReqUserError, "supplier", mockResUserError)
    let resultUserError = JSON.parse(mockResUserError._getData())
    let statusUserError = mockResUserError._getStatusCode()
    expect(statusUserError).toBe(500)
    expect(resultUserError.message).toBe("Unable to create your account.")


  });
  it("login supplier ", async () => {

    let mockReqUser = nodeMockHttp.createRequest({
      method: 'PUT',
      url: 'api/register-supplier',
      body: {
        _id: "629352698dc707a4b435287c",
        firstName: "supplier",
        lastName: "supplier",
        email: "supplier.supplier@gmail.com",
        password: "azerty",
        phone: "0606060606"
      }
    })
    let mockResUser = nodeMockHttp.createResponse()
    await controlerAuth.userRegister(mockReqUser.body, "supplier", mockResUser)

    
    let mockReqUserValide = nodeMockHttp.createRequest({
      method: 'post',
      url: 'api/login-supplier',
      body: {
        email: "supplier.supplier@gmail.com",
        password: "azerty",

      }
    })
    let mockResUserValide = nodeMockHttp.createResponse()
    await controlerAuth.userLogin(mockReqUserValide.body, "supplier", mockResUserValide)
    let resultUser = JSON.parse(mockResUserValide._getData())
    let statusUser = mockResUserValide._getStatusCode()
    expect(resultUser.role).toBe("supplier")
    expect(resultUser.email).toBe("supplier.supplier@gmail.com")
    expect(resultUser.expiresIn).toBe(168)
    expect(resultUser.token).toBeDefined
    expect(resultUser.message).toBe('Hurray! You are now logged in.')
    expect(resultUser.success).toBe(true)
    expect(statusUser).toBe(200)

    let mockReqUserNoValide = nodeMockHttp.createRequest({
      method: 'post',
      url: 'api/login-supplier',
      body: {
        email: "supplier.supplier@gmail.com",
        password: "azerty",

      }
    })
    let mockResUserNoValide = nodeMockHttp.createResponse()
    await controlerAuth.userLogin(mockReqUserNoValide.body, "user", mockResUserNoValide)
    let resultUserNoValide = JSON.parse(mockResUserNoValide._getData())
    let statusUserNoValide = mockResUserNoValide._getStatusCode()
    expect(resultUserNoValide.success).toBe(false)
    expect(resultUserNoValide.message).toBe('Please make sure you are logging in from the right portal.')
    expect(statusUserNoValide).toBe(403)

    let mockReqUserEmail = nodeMockHttp.createRequest({
      method: 'post',
      url: 'api/login-supplier',
      body: {
        email: "suppler.supplier@gmail.com",
        password: "azerty",

      }
    })
    let mockResUserEmail = nodeMockHttp.createResponse()
    await controlerAuth.userLogin(mockReqUserEmail.body, "supplier", mockResUserEmail)
    let resultUserEmail = JSON.parse(mockResUserEmail._getData())
    let statusUserEmail = mockResUserEmail._getStatusCode()
    expect(resultUserEmail.success).toBe(false)
    expect(resultUserEmail.message).toBe('Email is not found. Invalid login credentials.')
    expect(statusUserEmail).toBe(404)

    let mockReqUserPWD = nodeMockHttp.createRequest({
      method: 'post',
      url: 'api/login-supplier',
      body: {
        email: "supplier.supplier@gmail.com",
        password: "azety",

      }
    })
    let mockResUserPWD = nodeMockHttp.createResponse()
    await controlerAuth.userLogin(mockReqUserPWD.body, "supplier", mockResUserPWD)
    let resultUserPWD = JSON.parse(mockResUserPWD._getData())
    let statusUserPWD = mockResUserPWD._getStatusCode()
    expect(resultUserPWD.success).toBe(false)
    expect(resultUserPWD.message).toBe('Incorrect password.')
    expect(statusUserPWD).toBe(403)

  });
  })
  