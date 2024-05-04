import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import arrowLeft from "../assets/icons/Arrow_left.png";
import LoginModal from "../components/loginModal";
import axiosInstance from "../utils/axiosInstance";
import SignupModal from "../components/SignupModal";
import { useNavigate } from "react-router-dom";

const NewTask = () => {
  const { token } = useContext(AuthContext);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      return setShowLoginModal(true);
    }

    const { data } = await axiosInstance.post(
      "/task",
      {
        title,
        description,
        tags,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    navigate("/tasks");
  };

  return (
    <div className="container text-start">
      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        onSwap={() => {
          setShowSignUpModal(true);
        }}
      />
      <SignupModal
        show={showSignUpModal}
        onHide={() => setShowSignUpModal(false)}
        onSwap={() => {
          setShowLoginModal(true);
        }}
      />
      <div className="d-flex align-items-center gap-2 py-4">
        <img className="m-0" src={arrowLeft} alt="" />
        <h2 className="m-0">New Task</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        action=""
        className="d-flex flex-column gap-5 py-3"
      >
        <div className="position-relative">
          <label
            htmlFor="title"
            className="position-absolute bg-white p-1 fw-semibold text-secondary"
          >
            Title
          </label>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="w-100 border p-3 rounded-2"
            type="text"
            id="title"
            placeholder="Eg project Defense Assignment"
          />
        </div>

        <div className="position-relative">
          <label
            htmlFor="description"
            className="position-absolute p-1 bg-white fw-semibold text-secondary"
          >
            Description
          </label>
          <textarea
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="w-100 border rounded-2 p-3"
            name=""
            id="description"
            cols="30"
            rows="10"
            placeholder="Briefly describe your task..."
          ></textarea>
        </div>

        <div className="position-relative">
          <label
            htmlFor="tags"
            className="position-absolute p-1 bg-white fw-semibold text-secondary"
          >
            Tags
          </label>
          <input
            onChange={(e) => {
              setTags(e.target.value);
            }}
            className="w-100 border rounded-2 p-3"
            type="text"
            id="tags"
            placeholder="Urgent Important"
          />
        </div>

        <button className="w-100 border-0 bg-primary py-3 rounded-3 text-white">
          Done
        </button>
        <a href="#" className="text-center text-decoration-none ">
          Back To Top
        </a>
      </form>
    </div>
  );
};

export default NewTask;
