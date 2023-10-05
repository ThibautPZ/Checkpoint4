const tables = require("../tables");

const { encodeJWT } = require("../helpers/jwtHelper");
const { verifyPassword } = require("../helpers/argon2Helper");

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

const login = async (req, res) => {
  try {
    const isVerified = await verifyPassword(
      req.user.hashedPassword,
      req.body.password
    );
    if (isVerified) {
      delete req.user.hashedPassword;

      const token = encodeJWT(req.user);

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: false,
      });
      res.status(200).json(req.user);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const signUp = async (req, res) => {
  try {
    if (!req.body.usertype_id) {
      req.body.usertype_id = 1;
    }
    const [result] = await tables.users.insert(req.body);
    if (result.affectedRows) {
      delete req.body.passwordconfirmation;
      delete req.body.hashedPassword;
      res.status(201).json({ id: result.insertId, ...req.body });
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const logout = (req, res) => {
  res.clearCookie("auth_token").sendStatus(200);
};

module.exports = {
  login,
  signUp,
  logout,
  browse,
};
