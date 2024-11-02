import { useState } from "react";
import CreateTask from "./CreateTask";
import TaskList, { Task } from "./TaskList";
import RemoveTasks from "./RemoveTasks";

function ToDoApp() {
  const [toDos, setToDos] = useState<Task[]>([
    { id: "1", name: "Task 1" },
    { id: "2", name: "Task 2", isDone: true },
    { id: "3", name: "Task 3" },
  ]);

  const handleCreateTask = (name: string) => {
    setToDos([...toDos, { id: name, name: name }]);
  };

  const handleRemoveTask = (id: string) => {
    const updatedTasks = toDos.filter((x) => x.id !== id);
    setToDos(updatedTasks);
  };

  const changeStatus = (id: string) => {
    const updatedTasks = toDos.map((task) =>
      task.id != id ? task : { ...task, isDone: !task.isDone }
    );
    setToDos(updatedTasks);
  };

  const setAllAsDone = toDos.map((task) => ({
    ...task,
    isDone: true,
  }));

  const setAllAsNotDone = toDos.map((task) => ({
    ...task,
    isDone: false,
  }));

  const handleRemoveTasks = () => {
    const updatedTasks = toDos.every((task) => task.isDone)
      ? setAllAsNotDone
      : setAllAsDone;

    setToDos(updatedTasks);
  };

  return (
    <>
      <h2>Make something TO-DO!</h2>
      <CreateTask createTask={handleCreateTask} />
      <RemoveTasks markAllAsDone={handleRemoveTasks} />
      <TaskList
        tasks={toDos}
        handleRemove={handleRemoveTask}
        changeStatus={changeStatus}
      />
    </>
  );
}

export default ToDoApp;
