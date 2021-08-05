const express = require("express");

const usersControllers = require("../controllers/users-controllers");

const router = express.Router();

router.post("/newuser", usersControllers.newUser);

module.exports = router;
