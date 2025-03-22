import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import SparkLogo from "../items/sparks.png";

const NavBar = () => {
  return (
    <Navbar bg="light" variant="light" expand="lg" className="fixed-top shadow-sm">
      <Container fluid>
        <Navbar.Brand href="/" className="d-flex align-items-center ms-3">
          <img
            src={SparkLogo}
            className="nav-logo me-2"
            alt="Sparks Logo"
            style={{ width: "50px", height: "50px" }}
          />
          <span className="fw-bold fs-5">The People's Bank</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end me-3">
          <Nav className="fw-bold">
            <Nav.Link href="/" className="me-3">
              Home
            </Nav.Link>
            <Nav.Link href="/create-user" className="me-3">
              Create User
            </Nav.Link>
            <Nav.Link href="/user-list" className="me-3">
              User List
            </Nav.Link>
            <Nav.Link href="/transaction-history" className="me-3">
              Transaction History
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
