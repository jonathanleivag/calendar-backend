const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: { type: String, require: true },
  email: { type: String, requiere: true, unique: true },
  password: { type: String, requiere: true },
});

module.exports = model("User", UserSchema);
