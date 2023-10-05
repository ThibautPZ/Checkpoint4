const { checkSchema } = require("express-validator");

const createUserSchema = checkSchema({
  lastname: {
    exists: {
      errorMessage: "Vous devez renseigner un nom de famille.",
      options: {
        checkFalsy: true,
      },
    },
    isLength: {
      options: { min: 2, max: 64 },
      errorMessage: "Le nom doit avoir entre 2 et 64 caractères.",
    },
  },
  firstname: {
    exists: {
      errorMessage: "Vous devez renseigner un prénom.",
      options: {
        checkFalsy: true,
      },
    },
    isLength: {
      options: { min: 2, max: 64 },
      errorMessage: "Le prénom doit avoir entre 2 et 64 caractères.",
    },
  },

  email: {
    exists: {
      errorMessage: "Vous devez renseigner une adresse email.",
      options: {
        checkFalsy: true,
      },
    },
    isEmail: {
      errorMessage: "L'adresse email doit avoir un format valide.",
    },
  },
  password: {
    exists: {
      errorMessage: "Vous devez renseigner un mot de passe.",
      options: {
        checkFalsy: true,
      },
    },
    isLength: {
      options: { min: 8, max: 64 },
      errorMessage: "Le mot de passe doit avoir entre 8 et 64 caractères. ",
    },
  },
  account_date: {
    exists: {
      errorMessage: "La date est manquante",
      options: {
        checkFalsy: true,
      },
    },
  },
  user_types_id: {
    exists: {
      errorMessage: "Le type d'utilisateur est manquant.",
      options: {
        checkFalsy: true,
      },
    },
  },
});

// TODO: missing validations

module.exports = createUserSchema;
