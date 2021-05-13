const express = require("express");
const router = new express.Router();
const User = require("../model/userModel");
const {
  BadRequestError,
  ExpectationFailureError,
  NotFoundError,
} = require("./../../lib/appErrors");

// signing up the user
router.post("/user/sign-up", async (req, res) => {
  if (!req.body) throw new BadRequestError("invalid data", 400);
  const newUser = new User(req.body);

  await newUser.save();
  const token = await newUser.generateToken();
  if (!token) throw new ExpectationFailureError("token was not generated");

  res.status(201).json({
    success: true,
    message: "user created successfully",
    newUser,
    token,
  });
});

// signing in user{}
// we need to get the users email, and ensure that the user exists in the database

router.post("/user/sign-in", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findUserByCredentials(
      req.body.email,
      req.body.password
    );

    if (!user) throw new NotFoundError("User was not found", 404);
    const token = await user.generateToken();

    res.status(200).json({
      success: true,
      message: "successful login",
      user,
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(404).json({
      success: false,
      message: e,
    });
  }
});
module.exports = router;
