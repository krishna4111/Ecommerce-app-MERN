const express = require("express");
const router = express.Router();
const {
  registerUser,
  login,
  logout,
  authMiddleware,
} = require("../../controllers/auth/auth-controller");

router.post("/register", registerUser);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  return res.status(200).json({
    success: true,
    message: "Authenticated user",
    user: user,
  });
});

module.exports = router;
