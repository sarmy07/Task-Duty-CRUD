import React, { useContext } from "react";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import TaskDuty from "../assets/icons/Task_duty_icon.png";
import AuthContext from "../context/AuthContext";

const Navbar1 = () => {
  const { token, logOut, user } = useContext(AuthContext);

  return (
    <Navbar expand="lg" className="border-bottom py-4">
      <Container>
        <Link
          to="/"
          className="text-black text-decoration-none fs-3 fw-bold d-flex align-items-center gap-3"
        >
          <img src={TaskDuty} alt="" className="m-0" />
          <p className="m-0">TaskDuty</p>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto me-lg-0 ms-lg-auto d-flex gap-3">
            <Link
              to="/new"
              className="text-decoration-none text-black fw-semibold"
            >
              New Task
            </Link>
            <Link
              to="/tasks"
              className="text-decoration-none text-black fw-semibold"
            >
              All Tasks
            </Link>
            {user ? <span className="user-text">{user.username}</span> : null}
            {token ? (
              <button
                className="border-0 bg-primary text-white rounded"
                onClick={() => {
                  logOut();
                }}
              >
                Logout
              </button>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbar1;
