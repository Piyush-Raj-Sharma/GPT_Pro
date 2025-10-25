const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const generateTokens = require("../utils/tokens");

exports.registerUser = async (email, fullName, password) => {
  const existingUser = await userModel.findOne({ email });
  if (existingUser) throw new Error("User already Exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    fullName: {
      firstName: fullName.firstName,
      lastName: fullName.lastName,
    },
    email,
    password: hashedPassword,
  });

  const { accessToken, refreshToken } = generateTokens(user);

  return { user, accessToken, refreshToken };
};

exports.loginUser = async (email, password) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const { accessToken, refreshToken } = generateTokens(user);

  return { user, accessToken, refreshToken };
};
