const tables = require("../tables");

const checkUserDoesntExist = async (req, res, next) => {
  const [userByEmail] = await tables.users.findOneByEmail(req.body.email);

  if (userByEmail.length) {
    return res
      .status(400)
      .json({ message: "An user with this email adress already exists" });
  }
  return next();
};

module.exports = checkUserDoesntExist;
