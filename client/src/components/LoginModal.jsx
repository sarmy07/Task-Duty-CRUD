import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginModal = (props) => {
  const { signInUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signInUser({ username, password }, props.onHide());
    navigate("/");
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form
        onSubmit={handleSubmit}
        action=""
        className="text-start d-flex flex-column p-5 gap-4"
      >
        <h2 className="fw-bold">Login</h2>
        <div>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="w-100 border rounded-3 py-3 px-2"
            type="text"
            placeholder="Username"
          />
        </div>
        <div>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-100 border rounded-3 py-3 px-2"
            type="password"
            placeholder="Password"
          />
        </div>
        <button className="py-2 btn bg-primary border-0 text-white rounded-2">
          Login
        </button>
        <p>
          Dont have an account?
          <a
            className="text-decoration-none p-2"
            href="#"
            onClick={() => {
              props.onSwap();
              props.onHide();
            }}
          >
            Sign Up
          </a>
        </p>
      </form>
    </Modal>
  );
};

export default LoginModal;
