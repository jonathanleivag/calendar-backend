// host+/api/auth

const { Router } = require("express");
const { check } = require("express-validator");
const {
  createUser,
  loginUser,
  revalidationToken,
} = require("../controllers/auth");
const { validarJwt } = require("../middlewares/validarJwt");
const { validatorForm } = require("../middlewares/validatorForm");

const router = Router();

router.post(
  "/new",
  [
    check("name", "El nombre no tiene que estar vacio")
      .notEmpty()
      .isLength({ min: 3 }),
    check("email", "No existe email").isEmail(),
    check("password", "El minimo de caracteres son de 6").isLength({ min: 6 }),
    validatorForm,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "No existe email").isEmail(),
    check("password", "El minimo de caracteres son de 6").isLength({ min: 6 }),
    validatorForm,
  ],
  loginUser
);

router.get("/renew", validarJwt, revalidationToken);

module.exports = router;
