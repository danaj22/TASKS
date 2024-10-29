import { FormEvent, useState } from "react";

interface CreateTaskProps {
  createTask: (name: string) => void;
}

function CreateTask(props: CreateTaskProps) {
  const [taskName, setTaskName] = useState("");

  function handleOnSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log(event);
    console.log(taskName);
    props.createTask(taskName);
    setTaskName("");
  }

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <input
          placeholder="Write a task..."
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
