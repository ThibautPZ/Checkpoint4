const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const [rows] = await tables.users.readAll();
    if (rows) {
      res.send(rows);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = {
  browse,
};
