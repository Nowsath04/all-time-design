import React from "react";
import Feed from "./Feed";
const TaskList = ({ tasks, handleCheck, check }) => {
  return (
    <>
      <Feed tasks={tasks} handleCheck={handleCheck} />
    </>
  );
};

export default TaskList;
