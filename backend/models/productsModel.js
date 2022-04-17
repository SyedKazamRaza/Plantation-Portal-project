const mongoose = require("mongoose");
const {Category} = require("./categoryModel");
const {Store} = require("./storeModel");

const productsSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  details: { type: String, required: true },
  imageurl: { type: String, required: true },
  itemsAvailable: { type: Number, required: true },
  postedDate: { type: String, required: true },

  category: { type: String, required: true },
  season: { type: String },
  place: { type: String},
  type: { type: String },
  rating: { type: String },


  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const Products = mongoose.model("products", productsSchema);

module.exports.Products = Products;