const express = require("express");

const router = express.Router();

const itemRoutes = require("./routes/item.routes");
const paintingsRoutes = require("./routes/paintings.routes");

router.use("/items", itemRoutes);
router.use("/paintings", paintingsRoutes);
// router.use("/paintings", paintingsRoutes);

module.exports = router;
