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
      return res.status(200).json({
        success: false,
        message: "User is already exists with the same email please try again",
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
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const compareHashedPassword = await bcrypt.compare(password, user.password);

    if (!compareHashedPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const userData = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(userData, process.env.JWT_SECRET_KEY, {
      expiresIn: "60m",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, //true in production (HTTPS)
      maxAge: 60 * 60 * 1000, //1 hour
    });

    return res.status(200).json({
      success: true,
      message: "User login successfully!!!",
      user: userData,
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
    res.clearCookie("token").json({
      success: true,
      message: "logged out successfully",
    });
  } catch (error) {
    console.error("Error when logout");
    res.status(500).json({
      success: false,
      message: "Error when logout the user ",
    });
  }
};

//auth Middleware it will used when ever a user refresh the page.
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error in auth middleware", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  registerUser,
  login,
  logout,
  authMiddleware,
};
