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
        <li key={task.id} className={task.isDone ? "taskDone" : ""}>
          {task.name}
          <button onClick={() => props.changeStatus(task.id)}>
            {task.isDone ? "❌" : "✅"}
          </button>
          <button onClick={() => props.handleRemove(task.id)}>🗑️</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
