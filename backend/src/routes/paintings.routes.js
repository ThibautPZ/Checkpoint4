const express = require("express");

const router = express.Router();

const paintingsControllers = require("../controllers/paintingsControllers");

// router.get("/paintings/:id", paintingsControllers.read);
router.get("/sizes", paintingsControllers.readAllSizes);

router.get("/techniques", paintingsControllers.readAllTechniques);

router.get("/technique/:id", paintingsControllers.readByTechnique);

router.get("/format/:id", paintingsControllers.readByFormat);

router.get("/:id", paintingsControllers.readByTitle);

router.get("/", paintingsControllers.browse);

module.exports = router;
