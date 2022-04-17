const router = require("express").Router();
const _ = require("lodash");
const { Products } = require("../models/productsModel");
const { Category } = require("../models/categoryModel");
const { Store } = require("../models/storeModel");

// router.get("/", (req, res) => {
//   res.send("I am product router");
// });

router.get("/allProducts", async (req, res) => {

  Products.aggregate(
    [
      {
        $lookup: {
          from: "stores", // collection to join - Should have same name as collection mongoDB
          localField: "storeId", //field from the input documents
          foreignField: "_id", //field from the documents of the "from" collection
          as: "storeInfo", // output array field
        },
      },
      {
        "$project": {                       //field we don't want to include in result
          "storeInfo.totalEarning": 0,
          "storeInfo.ordersCompleted": 0,
          "storeInfo.status": 0,
          "storeInfo.username": 0,
          "storeInfo.password": 0,
        }
      }
    ],
    function (error, data) {
      if(error){
        console.log("Error received");
        res.json([]);
      }
      console.log(data);
      res.json(data);
    }
  );
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
            res.status(200).json(productsToSend);
          }
        })
        .catch((err) => {
          console.log("Promise NOT fulfilled " + err);
        });
    }
       // res.json(productsToSend)
  } catch (err) {
    res.status(201).send("Error in getting the products..");
  }
});

module.exports.productRouter = router;
