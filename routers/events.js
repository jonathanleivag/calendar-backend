// host+/api/events

const { Router } = require("express");
const { check } = require("express-validator");
const {
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");

const { validarJwt } = require("../middlewares/validarJwt");
const { validatorForm } = require("../middlewares/validatorForm");

const router = Router();

router.use(validarJwt);

router.get("/", getEvent);
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").notEmpty(),
    check("start", "Fecha de inicio no tiene que estar vacia").custom(isDate),
    check("start", "Fecha de finalizacion no tiene que estar vacia").custom(
      isDate
    ),
    validatorForm,
  ],
  createEvent
);
router.put(
  "/:id",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    validatorForm,
  ],
  updateEvent
);
router.delete("/:id", deleteEvent);

module.exports = router;
