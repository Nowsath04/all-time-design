import { useEffect, useState } from "react";
import "./App.css";
import NewTask from "./components/NewTask";
import Tasks from "./components/Tasks";
import { Route, Routes, useNavigate } from "react-router-dom";
import TaskList from "./components/TaskList";
import EditTask from "./components/EditTask";

function App() {
  let [tasks, setTasks] = useState([]);
  useEffect(() => {
    let localStorageData = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(localStorageData);
  }, []);
  let [newTask, setNewTask] = useState("");
  let [newDate, setNewDate] = useState("");
  let [newTime, setNewTime] = useState("");
  let [assignUser, setAssignUser] = useState("");
  let [editTask, setEditTask] = useState("");
  let [editDate, setEditDate] = useState("");
  let [editTime, setEditTime] = useState("");
  let [editUser, setEditUser] = useState("");
  let navigator = useNavigate();
  let handleCancel = () => {
    setNewDate("");
    setNewTask("");
    setNewTime("");
    setAssignUser("");
    navigator("/");
  };
  let handleSubmit = () => {
    let id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    if (newTask === "" || newDate === "" || newTime === "Time") {
      alert("Kindly fill all inputs");
    } else {
      let task = {
        task: newTask,
        date: newDate,
        time: newTime,
        user: assignUser,
        id: id,
        done: false,
      };
      let allTasks = [...tasks, task];
      localStorage.setItem("tasks", JSON.stringify(allTasks));
      setTasks(allTasks);
      setNewTask("");
      setNewDate("");
      setNewTime("");
      setAssignUser("");
      navigator("/");
    }
  };
  let handleUpdate = (id) => {
    if (editTask === "" || editDate === "" || editTime === "Time") {
      alert("Kindly fill all inputs");
    } else {
      let task = tasks.find((e) => e.id === id);
      let done = task.done;
      let updatedTask = {
        task: editTask,
        date: editDate,
        time: editTime,
        user: editUser,
        id: id,
        done: done,
      };
      let newTask = tasks.map((task) =>
        task.id === id ? { ...updatedTask } : task
      );
      setTasks(newTask);
      localStorage.setItem("tasks", JSON.stringify(newTask));
      setEditTask("");
      setEditDate("");
      setEditTime("");
      setEditUser("");
      navigator("/");
    }
  };
  let handleDelete = (id) => {
    let newTask = tasks.filter((task) => task.id !== id);
    setTasks(newTask);
    localStorage.setItem("tasks", JSON.stringify(newTask));
    setEditTask("");
    setEditDate("");
    setEditTime("");
    setEditUser("");
    navigator("/");
  };
  let handleCheck = (id) => {
    let task = tasks.find((e) => e.id === id);
    task.done = !task.done;
    let updatedTask = tasks.map((e) => (e.id === id ? { ...task } : e));
    setTasks(updatedTask);
    localStorage.setItem("tasks", JSON.stringify(updatedTask));
  };
  return (
    <div className="conatainer">
      <Routes>
        <Route path="/" element={<Tasks />}>
          <Route
            path="/newtask"
            element={
              <NewTask
                newTask={newTask}
                setNewTask={setNewTask}
                newDate={newDate}
                setNewDate={setNewDate}
                newTime={newTime}
                setNewTime={setNewTime}
                assignUser={assignUser}
                setAssignUser={setAssignUser}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
              />
            }
          />
          <Route
            path=":id"
            element={
              <EditTask
                tasks={tasks}
                editTask={editTask}
                setEditTask={setEditTask}
                editDate={editDate}
                setEditDate={setEditDate}
                editTime={editTime}
                setEditTime={setEditTime}
                editUser={editUser}
                setEditUser={setEditUser}
                handleUpdate={handleUpdate}
                handleCancel={handleCancel}
                handleDelete={handleDelete}
              />
            }
          />
        </Route>
      </Routes>
      <TaskList tasks={tasks} handleCheck={handleCheck} />
    </div>
  );
}

export default App;
