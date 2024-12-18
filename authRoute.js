const express = require("express");
const { userSignup, userLogin, fetchUser } = require("../controllers/Auth");
const { auth } = require("../middlewares/auth");
const authRouter = express.Router();

authRouter.post("/signup", userSignup);
authRouter.post("/login", userLogin);
authRouter.get("/fetch", auth, fetchUser);

module.exports = authRouter;