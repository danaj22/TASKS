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
  return (
    <ul>
      {props.tasks.map((task) => (
        <li
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
