import React from "react";
import { FaPlus } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

const Tasks = () => {
  return (
    <>
      <div>
        <div className="row">
          <h2>Task</h2>
          <Link to={"/newtask"}>
            <button className="addBtn">
              <FaPlus />
            </button>
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Tasks;
