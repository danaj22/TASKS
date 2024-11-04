import { useState } from "react";
import { Task } from "./Task";

interface TaskItemProps {
  task: Task;
  onDragStart: () => void;
  onDragEnter: () => void;
  onDragEnd: () => void;
  changeStatus: () => void;
  save: (taskId: string, value: string) => void;
  onRemove: () => void;
}

function TaskItem({ task, ...props }: TaskItemProps) {
  const [text, setText] = useState(task.name);
  const [isEdited, setIsEdited] = useState(false);

  const handleSave = () => {
    props.save(task.id, text);
    setText(task.name);
    setIsEdited(false);
  };

  const handleEdit = () => {
    setIsEdited(true);
  };

  return (
    <li
      draggable
      onDragStart={props.onDragStart}
      onDragEnter={props.onDragEnter}
      onDragEnd={props.onDragEnd}
      onDragOver={(event) => event.preventDefault()}
      className={`taskItem ${task.isDone ? "taskDone" : ""}`}
    >
      {isEdited ? (
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
          {task.name}
        </label>
      )}
      <span>
        {isEdited ? (
          <button onClick={handleSave}>💾</button>
        ) : (
          <button onClick={handleEdit}>✏️</button>
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
