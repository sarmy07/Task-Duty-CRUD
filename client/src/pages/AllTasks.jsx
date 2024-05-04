import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import AuthContext from "../context/AuthContext";
import LoginModal from "../components/loginModal";
import SignupModal from "../components/SignupModal";

const AllTasks = () => {
  const { token } = useContext(AuthContext);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!token) {
      return setShowLoginModal(true);
    }
    const getData = async () => {
      try {
        const { data } = await axiosInstance.get("/task", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(data);
        setTasks(data.tasks);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [token, tasks]);

  const deleteTask = async (_id) => {
    try {
      const res = await axiosInstance.delete(`/task/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
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
      <div className="d-flex align-items-center justify-content-between py-3">
        <p className="fs-3 fw-semibold">My Tasks</p>
        <Link to="/new" className="text-decoration-none">
          + Add new Tasks
        </Link>
      </div>

      <div className="d-flex flex-column gap-3">
        {tasks.map((task) => {
          let textColor =
            task.tags === "Urgent" ? "text-danger" : "text-success";
          return (
            <div
              key={task._id}
              className="border d-flex flex-column text-start"
            >
              <div className="border-bottom d-flex align-items-center justify-content-between p-2 ">
                <p className={`fw-semibold fs-5 ${textColor}`}>{task.tags}</p>
                <div className="d-flex gap-2">
                  <Link
                    to={`/edit/${task._id}`}
                    className="text-decoration-none bg-primary text-white rounded-2 px-4 py-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="rounded-2 border-0 px-3 py-2"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className=" p-3">
                <p className="fw-semibold fs-4">{task.title}</p>
                <p>{task.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllTasks;
