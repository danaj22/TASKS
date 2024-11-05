import { useState } from "react";
import { TaskCollection } from "./Task";

interface TaskListNavigationProps {
  plans: TaskCollection[];
  selectPlan: (plan: TaskCollection) => void;
  addNewPlan: (planName: string) => void;
}

function TaskListNavigation({
  selectPlan,
  plans,
  addNewPlan,
}: TaskListNavigationProps) {
  const [editMode, setEditMode] = useState(false);
  const [planName, setPlanName] = useState("");

  const handleClick = (plan: TaskCollection) => {
    selectPlan(plan);
  };

  const createPlan = (name: string) => {
    console.log(name);
    addNewPlan(name);
    setPlanName("");
    setEditMode(false);
  };

  return (
    <>
      {editMode ? (
        <form onSubmit={() => createPlan(planName)}>
          <input
            type="text"
            value={planName}
            placeholder="My plan is.."
            onChange={(event) => setPlanName(event.currentTarget.value)}
          />
          <button type="submit">Create</button>
        </form>
      ) : (
        <button onClick={() => setEditMode(true)}>➕</button>
      )}
      {plans.map((plan) => (
        <button key={plan.id} onClick={() => handleClick(plan)}>
          {plan.name}
        </button>
      ))}
    </>
  );
}

export default TaskListNavigation;
