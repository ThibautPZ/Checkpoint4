const express = require("express");

const router = express.Router();

const itemRoutes = require("./routes/item.routes");
const paintingsRoutes = require("./routes/paintings.routes");
const authRoutes = require("./routes/auth.routes");
const usersRoutes = require("./routes/users.routes");

router.use("/items", itemRoutes);
router.use("/paintings", paintingsRoutes);
router.use("/auth", authRoutes);
router.use("/users", usersRoutes);

module.exports = router;
