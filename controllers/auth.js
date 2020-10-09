const { response, request } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generarJwt } = require("../helpers/jwt");

const createUser = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ ok: false, msg: "El usuario ya existe" });
    }

    user = new User(req.body);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    await user.save();

    const token = await generarJwt(user.id, user.name);

    res.status(201).json({
      ok: true,
      msg: "Register",
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, msg: "Por favor hable con el administrador" });
  }
};

const loginUser = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ ok: false, msg: "Error en la autenticación" });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ ok: false, msg: "Error en la autenticación" });
    }

    const token = await generarJwt(user.id, user.name);

    res.json({ ok: true, uid: user.id, name: user.name, token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, msg: "Por favor hable con el administrador" });
  }
};

const revalidationToken = async (req = request, res = response) => {
  const { uid, name } = req;
  const token = await generarJwt(uid, name);
  res.json({ ok: true, token });
};

module.exports = { createUser, loginUser, revalidationToken };
