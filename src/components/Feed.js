import React from "react";
import { FaCheck } from "react-icons/fa";
import { profile } from "../assets/index";
import { Link } from "react-router-dom";

const Feed = ({ tasks, handleCheck }) => {
  return (
    <>
      {tasks.map((e, i) => (
        <div className="taskList" key={i}>
          <Link to={`${e.id}`} key={i} className="data" data-set={e.id}>
            <div className="img">
              <img src={profile} alt="..." />
            </div>
            <div className="taskBody">
              <div className={!e.done ? "taskTitle" : "taskTitle check"}>
                {e.task}
              </div>
              <div className="taskTime">
                {e.date} at {e.time}
              </div>
            </div>
          </Link>
          <button
            className={!e.done ? "tick" : "tick check"}
            onClick={() => handleCheck(e.id)}
          >
            <FaCheck className="fontAwesome" />
          </button>
        </div>
      ))}
    </>
  );
};

export default Feed;
