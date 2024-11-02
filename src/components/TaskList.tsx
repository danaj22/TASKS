import { useRef, useState } from "react";
import "./TaskList.css";

export interface Task {
  id: string;
  name: string;
  isDone?: boolean;
}

interface TaskListProps {
  tasks: Task[];
  handleRemove: (id: string) => void;
  changeStatus: (id: string) => void;
}

function TaskList(props: TaskListProps) {
  const [tasks, setTasks] = useState(props.tasks);
  const dragTask = useRef<number>(0);
  const dragedOverTask = useRef<number>(0);

  const handleSort = () => {
    const updatedTasks = [...tasks];
    const temp = updatedTasks[dragTask.current];
    updatedTasks[dragTask.current] = updatedTasks[dragedOverTask.current];
    updatedTasks[dragedOverTask.current] = temp;

    setTasks(updatedTasks);
  };

  return (
    <ul>
      {tasks.map((task, index) => (
        <li
          draggable
          onDragStart={() => (dragTask.current = index)}
          onDragEnter={() => (dragedOverTask.current = index)}
          onDragEnd={handleSort}
          onDragOver={(event) => event.preventDefault()}
          key={task.id}
          className={`taskItem ${task.isDone ? "taskDone" : ""}`}
        >
          <label>
            <input
              className={`taskLabel ${task.isDone ? "visible" : ""}`}
              type="checkbox"
              checked={task.isDone}
              onChange={() => props.changeStatus(task.id)}
            />
            {task.name}
          </label>
          <span>
            <button onClick={() => props.changeStatus(task.id)}>
              {task.isDone ? "❌" : "✅"}
            </button>
            <button onClick={() => props.handleRemove(task.id)}>🗑️</button>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
