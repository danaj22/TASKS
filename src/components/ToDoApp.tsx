import { useState } from "react";
import CreateTask from "./CreateTask/CreateTask";
import TaskList from "./TaskList";
import RemoveTasks from "./RemoveTasks";
import TaskListNavigation from "./TaskListNavigation";
import { Task, TaskCollection } from "./Task";

const sampleData = [
  {
    id: 1,
    name: "Plan for today",
    tasks: [
      { id: "1", name: "Eat", isDone: false },
      { id: "2", name: "Work", isDone: true },
      { id: "3", name: "Sleep", isDone: false },
    ],
  },
  {
    id: 2,
    name: "Plan for tomorrow",
    tasks: [
      { id: "4", name: "Task 4", isDone: false },
      { id: "5", name: "Task 5", isDone: false },
      { id: "6", name: "Task 6", isDone: false },
    ],
  },
];

function ToDoApp() {
  const [plans, setPlans] = useState<TaskCollection[]>(() => {
    const savedPlansFromLocalStorage = localStorage.getItem("plans");
    const savedPlans = JSON.parse(savedPlansFromLocalStorage!);
    return savedPlans || sampleData;
  });
  const [selectedPlan, setSelectedPlan] = useState<TaskCollection>(plans[0]);

  const handleCreate = (name: string) => {
    const updatedTasks = [
      ...selectedPlan.tasks,
      { id: name, name: name, isDone: false },
    ];
    setSelectedPlan({ ...selectedPlan, tasks: updatedTasks });
  };

  const handleRemove = (id: string) => {
    const updatedTasks = selectedPlan.tasks.filter((x) => x.id !== id);
    setSelectedPlan({ ...selectedPlan, tasks: updatedTasks });
  };

  const handleChangeStatus = (id: string) => {
    const updatedTasks = selectedPlan.tasks.map((task) =>
      task.id != id ? task : { ...task, isDone: !task.isDone }
    );
    setSelectedPlan({ ...selectedPlan, tasks: updatedTasks });
  };

  const handleUpdateTasks = (tasks: Task[]) => {
    setSelectedPlan({ ...selectedPlan, tasks: tasks });
  };

  const setAllAsDone = selectedPlan.tasks.map((task) => ({
    ...task,
    isDone: true,
  }));

  const setAllAsNotDone = selectedPlan.tasks.map((task) => ({
    ...task,
    isDone: false,
  }));

  const handleRemoveAll = () => {
    const updatedTasks = selectedPlan.tasks.every((task) => task.isDone)
      ? setAllAsNotDone
      : setAllAsDone;

    setSelectedPlan({ ...selectedPlan, tasks: updatedTasks });
  };

  const handleSavePlan = () => {
    const updatedPlans = plans.map((plan) =>
      plan.id == selectedPlan.id ? { ...plan, tasks: selectedPlan.tasks } : plan
    );
    setPlans(updatedPlans);
    localStorage.setItem("plans", JSON.stringify(updatedPlans));
  };

  const handleAddPlan = (planName: string) => {
    const planToAdd = { id: plans.length + 1, name: planName, tasks: [] };
    plans.unshift(...[planToAdd]);
    setPlans(plans);
    setSelectedPlan(planToAdd);
  };

  return (
    <>
      <TaskListNavigation
        plans={plans}
        selectPlan={setSelectedPlan}
        addNewPlan={handleAddPlan}
      />

      <div>
        <h2>Make something TO-DO!</h2>
        <CreateTask createTask={handleCreate} />
        <RemoveTasks markAllAsDone={handleRemoveAll} />
        <TaskList
          tasks={selectedPlan.tasks}
          handleRemove={handleRemove}
          changeStatus={handleChangeStatus}
          updateTasks={handleUpdateTasks}
        />
        <button onClick={handleSavePlan}>Save</button>
      </div>
    </>
  );
}

export default ToDoApp;
