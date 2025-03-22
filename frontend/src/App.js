import React from "react";
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateUser from "./Components/CreateUser";
import UserList from "./Components/UserList";
import TransactionList from "./Components/TransactionList";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header sticky-nav">
          <NavBar />
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/create-user" element={<CreateUser />} />
                  <Route path="/user-list" element={<UserList />} />
                  <Route
                    path="/transaction-history"
                    element={<TransactionList />}
                  />
                </Routes>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;
