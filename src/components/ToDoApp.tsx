import { useState } from "react";
import CreateTask from "./CreateTask/CreateTask";
import TaskList from "./TaskList";
import RemoveTasks from "./RemoveTasks";
import TaskListNavigation from "./TaskListNavigation";
import { Task, TaskCollection } from "./Task";

function ToDoApp() {
  const [selectedList] = useState<TaskCollection[]>([
    {
      id: 1,
      name: "Plan for today",
      tasks: [
        { id: "1", name: "Task 1", isDone: false },
        { id: "2", name: "Task 2", isDone: true },
        { id: "3", name: "Task 3", isDone: false },
      ],
    },
    {
      id: 2,
      name: "Plan for tomorrow",
      tasks: [
        { id: "4", name: "Task 4", isDone: false },
        { id: "5", name: "Task 5", isDone: false },
        { id: "6", name: "Task 6", isDone: false },
      ],
    },
  ]);
  const [tasks, setTasks] = useState<Task[]>(selectedList[0].tasks);

  const handleCreate = (name: string) => {
    setTasks([...tasks, { id: name, name: name, isDone: false }]);
  };

  const handleRemove = (id: string) => {
    const updatedTasks = tasks.filter((x) => x.id !== id);
    setTasks(updatedTasks);
  };

  const handleChangeStatus = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id != id ? task : { ...task, isDone: !task.isDone }
    );
    setTasks(updatedTasks);
  };

  const handleUpdateTasks = (tasks: Task[]) => {
    setTasks(tasks);
  };

  const setAllAsDone = tasks.map((task) => ({
    ...task,
    isDone: true,
  }));

  const setAllAsNotDone = tasks.map((task) => ({
    ...task,
    isDone: false,
  }));

  const handleRemoveAll = () => {
    const updatedTasks = tasks.every((task) => task.isDone)
      ? setAllAsNotDone
      : setAllAsDone;

    setTasks(updatedTasks);
  };

  return (
    <>
      <TaskListNavigation taskList={selectedList} selectList={setTasks} />
      <div>
        <h2>Make something TO-DO!</h2>
        <CreateTask createTask={handleCreate} />
        <RemoveTasks markAllAsDone={handleRemoveAll} />
        <TaskList
          tasks={tasks}
          handleRemove={handleRemove}
          changeStatus={handleChangeStatus}
          updateTasks={handleUpdateTasks}
        />
        <button onClick={() => alert("HI")}>Save</button>
      </div>
    </>
  );
}

export default ToDoApp;
