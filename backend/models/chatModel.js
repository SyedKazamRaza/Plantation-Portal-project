const mongoose = require("mongoose");
const { Users } = require("./usersModel");
const { Store } = require("./storeModel");

const chatSchema = new mongoose.Schema({
  lastMSg: { type: String, required: true },
  lastMSgPerson: { type: String, required: true },
  lastMsgTime: {type: String},
  firstUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  secondUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
  },
  message: { type: Array, required: true },
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports.Chat = Chat;
