const express = require("express");

const router = express.Router();

const usersControllers = require("../controllers/usersControllers");

router.get("/", usersControllers.browse);

module.exports = router;
