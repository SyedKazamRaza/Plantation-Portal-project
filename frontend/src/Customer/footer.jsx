import React from "react";
import { Link } from "react-router-dom";  //Link is used instead of <a> to prevent requesting server on every render

const Footer = ()=>{
    return(
        <div className="footer1">
            <footer className="section footer-variant-2 footer-modern context-dark section-top-image section-top-image-dark">
        <div className="footer-variant-2-content">
          <div className="container">
            <div className="row row-40 justify-content-between">
              <div className="col-sm-6 col-lg-4 col-xl-3">
                <div className="oh-desktop">
                  <div className="wow slideInRight" data-wow-delay="0s">
                    <div className="footer-brand">
                        <Link to=""><img src={"./images/logooB-removebg-preview.png"} alt="" width="196" height="42"/></Link>
                    </div>
                    <p>Fine Living is an organic farm located in Lahore. We offer a wide range of plants, services, equipment, and guidelines to our clients.</p>
                    <ul className="footer-contacts d-inline-block d-md-block">
                      <li>
                        <div className="unit unit-spacing-xs">
                          <div className="unit-left"><span className="icon fa fa-phone"></span></div>
                          <div className="unit-body"><Link className="link-phone" to="tel:#">0303-8920413</Link></div>
                        </div>
                      </li>
                      <li>
                        <div className="unit unit-spacing-xs">
                          <div className="unit-left"><span className="icon fa fa-clock-o"></span></div>
                          <div className="unit-body">
                            <p>Mon-Sat: 07:00AM - 05:00PM</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="unit unit-spacing-xs">
                          <div className="unit-left"><span className="icon fa fa-location-arrow"></span></div>
                          <div className="unit-body"><Link className="link-location" to="">Plot 8, Block E, Model Town, Lahore</Link></div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-4 col-xl-4">
                <div className="oh-desktop">
                  <div className="inset-top-18 wow slideInDown" data-wow-delay="0s">
                    <h5>Newsletter</h5>
                    <p>Join our email newsletter for news and tips.</p>
                    <form className="rd-form rd-mailform" data-form-output="form-output-global" data-form-type="subscribe" method="post" action="bat/rd-mailform.php">
                      <div className="form-wrap">
                        <input className="form-input" id="subscribe-form-5-email" type="email" name="email" data-constraints="@Email @Required" />
                        <label className="form-label" htmlFor="subscribe-form-5-email">Enter Your E-mail</label>
                      </div>
                      <button className="button button-block button-white" type="submit">Subscribe</button>
                    </form>
                    <div className="group-lg group-middle">
                      <p className="text-white">Follow Us</p>
                      <div>
                        <ul className="list-inline list-inline-sm footer-social-list-2">
                          <li><Link className="icon fa fa-facebook" to=""></Link></li>
                          <li><Link className="icon fa fa-twitter" to=""></Link></li>
                          <li><Link className="icon fa fa-google-plus" to=""></Link></li>
                          <li><Link className="icon fa fa-instagram" to=""></Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-xl-3">
                <div className="oh-desktop">
                  <div className="inset-top-18 wow slideInLeft" data-wow-delay="0s">
                    <h5>Quick Links</h5>
                    <div className="row row-10 gutters-10" data-lightgallery="group">
                      <div className="col-sm-6">
                        <ul className="list">
                          <li><Link to="">Privacy Policy</Link></li>
                          <li><Link to="">Terms and Conditions</Link></li>
                          <li><Link to="">Return and Refund Policy</Link></li>
                          <li><Link to="">FAQs</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-variant-2-bottom-panel">
          <div className="container">
            <div className="group-sm group-sm-justify">
              <p className="rights"><span>&copy;&nbsp;</span><span className="copyright-year"></span> <span>Fine Living</span>. All rights reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
        </div>
    )

}

export default Footer;