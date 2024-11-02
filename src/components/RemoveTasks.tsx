interface RemoveTasksProps {
  markAllAsDone: () => void;
}

function RemoveTasks(props: RemoveTasksProps) {
  const handleClick = () => {
    props.markAllAsDone();
  };

  return <button onClick={handleClick}>Check ALL tasks as done! ⭐</button>;
}

export default RemoveTasks;
