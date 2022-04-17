import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./singleProduct.css";
import Header from "../homeNavbar/homeNavbar";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { useCartUpdate } from "../CartContext";

function SingleProduct(props) {
  const [quantity, setQuantity] = useState(0);
  var countRelatedProducts = 0;

  const handleAddToCart = useCartUpdate();

  const location = useLocation();
  console.log(location.state.relatedProducts);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.state]);

  const runCallback = (cb) => {
    return cb();
  };

  const navigate = useNavigate();
  const NavigateToSingleProduct = (item) => {
    navigate("/single", {
      state: { product: item, relatedProducts: location.state.relatedProducts },
    });
  };

  const incrementCounter = () => {
    countRelatedProducts = countRelatedProducts + 1;
  };


  return (
    <div>
      {/* <Header /> */}
      <section className="breadcrumbs-custom-inset">
        <div className="breadcrumbs-custom context-dark bg-overlay-46">
          <div className="container">
            <h1 className="breadcrumbs-custom-title">Shop</h1>
            <ul className="breadcrumbs-custom-path">
              <li>Home</li>
              <li className="active">Shop</li>
            </ul>
          </div>
          <div
            className="box-position"
            style={{
              backgroundImage: `url("images/store.jpg")`,
            }}
          ></div>
        </div>
      </section>

      <section className="bg-light">
        <div className="container pb-5">
          <div className="row">
            <div className="col-lg-5 mt-5">
              <div className="card mb-3">
                <img
                  className="card-img img-fluid"
                  src={location.state.product.imageurl}
                  alt="Card cap"
                  id="product-detail"
                />
              </div>
              <button className="contactSeller">Contact Seller</button>
            </div>
            <div className="col-lg-7 mt-5">
              <div className="card">
                <div className="card-body">
                  <div className="productNamePrice">
                    <h1 className="h1" style={{ color: "#4682B4" }}>
                      {location.state.product.productName}
                    </h1>
                    <p className="h3 py-2">
                      Rs {location.state.product.price} /-
                    </p>
                  </div>
                  <p>
                    <strong>Store Name:</strong>{" "}
                    {location.state.product.storeInfo[0].storeName}
                  </p>

                  <p className="py-2">
                    {location.state.product.rating === "0" ? (
                      <span style={{ fontStyle: "italic", color: "gray" }}>
                        Not rated yet
                      </span>
                    ) : (
                      runCallback(() => {
                        const row = [];
                        for (var i = 0; i < 5; i++) {
                          let rating = parseFloat(
                            location.state.product.rating
                          ).toFixed(0);
                          if (i < rating) {
                            row.push(
                              <i
                                key={i}
                                className="text-warning fa fa-star"
                              ></i>
                            );
                          } else {
                            row.push(
                              <i key={i} className="text-muted fa fa-star"></i>
                            );
                          }
                        }
                        return row;
                      })
                    )}
                    <span
                      className="list-inline-item text-dark"
                      style={{ marginLeft: "16px" }}
                    >
                      Rating {location.state.product.rating} | 36 Comments
                    </span>
                  </p>
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <h6>Category:</h6>
                    </li>
                    <li className="list-inline-item">
                      <p className="text-muted">
                        <strong>{location.state.product.category}</strong>
                      </p>
                    </li>
                    {location.state.product.category === "plants" ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <li className="list-inline-item">
                          <p>
                            <strong style={{ color: "#4682B4" }}>
                              {" "}
                              Place:{" "}
                            </strong>
                            {location.state.product.place} plant
                          </p>
                        </li>
                        <li className="list-inline-item">
                          <p>
                            <strong style={{ color: "#4682B4" }}>
                              {" "}
                              Type:{" "}
                            </strong>
                            {location.state.product.type}
                          </p>
                        </li>
                        <li className="list-inline-item">
                          <p>
                            <strong style={{ color: "#4682B4" }}>
                              {" "}
                              Season:{" "}
                            </strong>
                            {location.state.product.season}
                          </p>
                        </li>
                      </div>
                    ) : (
                      ""
                    )}
                  </ul>

                  <h6>About {location.state.product.productName}:</h6>
                  <p>{location.state.product.details}</p>

                  <br />
                  <h6>What makes it special:</h6>

                  <ul style={{ listStyleType: "disc" }}>
                    <li>Accelerates wound healing</li>
                    <li>It can be planted outdoor as well as indoor.</li>
                    <li>Improves skin</li>
                  </ul>

                  {location.state.product.category === "plants" ? (
                    <div>
                      <h6>Plant Care:</h6>
                      <p style={{ color: "#eda407" }}>
                        Get your plants ready to slay!
                      </p>
                      <ul>
                        <li>Bright indirect light</li>
                        <li>Water Moderately</li>
                        <li>Place Low Light Plants in Bathrooms</li>
                        <li>
                          It's Better to Underwater Your Plants Than Overwater
                          Them
                        </li>
                        <li>Cleaning your plant after regular interval</li>
                        <li>View our Plant Care Guide</li>
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="row">
                    <div className="col-auto">
                      <ul className="list-inline pb-3">
                        <li className="list-inline-item text-right">
                          Quantity
                          <input
                            type="hidden"
                            name="product-quanity"
                            id="product-quanity"
                            value="1"
                          />
                        </li>
                        <li className="list-inline-item">
                          <span
                            className="btn btn-success"
                            id="btn-minus"
                            onClick={() => {
                              if (quantity !== 0) {
                                setQuantity(quantity - 1);
                              }
                            }}
                          >
                            -
                          </span>
                        </li>
                        <li className="list-inline-item">
                          <span className="badge bg-secondary" id="var-value">
                            {quantity}
                          </span>
                        </li>
                        <li className="list-inline-item">
                          <span
                            className="btn btn-success"
                            id="btn-plus"
                            onClick={() => {
                              setQuantity(quantity + 1);
                            }}
                          >
                            +
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="row pb-3">
                    <div className="col d-grid">
                      <button
                        className="button button-primary button-ujarak wow fadeInUp"
                        // data-lightgallery="item"
                        // data-wow-delay=".1s"
                      >
                        Buy
                      </button>
                    </div>
                    <div className="col d-grid">
                      <button
                        className="button button-primary button-ujarak wow fadeInUp"
                        // data-lightgallery="item"
                        // data-wow-delay=".1s"
                        onClick={() => {
                          handleAddToCart(location.state.product, quantity);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* </div>
        </div> */}
      </section>

      <section className="related-product-area">
        <div className="container">
          <div className="section-intro pb-60px">
            <p style={{ textAlign: "center" }}>You may also like</p>
            <h2 style={{ textAlign: "center", fontSize: "60px" }}>
              Related Products
            </h2>
          </div>

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {location.state.relatedProducts.map((item, index) => {
                return item.category === location.state.product.category &&
                  countRelatedProducts < 8 &&
                  item._id !== location.state.product._id ? (
                  <Grid key={index} item xs={3}>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        NavigateToSingleProduct(item);
                      }}
                      className="relatedProduct row"
                    >
                      <div className="single-search-product d-flex">
                        <div>
                          <img
                            src={item.imageurl}
                            alt="product"
                            style={{
                              maxHeight: "90px",
                              maxWidth: "90px",
                              minHeight: "90px",
                              minWidth: "90px",
                            }}
                          />
                        </div>
                        <div className="desc">
                          <h6
                            style={{ fontSize: "17px", marginTop: "5px" }}
                            className="title "
                          >
                            {item.productName}
                          </h6>
                          <div
                            style={{ textAlign: "center", color: "black" }}
                            className="price"
                          >
                            Rs {item.price} /-
                            {incrementCounter()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid>
                ) : (
                  ""
                );
              })}
            </Grid>
          </Box>
          <br />
          <br />
        </div>
      </section>
    </div>
  );
}

export default SingleProduct;
