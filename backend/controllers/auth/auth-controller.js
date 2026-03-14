require("dotenv").config();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({
      email: email,
    });

    if (existingUser) {
      return res.status(409).json({
        success: true,
        message: "User is already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "user created successfully",
      user,
    });
  } catch (error) {
    console.error("Error when register the user", error);
    res.status(500).json({
      success: false,
      message: "Error wen register user",
    });
  }
};

//login

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const compareHashedPassword = await bcrypt.compare(password, user.password);

    if (!compareHashedPassword) {
      return res.status(401).json({
        success: false,
        message: "Wrong Password ",
      });
    }

    const userData = {
      userId: user.id,
      email: user.email,
    };

    const token = jwt.sign(userData, process.env.JWT_SECRET_KEY);

    return res.status(200).json({
      success: true,
      message: "User login successfully!!!",
      token,
    });
  } catch (error) {
    console.error("Error when login", error);
    res.status(500).json({
      success: false,
      message: "Error when login user",
    });
  }
};

//logout

const logout = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error when logout");
    res.status(500).json({
      success: false,
      message: "Error when logout the user ",
    });
  }
};

//

module.exports = {
  registerUser,
  login,
  logout,
};
