const express = require("express");

const router = express.Router();

// router.get("/");
router.post("/signup");
router.post("/login");
router.get("/:id");

module.exports = router;
