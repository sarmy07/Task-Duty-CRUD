import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import LoginModal from "../components/loginModal";
import SignupModal from "../components/SignupModal";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const { token } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!token) {
      return setShowLoginModal(true);
    }
    const getData = async () => {
      try {
        const { data } = await axiosInstance.get(`task/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(data);
        setTitle(data.task.title);
        setDescription(data.task.description);
        setTags(data.task.tags);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setShowLoginModal(true);
    }

    const { data } = await axiosInstance.patch(
      `/task/${id}`,
      { title, description, tags },
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
        <p className="m-0">icon</p>
        <h2 className="m-0">Edit Task</h2>
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
            value={title}
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
            value={description}
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
            value={tags}
            onChange={(e) => {
              setTags(e.target.value);
            }}
            className="w-100 border rounded-2 p-3"
            type="text"
            id="tags"
            placeholder="urgent important"
          />
        </div>

        <button className="w-100 border-0 bg-danger py-3 rounded-3 text-white">
          Done
        </button>
        <a href="#" className="text-center text-decoration-none ">
          Back To Top
        </a>
      </form>
    </div>
  );
};

export default EditTask;
