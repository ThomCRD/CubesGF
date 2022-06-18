
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

describe("Test controler Auth", () => {
    it("Connect User ", async () => {
        let mockReqUser = nodeMockHttp.createRequest({
          method: 'POST',
          url: 'api/register',
          body: {
            firstName: "Rene",
            lastName: "Kikoul",
            email: "rene.kikoul@gmail.com",
            password: "rhume",
            phone: "0606060606"
          }
        })
        let mockResUser = nodeMockHttp.createResponse()
        await controlerUser.createUser(mockReqUser, mockResUser)

        let mockReqUserLogging = nodeMockHttp.createRequest({
            method: 'POST',
            url: 'api/register',
            body: {
              email: "rene.kikoul@gmail.com",
              password: "rhume",
            }
          })
          let mockResUserLogging = nodeMockHttp.createResponse()
          await controlerAuth.sendLogin(mockReqUserLogging, mockResUserLogging)
          let resultUserLogging = JSON.parse(mockResUserLogging._getData())
          let statusUserLogging = mockResUserLogging._getStatusCode()
          expect(statusUserLogging).toBe(200)
          expect(resultUserLogging.message).toBe("connected")
          expect(resultUserLogging.access_token).toBeDefined()

          let mockReqUserLoggingFalseMail = nodeMockHttp.createRequest({
            method: 'POST',
            url: 'api/register',
            body: {
              email: "rene.kikul@gmail.com",
              password: "rhume",
            }
          })
          let mockResUserLoggingFalseMail = nodeMockHttp.createResponse()
          await controlerAuth.sendLogin(mockReqUserLoggingFalseMail, mockResUserLoggingFalseMail)
          let resultUserLoggingFalseMail = JSON.parse(mockResUserLoggingFalseMail._getData())
          let statusUserLoggingFalseMail = mockResUserLoggingFalseMail._getStatusCode()
          expect(statusUserLoggingFalseMail).toBe(404)
          expect(resultUserLoggingFalseMail.message).toBe("Wrong mail or password")


          let mockReqUserLoggingFalsePassword = nodeMockHttp.createRequest({
            method: 'POST',
            url: 'api/register',
            body: {
              email: "rene.kikoul@gmail.com",
              password: "rhu",
            }
          })
          let mockResUserLoggingFalsePassword = nodeMockHttp.createResponse()
          await controlerAuth.sendLogin(mockReqUserLoggingFalsePassword, mockResUserLoggingFalsePassword)
          let resultUserLoggingFalsePassword = JSON.parse(mockResUserLoggingFalsePassword._getData())
          let statusUserLoggingFalsePassword = mockResUserLoggingFalsePassword._getStatusCode()
          expect(statusUserLoggingFalsePassword).toBe(401)
          expect(resultUserLoggingFalsePassword.message).toBe("Wrong mail or password")

      });
      
  })
  