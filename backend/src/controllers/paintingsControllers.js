const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const [rows] = await tables.paintings.readAll();
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

const readAllSizes = async (req, res, next) => {
  try {
    const [rows] = await tables.paintings.readAssociatedSizes();
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

const readAllTechniques = async (req, res, next) => {
  try {
    const [rows] = await tables.paintings.readAssociatedTechniques();
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

const readByTechnique = async (req, res, next) => {
  try {
    const technique = req.params.id;

    const [result] = await tables.paintings.readPaintingByTech(technique);
    if (result) {
      res.send(result);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const readByFormat = async (req, res, next) => {
  try {
    const format = req.params.id;

    const [result] = await tables.paintings.readPaintingBySize(format);
    if (result) {
      res.send(result);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const readByTitle = async (req, res, next) => {
  try {
    const title = req.params.id;

    const [result] = await tables.paintings.readByTitle(title);
    if (result) {
      const paintingId = await result[0].id;
      const [rows] = await tables.techniques.readByPaintingId(paintingId);
      result[0].techniques = await rows;
      if (result.family !== null) {
        const [sisters] = await tables.paintings.findAllFamilyMembers(
          result[0].familyId,
          result[0].id
        );
        result[0].sisters = await sisters;
      }

      res.send(result);
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
  readAllSizes,
  readAllTechniques,
  readByTechnique,
  readByFormat,
  readByTitle,
};
