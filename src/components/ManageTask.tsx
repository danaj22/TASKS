import { Task } from "./Task";

interface ManageTaskProps {
  task: Task;
  editName: (taskId: string) => void;
  handleRemove: (id: string) => void;
  changeStatus: (id: string) => void;
}

function ManageTask(props: ManageTaskProps) {
  return (
    <span>
      <button onClick={() => props.editName(props.task.id)}>Edit</button>
      <button onClick={() => props.changeStatus(props.task.id)}>
        {props.task.isDone ? "❌" : "✅"}
      </button>
      <button onClick={() => props.handleRemove(props.task.id)}>🗑️</button>
    </span>
  );
}

export default ManageTask;
