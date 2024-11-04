import { FormEvent, useState } from "react";
import "./CreateTask.css";

interface CreateTaskProps {
  createTask: (name: string) => void;
}

function CreateTask(props: CreateTaskProps) {
  const [taskName, setTaskName] = useState("");

  function addTask(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    props.createTask(taskName);
    setTaskName("");
  }

  return (
    <>
      <form onSubmit={addTask}>
        <input
          className="taskCreated"
          placeholder="Add task..."
          value={taskName}
          onChange={(e) => setTaskName(e.currentTarget.value)}
          required
        ></input>
        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default CreateTask;
