import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import AuthContext from "../context/AuthContext";

const SignupModal = (props) => {
  const { signUpUser } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    signUpUser({ username, email, password }, props.onHide());
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
        <h2 className="fw-bold">Sign Up</h2>
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
              setEmail(e.target.value);
            }}
            className="w-100 border rounded-3 py-3 px-2"
            type="text"
            placeholder="Email"
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
          Sign up
        </button>
        <p>
          Already have an account?
          <a
            className="text-decoration-none p-2"
            href="#"
            onClick={() => {
              props.onSwap();
              props.onHide();
            }}
          >
            Login
          </a>
        </p>
      </form>
    </Modal>
  );
};

export default SignupModal;
