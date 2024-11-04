import { Task, TaskCollection } from "./Task";

interface TaskListNavigationProps {
  taskList: TaskCollection[];
  selectList: (tasks: Task[]) => void;
}

function TaskListNavigation(props: TaskListNavigationProps) {
  const handleClick = (tasks: TaskCollection) => {
    props.selectList(tasks.tasks);
  };

  return props.taskList.map((element) => (
    <button onClick={() => handleClick(element)}>{element.name}</button>
  ));
}

export default TaskListNavigation;
