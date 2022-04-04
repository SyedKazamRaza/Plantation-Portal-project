const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  categoryType: { type: String, required: true },
});

const Category = mongoose.model("category", categorySchema);

module.exports.Category = Category;
