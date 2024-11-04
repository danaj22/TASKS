import { useRef } from "react";
import "./TaskList.css";
import TaskItem from "./TaskItem";
import { Task } from "./Task";

interface TaskListProps {
  tasks: Task[];
  handleRemove: (id: string) => void;
  changeStatus: (id: string) => void;
  updateTasks: (tasks: Task[]) => void;
}

function TaskList(props: TaskListProps) {
  const dragTask = useRef<number>(0);
  const dragedOverTask = useRef<number>(0);

  const handleDragStart = (index: number) => {
    dragTask.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragedOverTask.current = index;
  };

  const handleSort = () => {
    const updatedTasks = [...props.tasks];
    const temp = updatedTasks[dragTask.current];
    updatedTasks[dragTask.current] = updatedTasks[dragedOverTask.current];
    updatedTasks[dragedOverTask.current] = temp;

    props.updateTasks(updatedTasks);
  };

  const handleSave = (taskId: string, value: string) => {
    const updatedTasks = props.tasks.map((el) =>
      el.id == taskId ? { ...el, name: value } : el
    );

    props.updateTasks(updatedTasks);
  };

  return (
    <ul>
      {props.tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          onDragStart={() => handleDragStart(index)}
          onDragEnter={() => handleDragEnter(index)}
          onDragEnd={handleSort}
          changeStatus={() => props.changeStatus(task.id)}
          save={handleSave}
          onRemove={() => props.handleRemove(task.id)}
        />
      ))}
    </ul>
  );
}

export default TaskList;
