const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  storeName: { type: String, required: true },
  totalEarning: { type: Number, required: true },
  ordersCompleted: { type: Number, required: true },
  status: { type: String, required: true },
});

const Store = mongoose.model("Store", storeSchema);
module.exports.Store = Store;

