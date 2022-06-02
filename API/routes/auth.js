/**** Import of necessary modules */

const express = require('express')
const {
  sendLogin, 
  userAuth, 
  checkRole,
  userLogin, 
  userRegister
}  = require('../controllers/auth')


/**** Router Recovery */
const router = express.Router()

/**** Middleware for date and time */
// router.use((req, res, next) => {
//     const event = new Date()
//     console.log(`Auth login time : ${event.toString()}`)
//     next()
// })

/****Auth resource routing */
// router.post('/login', sendLogin )

// Users Registeration Route
router.post("/register-user", async (req, res) => {
    console.log(req.body)
    await userRegister(req.body, "user", res);
});

// Users Login Route
router.post("/login-user", async (req, res) => {
    await userLogin(req.body, "user", res);
});

// Admin Registration Route
router.post("/register-admin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});

// Admin Registration Route
router.post("/login-admin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});

// Admin Registration Route
router.post("/register-customer", async (req, res) => {
  await userRegister(req.body, "customer", res);
});

// Admin Registration Route
router.post("/login-customer", async (req, res) => {
  await userRegister(req.body, "customer", res);
});

// Admin Registration Route
router.post("/register-franchisee", async (req, res) => {
  await userRegister(req.body, "franchisee", res);
});

// Admin Registration Route
router.post("/login-franchisee", async (req, res) => {
  await userRegister(req.body, "franchisee", res);
});

// Admin Registration Route
router.post("/register-supplier", async (req, res) => {
  await userRegister(req.body, "supplier", res);
});

// Admin Registration Route
router.post("/login-supplier", async (req, res) => {
  await userRegister(req.body, "supplier", res);
});

// Profile Route
router.get("/profile", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});

// Users Protected Route
router.get(
  "/user-protectd",
  userAuth,
  checkRole(["user"]),
  async (req, res) => {
    return res.json("Hello User");
  }
);

module.exports = router