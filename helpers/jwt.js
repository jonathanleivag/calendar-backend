const { response } = require("express");
const jwt = require("jsonwebtoken");

const generarJwt = (uid, name) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { uid, name },
      process.env.SECRET_JWT_SEED,
      { expiresIn: "2h" },
      (error, token) => {
        if (error) {
          console.error(error);
          reject("No se puedo generar el token");
        }
        resolve(token);
      }
    );
  });
};

module.exports = { generarJwt };
