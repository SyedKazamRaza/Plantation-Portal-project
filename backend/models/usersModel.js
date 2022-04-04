const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  phoneNo: { type: String, required: true },
  email: { type: String, required: true },
  homeAddress: { type: String, required: true },
});

const Users = mongoose.model("Users", usersSchema);
module.exports.Users = Users;
