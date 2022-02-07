import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import './homeNavbar.css';

export default function HomeNavbar(props) {
  return (
    <div>
      <Navbar style={{backgroundColor: 'green'}} variant="light" expand="lg">
        <Container>
          <Navbar.Brand  style={{color: 'white', fontSize: '24px'}}  href="">Plantation Portal</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="indexNavLeft">
            <Nav className={"containerspace me-auto"}>
              <Link to="/home" style={{color: 'white', marginLeft: "7%"}} className={"nav-link" }>Home</Link>
              <Link to="/plants" style={{color: 'white', marginLeft: "7%"}}  className="nav-link">Plants</Link>
              <Link to="/fertilizers" style={{color: 'white', marginLeft: "7%"}}  className="nav-link">Fertilizers</Link>
              <Link to="/seeds" style={{color: 'white', marginLeft: "7%"}}  className="nav-link">Seeds</Link>
              <Link to="/tools" style={{color: 'white', marginLeft: "7%"}}  className="nav-link">Tools</Link>
              <Link to="/services" style={{color: 'white', marginLeft: "7%"}}  className="nav-link">Services</Link>
              <Link to="/blogs" style={{color: 'white', marginLeft: "7%"}}  className="nav-link">Blogs</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
