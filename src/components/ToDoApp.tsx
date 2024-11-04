import { useState } from "react";
import CreateTask from "./CreateTask";
import TaskList, { Task } from "./TaskList";
import RemoveTasks from "./RemoveTasks";

function ToDoApp() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", name: "Task 1", isDone: false },
    { id: "2", name: "Task 2", isDone: true },
    { id: "3", name: "Task 3", isDone: false },
  ]);

  const handleCreate = (name: string) => {
    setTasks([
      ...tasks,
      { id: name, name: name, isDone: false, isEdited: false },
    ]);
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
      <h2>Make something TO-DO!</h2>
      <CreateTask createTask={handleCreate} />
      <RemoveTasks markAllAsDone={handleRemoveAll} />
      <TaskList
        tasks={tasks}
        handleRemove={handleRemove}
        changeStatus={handleChangeStatus}
        updateTasks={handleUpdateTasks}
      />
    </>
  );
}

export default ToDoApp;
