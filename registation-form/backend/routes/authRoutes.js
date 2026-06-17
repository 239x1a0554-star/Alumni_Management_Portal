const express = require("express");
const router = express.Router();

try {
  const authController = require("../controllers/authController");

  if (authController && authController.register && authController.login) {
    router.post("/register", authController.register);
    router.post("/login", authController.login);
  } else {
    router.post("/register", async (req, res) => {
      return res
        .status(501)
        .json({ message: "Register handler not implemented" });
    });
    router.post("/login", async (req, res) => {
      return res.status(501).json({ message: "Login handler not implemented" });
    });
  }
} catch (err) {
  router.post("/register", async (req, res) => {
    return res
      .status(501)
      .json({ message: "Register handler not implemented" });
  });
  router.post("/login", async (req, res) => {
    return res.status(501).json({ message: "Login handler not implemented" });
  });
}

module.exports = router;