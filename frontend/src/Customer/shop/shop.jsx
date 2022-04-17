import React, { useState, useEffect } from "react";
import "./shop.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../footer";
import Header from "../homeNavbar/homeNavbar";
import { useCartUpdate } from "../CartContext";


function Shop(props) {
  const [filterProducts, setfilterProducts] = useState();
  const [seasonsFilter, setSeasonsFilter] = useState(false);
  const [typeFilter, setTypeFilter] = useState(false);
  const [priceFilter, setpriceFilter] = useState(false);
  const [showAccessories, setShowAccessories] = useState(false);
  const [showplantsfilter, setShowplantsfilter] = useState(false);

  const [allProducts, setAllProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [productsToShow, setproductsToShow] = useState([]);

  let selectedAccessory = "all";

  const handleAddToCart = useCartUpdate();

  const handleFilterChange = (e) => {
    setfilterProducts(e.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/products/allProducts")
      .then((response) => {
        if (response.data.length > 0) {
          setAllProducts(
            response.data.map((prod) => {
              return prod;
            })
          );
          setCategoryProducts(
            response.data.map((prod) => {
              return prod;
            })
          );
          setproductsToShow(
            response.data.map((prod) => {
              return prod;
            })
          );
          console.log("response is:", response.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  function getAllProducts() {
    setCategoryProducts([...allProducts]);
    setproductsToShow([...allProducts]);
  }

  function filterByPrice(startPrice, endPrice) {
    setproductsToShow(
      categoryProducts.filter((item) => {
        return item.price >= startPrice && item.price <= endPrice;
      })
    );
  }

  function filterPlantsByPlace(place) {
    setproductsToShow(
      allProducts.filter((item) => {
        return (
          item.category === "plants" &&
          (item.place === place || item.place === "both")
        );
      })
    );
    setCategoryProducts(
      allProducts.filter((item) => {
        return (
          item.category === "plants" &&
          (item.place === place || item.place === "both")
        );
      })
    );
  }

  function setAccessories(first, second, third) {
    selectedAccessory = first;
    document.getElementById(first).style.background = "#cbe7f8";
    document.getElementById(second).style.background = "#FFFFFF";
    document.getElementById(third).style.background = "#FFFFFF";
    getRequiredAccessories();
  }

  function changeCategory(first, second, third, forth) {
    document.getElementById(first).style.background = "#cbe7f8";
    document.getElementById(second).style.background = "#FFFFFF";
    document.getElementById(third).style.background = "#FFFFFF";
    document.getElementById(forth).style.background = "#FFFFFF";
  }

  function getRequiredAccessories() {
    if (selectedAccessory === "all") {
      setproductsToShow(
        allProducts.filter((item) => {
          return (
            item.category === "seeds" ||
            item.category === "tools" ||
            item.category === "fertilizers"
          );
        })
      );
      setCategoryProducts(
        allProducts.filter((item) => {
          return (
            item.category === "seeds" ||
            item.category === "tools" ||
            item.category === "fertilizers"
          );
        })
      );
    } else {
      setproductsToShow(
        allProducts.filter((item) => {
          return item.category === selectedAccessory;
        })
      );
      setCategoryProducts(
        allProducts.filter((item) => {
          return item.category === selectedAccessory;
        })
      );
    }
  }

  function filterPlantsbySeasons(season) {
    if (season === "all") {
      setproductsToShow(
        categoryProducts.filter((item) => {
          return true;
        })
      );
    } else {
      setproductsToShow(
        categoryProducts.filter((item) => {
          return item.season.toLowerCase() === season;
        })
      );
    }
  }

  function sortProductsByKey(event) {
    let temp = event.target.value;
    if (temp === "sortby") {
      return;
    }
    var sortedallProducts = [];
    var sortedshowingProducts = [];
    var sortedCategoryProducts = [];

    if (temp === "productName") {
      sortedallProducts = allProducts.sort((a, b) =>
        a.productName > b.productName ? 1 : -1
      );
      sortedshowingProducts = productsToShow.sort((a, b) =>
        a.productName > b.productName ? 1 : -1
      );
      sortedCategoryProducts = categoryProducts.sort((a, b) =>
        a.productName > b.productName ? 1 : -1
      );
    } else if (temp === "lowToHigh") {
      sortedallProducts = allProducts.sort((a, b) =>
        a.price > b.price ? 1 : -1
      );
      sortedshowingProducts = productsToShow.sort((a, b) =>
        a.price > b.price ? 1 : -1
      );
      sortedCategoryProducts = categoryProducts.sort((a, b) =>
        a.price > b.price ? 1 : -1
      );
    } else if (temp === "highToLow") {
      sortedallProducts = allProducts.sort((a, b) =>
        a.price < b.price ? 1 : -1
      );
      sortedshowingProducts = productsToShow.sort((a, b) =>
        a.price < b.price ? 1 : -1
      );
      sortedCategoryProducts = categoryProducts.sort((a, b) =>
        a.price < b.price ? 1 : -1
      );
    } else {
      sortedallProducts = allProducts.sort((a, b) =>
        a.postedDate > b.postedDate ? 1 : -1
      );
      sortedshowingProducts = productsToShow.sort((a, b) =>
        a.postedDate > b.postedDate ? 1 : -1
      );
      sortedCategoryProducts = categoryProducts.sort((a, b) =>
        a.postedDate > b.postedDate ? 1 : -1
      );
    }
    setproductsToShow([...sortedshowingProducts]);
    setCategoryProducts([...sortedCategoryProducts]);
    setAllProducts([...sortedallProducts]);
  }

  const runCallback = (cb) => {
    return cb();
  };

  const navigate = useNavigate();
  const NavigateToSingleProduct = (item) => {
    navigate("/single", {
      state: { product: item, relatedProducts: categoryProducts },
    });
  };

  // const notify = () => {
  //   // Calling toast method by passing string
  //   toast.success("Product added to cart.", {
  //     autoClose: 3000,
  //     position: toast.POSITION.BOTTOM_RIGHT,
  //     backgroundColor: "black"
  //   });
  // };

  return (
    <div>
      {/* <Header />       */}
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

      <section>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-3">
              <h1
                className="h2 pb-4 thumbnail-mary-project"
                style={{ textAlign: "center" }}
              >
                Filter Products
              </h1>
              <ul className="list-unstyled templatemo-accordion">
                <li style={{ textAlign: "left" }}>
                  {showAccessories === true ? (
                    <div className="numberlist">
                      <ol>
                        <li id="tools">
                          <button
                            style={{
                              background: "None",
                              border: "None",
                              fontSize: "20px",
                            }}
                            onClick={() => {
                              setAccessories("tools", "fertilizers", "seeds");
                            }}
                          >
                            Tools
                          </button>
                        </li>
                        <li id="fertilizers">
                          <button
                            style={{
                              background: "None",
                              border: "None",
                              fontSize: "20px",
                            }}
                            onClick={() => {
                              setAccessories("fertilizers", "tools", "seeds");
                            }}
                          >
                            Fertilizers
                          </button>
                        </li>
                        <li id="seeds">
                          <button
                            style={{
                              background: "None",
                              border: "None",
                              fontSize: "20px",
                            }}
                            onClick={() => {
                              setAccessories("seeds", "tools", "fertilizers");
                            }}
                          >
                            Seeds
                          </button>
                        </li>
                      </ol>
                    </div>
                  ) : (
                    ""
                  )}
                </li>

                <li className="pb-3">
                  <div className="collapsed d-flex justify-content-between h3 text-decoration-none">
                    Price
                    <i
                      className="fa fa-fw fa-chevron-circle-down mt-1"
                      onClick={() => {
                        if (priceFilter === true) {
                          setpriceFilter(false);
                        } else {
                          setpriceFilter(true);
                          setTypeFilter(false);
                          setSeasonsFilter(false);
                        }
                      }}
                    ></i>
                  </div>

                  <ul
                    className={`applyHover collapse list-unstyled pl-3 ${
                      priceFilter ? "show" : ""
                    }`}
                    id="collapseTwo"
                  >
                    <li>
                      <button
                        className="text-decoration-none"
                        style={{ background: "None", border: "None" }}
                        onClick={() => {
                          filterByPrice(0, 100);
                        }}
                      >
                        Less than 100
                      </button>
                    </li>
                    <li>
                      <button
                        className="text-decoration-none"
                        style={{ background: "None", border: "None" }}
                        onClick={() => {
                          filterByPrice(100, 500);
                        }}
                      >
                        100 - 500
                      </button>
                    </li>

                    <li>
                      <button
                        className="text-decoration-none"
                        style={{ background: "None", border: "None" }}
                        onClick={() => {
                          filterByPrice(500, 1000);
                        }}
                      >
                        500 - 1000
                      </button>
                    </li>
                    <li>
                      <button
                        className="text-decoration-none"
                        style={{ background: "None", border: "None" }}
                        onClick={() => {
                          filterByPrice(1000, 5000);
                        }}
                      >
                        1000 - 5000
                      </button>
                    </li>
                    <li>
                      <button
                        className="text-decoration-none"
                        style={{ background: "None", border: "None" }}
                        onClick={() => {
                          filterByPrice(5000, 10000);
                        }}
                      >
                        5000+
                      </button>
                    </li>
                  </ul>
                </li>

                {showplantsfilter === true ? (
                  <div>
                    <li className="pb-3">
                      <div className="collapsed d-flex justify-content-between h3 text-decoration-none">
                        Season
                        <i
                          className="pull-right fa fa-fw fa-chevron-circle-down mt-1"
                          onClick={() => {
                            if (seasonsFilter === true) {
                              setSeasonsFilter(false);
                            } else {
                              setSeasonsFilter(true);
                              setpriceFilter(false);
                              setTypeFilter(false);
                            }
                          }}
                        ></i>
                      </div>

                      <ul
                        className={`applyHover collapse list-unstyled pl-3 ${
                          seasonsFilter ? "show" : ""
                        }`}
                        id="collapseTwo"
                      >
                        <li>
                          <button
                            className="text-decoration-none"
                            style={{ background: "None", border: "None" }}
                            onClick={() => {
                              filterPlantsbySeasons("winter");
                            }}
                          >
                            Winter
                          </button>
                        </li>
                        <li>
                          <button
                            className="text-decoration-none"
                            style={{ background: "None", border: "None" }}
                            onClick={() => {
                              filterPlantsbySeasons("summer");
                            }}
                          >
                            Summer
                          </button>
                        </li>
                        <li>
                          <button
                            className="text-decoration-none"
                            style={{ background: "None", border: "None" }}
                            onClick={() => {
                              filterPlantsbySeasons("autumn");
                            }}
                          >
                            Autumn
                          </button>
                        </li>
                        <li>
                          <button
                            className="text-decoration-none"
                            style={{ background: "None", border: "None" }}
                            onClick={() => {
                              filterPlantsbySeasons("spring");
                            }}
                          >
                            Spring
                          </button>
                        </li>
                        <li>
                          <button
                            className="text-decoration-none"
                            style={{ background: "None", border: "None" }}
                            onClick={() => {
                              filterPlantsbySeasons("all");
                            }}
                          >
                            All Seasons
                          </button>
                        </li>
                      </ul>
                    </li>

                    <li className="pb-3">
                      <div className="collapsed d-flex justify-content-between h3 text-decoration-none">
                        Type
                        <i
                          className="pull-right fa fa-fw fa-chevron-circle-down mt-1"
                          onClick={() => {
                            if (typeFilter === true) {
                              setTypeFilter(false);
                            } else {
                              setTypeFilter(true);
                              setSeasonsFilter(false);
                              setpriceFilter(false);
                            }
                          }}
                        ></i>
                      </div>
                      <ul
                        id="collapseThree"
                        className={`applyHover collapse list-unstyled pl-3 ${
                          typeFilter ? "show" : ""
                        }`}
                      >
                        <li>
                          <button
                            className="text-decoration-none"
                            style={{ background: "None", border: "None" }}
                          >
                            Vines & Climbers
                          </button>
                        </li>
                        <li>
                          <button
                            className="text-decoration-none"
                            style={{ background: "None", border: "None" }}
                          >
                            Flowering Plants
                          </button>
                        </li>
                        <li>
                          <button
                            className="text-decoration-none"
                            style={{ background: "None", border: "None" }}
                          >
                            Vegetable Plants
                          </button>
                        </li>

                        <li>
                          <button
                            className="text-decoration-none"
                            style={{ background: "None", border: "None" }}
                          >
                            Succulents
                          </button>
                        </li>
                        <li>
                          <button
                            className="text-decoration-none"
                            style={{ background: "None", border: "None" }}
                          >
                            Fruit Plants
                          </button>
                        </li>
                        <li>
                          <button
                            className="text-decoration-none"
                            style={{ background: "None", border: "None" }}
                          >
                            Shrubs
                          </button>
                        </li>
                        <li>
                          <button
                            className="text-decoration-none"
                            style={{ background: "None", border: "None" }}
                          >
                            Perennial
                          </button>
                        </li>
                      </ul>
                    </li>
                  </div>
                ) : (
                  ""
                )}
              </ul>
            </div>

            <div className="col-lg-9">
              <div className="row">
                <div className="col-md-6" style={{ textAlign: "center" }}>
                  <ul className="list-inline shop-top-menu pb-3 pt-1">
                    <li className="list-inline-item" id="all">
                      <button
                        className="h3 text-dark text-decoration-none mr-3"
                        onClick={() => {
                          changeCategory(
                            "all",
                            "indoor",
                            "outdoor",
                            "accessories"
                          );
                          setShowplantsfilter(false);
                          setSeasonsFilter(false);
                          setTypeFilter(false);
                          if (showAccessories === true) {
                            setShowAccessories(false);
                          }
                          getAllProducts();
                        }}
                        style={{ background: "None", border: "None" }}
                      >
                        All
                      </button>
                    </li>
                    <li className="list-inline-item" id="indoor">
                      <button
                        className="h3 text-dark text-decoration-none mr-3"
                        style={{ background: "None", border: "None" }}
                        onClick={() => {
                          changeCategory(
                            "indoor",
                            "all",
                            "outdoor",
                            "accessories"
                          );
                          selectedAccessory = "all";
                          setShowplantsfilter(true);
                          if (showAccessories === true) {
                            setShowAccessories(false);
                          }
                          filterPlantsByPlace("indoor");
                        }}
                      >
                        Indoor plants
                      </button>
                    </li>
                    <li className="list-inline-item" id="outdoor">
                      <button
                        className="h3 text-dark text-decoration-none mr-3"
                        style={{ background: "None", border: "None" }}
                        onClick={() => {
                          changeCategory(
                            "outdoor",
                            "indoor",
                            "all",
                            "accessories"
                          );
                          selectedAccessory = "all";
                          setShowplantsfilter(true);
                          if (showAccessories === true) {
                            setShowAccessories(false);
                          }
                          filterPlantsByPlace("outdoor");
                        }}
                      >
                        Outdoor plants
                      </button>
                    </li>
                    <li className="list-inline-item" id="accessories">
                      <button
                        className="h3 text-dark text-decoration-none"
                        style={{ background: "None", border: "None" }}
                        onClick={() => {
                          changeCategory(
                            "accessories",
                            "outdoor",
                            "indoor",
                            "all"
                          );
                          setSeasonsFilter(false);
                          setpriceFilter(false);
                          setTypeFilter(false);
                          setShowAccessories(true);
                          setShowplantsfilter(false);
                          getRequiredAccessories();
                        }}
                      >
                        Accessories
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6 pb-4">
                  <div className="d-flex">
                    <select
                      className="form-control"
                      onChange={(e) => {
                        handleFilterChange(e);
                        sortProductsByKey(e);
                      }}
                    >
                      <option value="sortby">Sort by...</option>
                      <option value="productName">A to Z</option>
                      <option value="highToLow">Price High to Low</option>
                      <option value="lowToHigh">Price Low to High</option>
                      <option value="newToStores">New In Stores</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                {productsToShow.map((item, index) => {
                  return (
                    <div
                      className="col-md-4"
                      style={{ maxHeight: "400px", height: "400px" }}
                      key={index}
                    >
                      <div className="card mb-4 product-wap rounded-0">
                        <div className="card rounded-0">
                          <img
                            className="card-img rounded-0 img-fluid"
                            src={item.imageurl}
                            alt="prouduct"
                            style={{ maxHeight: "250px", minHeight: "250px" }}
                          />
                          <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                            <ul className="list-unstyled">
                              <li>
                                <div className="btn btn-success text-white mt-2">
                                  <i className="far fa-heart"></i>
                                </div>
                              </li>
                              <li>
                                <div
                                  className="btn btn-success text-white mt-2"
                                  onClick={() => {
                                    NavigateToSingleProduct(item);
                                  }}
                                >
                                  <i className="far fa-eye"></i>
                                </div>
                              </li>
                              <li>
                                <div
                                  className="btn btn-success text-white mt-2"
                                  onClick={() => {
                                    handleAddToCart(item, 1);
                                  }}
                                >
                                  <i className="fas fa-cart-plus"></i>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="card-body">
                          <div
                            className="text-decoration-none"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              NavigateToSingleProduct(item);
                            }}
                          >
                            <h6
                              style={{
                                textAlign: "center",
                                height: "40px",
                                maxHeight: "40px",
                                overflow: "hidden",
                              }}
                            >
                              {item.productName}
                            </h6>
                          </div>
                          <ul className="list-unstyled d-flex justify-content-center mb-1">
                            <li>
                              {item.rating === "0" ? (
                                <div
                                  style={{ fontStyle: "italic", color: "gray" }}
                                >
                                  Not rated yet
                                </div>
                              ) : (
                                runCallback(() => {
                                  const row = [];
                                  for (var i = 0; i < 5; i++) {
                                    let rating = parseFloat(
                                      item.rating
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
                                        <i
                                          key={i}
                                          className="text-muted fa fa-star"
                                        ></i>
                                      );
                                    }
                                  }
                                  return row;
                                })
                              )}
                            </li>
                          </ul>

                          <p className="text-center mb-0">
                            {" "}
                            Rs {item.price} /-
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Shop;
