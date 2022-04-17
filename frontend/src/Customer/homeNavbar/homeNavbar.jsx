import React from "react";
import { Link } from "react-router-dom"; //Link is used instead of <a> to prevent requesting server on every render
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import { useCart } from "../CartContext";

const Header = (props) => {
  const cartProducts = useCart();
  console.log("I am Cart Products");
  console.log(cartProducts);

  return (
    <div>
      <header className="section page-header">
        <div className="rd-navbar-wrap rd-navbar-modern-wrap">
          <nav
            className="rd-navbar rd-navbar-modern"
            data-layout="rd-navbar-fixed"
            data-sm-layout="rd-navbar-fixed"
            data-md-layout="rd-navbar-fixed"
            data-md-device-layout="rd-navbar-fixed"
            data-lg-layout="rd-navbar-static"
            data-lg-device-layout="rd-navbar-fixed"
            data-xl-layout="rd-navbar-static"
            data-xl-device-layout="rd-navbar-static"
            data-xxl-layout="rd-navbar-static"
            data-xxl-device-layout="rd-navbar-static"
            data-lg-stick-up-offset="46px"
            data-xl-stick-up-offset="46px"
            data-xxl-stick-up-offset="70px"
            data-lg-stick-up="true"
            data-xl-stick-up="true"
            data-xxl-stick-up="true"
          >
            <div className="rd-navbar-main-outer">
              <div className="rd-navbar-main">
                <div className="rd-navbar-panel">
                  <button
                    className="rd-navbar-toggle"
                    data-rd-navbar-toggle=".rd-navbar-nav-wrap"
                  >
                    <span></span>
                  </button>
                  {/* <div className="rd-navbar-brand">
                      <Link className="brand" to="">
                        <img
                          src={"/images/logo.jpg"}
                          alt=""
                          width="196"
                          height="47"
                        />
                      </Link>
                    </div> */}
                </div>
                <div className="rd-navbar-main-element">
                  <div className="rd-navbar-nav-wrap">
                    <div className="rd-navbar-basket-wrap">
                      <button
                        className="rd-navbar-basket fl-bigmug-line-shopping198"
                        data-rd-navbar-toggle=".cart-inline"
                      >
                        {/* <span>{props.NoOfProductsInCart}</span> */}
                        <span>{cartProducts.length}</span>
                      </button>
                      <div className="cart-inline">
                        <div className="cart-inline-header">
                          <h5 className="cart-inline-title">
                            There are no products in the cart.
                          </h5>
                        </div>
                      </div>
                    </div>
                    {/* <div className="rd-navbar-basket-wrap">
                        <button
                          className="rd-navbar-basket far fa-heart-o"
                          data-rd-navbar-toggle=".cart-inline"
                        >
                          <span>0</span>
                        </button>
                        <div className="cart-inline">
                          <div className="cart-inline-header">
                            <h5 className="cart-inline-title">
                              There are no products in the wishlist.
                            </h5>
                          </div>
                        </div>
                      </div> */}
                    <div className="rd-navbar-search">
                      <button
                        className="rd-navbar-search-toggle"
                        data-rd-navbar-toggle=".rd-navbar-search"
                      >
                        <span></span>
                      </button>
                      <form className="rd-search" action="#">
                        <div className="form-wrap">
                          <label
                            className="form-label"
                            htmlFor="rd-navbar-search-form-input"
                          >
                            Search...
                          </label>
                          <input
                            className="rd-navbar-search-form-input form-input"
                            id="rd-navbar-search-form-input"
                            type="text"
                            name="search"
                          />
                          <button
                            className="rd-search-form-submit fl-bigmug-line-search74"
                            type="submit"
                          ></button>
                        </div>
                      </form>
                    </div>
                    <ul className="rd-navbar-nav">
                      <li className="rd-nav-item active">
                        <Link className="rd-nav-link" to="/">
                          Home
                        </Link>
                      </li>
                      <li className="rd-nav-item">
                        <Link className="rd-nav-link" to=" ">
                          About
                        </Link>
                      </li>
                      <li className="rd-nav-item">
                        <Link className="rd-nav-link" to="/shop">
                          Shop
                        </Link>
                      </li>
                      <li className="rd-nav-item">
                        <Link className="rd-nav-link" to="">
                          Services
                        </Link>
                      </li>
                      <li className="rd-nav-item">
                        <Link className="rd-nav-link" to="">
                          Blogs
                        </Link>
                      </li>
                      <li className="rd-nav-item">
                        <Link className="rd-nav-link" to="">
                          Contact
                        </Link>
                      </li>
                      <li className="rd-nav-item">
                        <Link className="rd-nav-link" to="/admin/">
                          Login/SingUp
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
