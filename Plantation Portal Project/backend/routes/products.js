const router = require("express").Router();
const _ = require("lodash");
const { Products } = require("../models/productsModel");
const { Category } = require("../models/categoryModel");
const { Store } = require("../models/storeModel");

router.get("/", (req, res) => {
  res.send("I am product router");
});

router.get("/hello", (req, res) => {
  res.send("I am router");
});

var storeArray = [];
const promise = async (singleProd, reqCategory) => {
  const productStore = await Store.findOne({
    _id: singleProd.storeId,
  });
  storeArray.push(productStore.storeName);

  const selectedProd = await Category.findOne({
    _id: singleProd.categoryId,
  });
  //   console.log(selectedProd);
  if (selectedProd.categoryName === reqCategory) {
    return true;
  } else {
    return false;
  }
};

router.get("/allproduct/:category", async (req, res) => {
  const reqCategory = req.params.category;
  console.log("Category is: " + reqCategory);
  try {
    var productsToSend = [];
    const prod = await Products.find();

    for (let i = 0; i < prod.length; i++) {
      var singleProd = prod[i];
      await promise(singleProd, reqCategory)
        .then((value) => {
          if (value === true) {
            var obj = {
              id: singleProd._id,
              productName: singleProd.productName,
              price: singleProd.price,
              category: reqCategory,
              details: singleProd.details,
              imageurl: singleProd.imageurl,
              itemsAvailable: singleProd.itemsAvailable,
              postedDate: singleProd.postedDate,
              storename: storeArray[i],
            };

            productsToSend.push(obj);
          }
          if (i === prod.length - 1) {
            // res.send(productsToSend);
            res.status(200).json(productsToSend);
            // return;
          }
        })
        .catch((err) => {
          console.log("Promise NOT fulfilled " + err);
        });
    }
    // prod.map(async (singleProd) => {
    //   await promise(singleProd)
    //     .then((value) => {
    //     //   console.log("Promise fulfilled" + value);
    //     if(value){
    //         productsToSend.push(singleProd);
    //     }
    //     console.log(productsToSend);
    //     })
    //     .catch((err) => {
    //       console.log("Promise NOT fulfilled " + err);
    //     });
    // })
    // res.send(productsToSend);

    // console.log(productsCategory);

    // productsToSend = prod.filter(async (singleProd) => {
    //   const selectedProd = await Category.findOne({
    //     _id: singleProd.categoryId,
    //   });
    //   if (selectedProd.categoryName === reqCategory) {
    //     console.log("inside");
    //     return true;
    //   }
    //   return false;
    // });
    // console.log(productsToSend.length);
    // // res.send(productsToSend);
    // res.json(productsToSend)
  } catch (err) {
    res.status(201).send("Error in getting the products..");
  }
});

module.exports.productRouter = router;
