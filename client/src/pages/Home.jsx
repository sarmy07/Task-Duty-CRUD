import React from "react";
import menuIcon from "../assets/images/Menu_icon.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container py-5 d-flex gap-3 align-items-center layer">
      <div className="text-start w-100 layer-1">
        <h2 className="fw-semibold fs-1 py-3">
          Manage your Tasks on <span className="text-primary">TaskDuty</span>
        </h2>
        <p className="py-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus
          natus eum porro ipsam dignissimos esse tempore, assumenda doloremque
          inventore accusantium at et atque temporibus quo quibusdam deserunt
          quisquam, cumque sapiente? Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Deserunt eaque, molestias dolorem delectus officiis
          reiciendis quia blanditiis at veritatis autem. Voluptatibus eos
          corporis inventore. Aliquid neque aut magnam a culpa.
        </p>
        <Link
          to="/tasks"
          className="border text-decoration-none py-2 rounded-2 px-4 text-white bg-primary"
        >
          Go to my Tasks
        </Link>
      </div>

      <div className="w-100">
        <img src={menuIcon} alt="" />
      </div>
    </div>
  );
};

export default Home;
