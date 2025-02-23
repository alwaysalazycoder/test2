// PACKAGES IMPORTS
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";

// IMPORTS FROM OTHER FILES
import User from "../models/Users.js";
import generateToken from "../utils/generateToken.js";
import CustomError from "../utils/customError.js";
import asyncHandler from "../utils/asyncHandler.js";
import logger from "../utils/logger.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    logger.warn("Signup failed missing fields");
    throw new CustomError("All fields are required", 400);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    logger.warn("Signup failed user already exists");
    throw new CustomError("User already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashedPassword });

  // sendResponse(res, 201, { token: generateToken(newUser._id), user: newUser });
  res.send(200,{newUser})
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    logger.warn("Login failed missing fields");
    throw new CustomError("All fields are required", 400);
  }

  const user = await User.findOne({ email });
  if (!user) throw new CustomError("User not found", 404);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    logger.error("Authentication failed invalid credentials");
    throw new CustomError("Invalid credentials", 401);
  }

  sendResponse(res, 200, { token: generateToken(user._id), user });
});

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    console.log(token);
    if (!token) throw new CustomError("Google token is required", 400);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { sub, email, name, picture } = ticket.getPayload();

    let user = await User.findOne({ googleId: sub });
    if (!user) {
      user = await User.create({ googleId: sub, email, name, image: picture });
    }

    // sendResponse(res, 200, { token: generateToken(user.  _id), user });
    res.send(200, { token: generateToken(user._id), user });
  } catch (err) {
    console.log(err);
  }
};
