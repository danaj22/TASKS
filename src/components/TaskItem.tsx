import { useState } from "react";
import { Task } from "./TaskList";

interface TaskItemProps {
  task: Task;
  onDragStart: () => void;
  onDragEnter: () => void;
  onDragEnd: () => void;
  changeStatus: () => void;
  save: () => void;
  onEdit: () => void;
  onRemove: () => void;
}

function TaskItem({ task, ...props }: TaskItemProps) {
  const [text, setText] = useState(task.name);

  return (
    <li
      draggable
      onDragStart={props.onDragStart}
      onDragEnter={props.onDragEnter}
      onDragEnd={props.onDragEnd}
      onDragOver={(event) => event.preventDefault()}
      className={`taskItem ${task.isDone ? "taskDone" : ""}`}
    >
      {task.isEdited ? (
        <input
          value={text}
          autoFocus
          onChange={(event) => {
            setText(event.target.value);
          }}
        ></input>
      ) : (
        <label>
          <input
            className={`taskLabel ${task.isDone ? "visible" : ""}`}
            type="checkbox"
            checked={task.isDone}
            onChange={props.changeStatus}
          />
          {text}
        </label>
      )}
      <span>
        {task.isEdited ? (
          <button onClick={props.save}>💾</button>
        ) : (
          <button onClick={props.onEdit}>✏️</button>
        )}
        <button onClick={props.changeStatus}>
          {task.isDone ? "❌" : "✅"}
        </button>
        <button onClick={props.onRemove}>🗑️</button>
      </span>
    </li>
  );
}

export default TaskItem;
