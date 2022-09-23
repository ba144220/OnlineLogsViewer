const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const { UserModel } = require("../models/UserModel");
const TOKEN_EXPIRES_IN = "7h";

dotenv.config();

exports.signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const emailLower = email.toLowerCase().replace(/\s/g, "");

    const existingUser = await UserModel.findOne({ email: emailLower });
    if (existingUser) {
      console.log("User already exists.");
      return res.status(401).send();
    }

    if (!(name && email && password)) {
      console.log("Not fill in all blanks");
      return res.status(403).send();
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await UserModel.create({
      email: emailLower,
      password: hashedPassword,
      name: name,
    });
    console.log("Create User Successful");
    return res.status(200).json();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailLower = email.toLowerCase().replace(/\s/g, "");

    const existingUser = await UserModel.findOne({ email: emailLower });

    // Check if the user exist
    if (!existingUser) {
      console.log("使用者不存在");
      return res.status(404).send();
    }
    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      console.log("密碼錯誤");
      return res.status(400).send();
    }

    // Give the token
    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: TOKEN_EXPIRES_IN,
      }
    );

    return res.status(200).json({ user: existingUser, token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};
