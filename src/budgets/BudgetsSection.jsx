import { useEffect, useState } from "react";

import Budget from "./Budget";
import NewBudget from "./NewBudget";

const BalancesSection = () => {
  const [allBudgets, setAllBudgets] = useState([]);
  const [isNewBudget, setIsNewBudget] = useState(false);

  const fetchData = async () => {
    const baseURI = import.meta.env.VITE_BASE_URI;
    const response = await fetch(`${baseURI}/budgets`, { method: "GET" });
    const json = await response.json();

    setAllBudgets(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex gap-10 overflow-auto">
      <div
        className="p-2 bg-green-600 cursor-pointer rounded text-white m-1 flex justify-center items-center"
        onClick={() => setIsNewBudget(true)}
      >
        new
      </div>
      {allBudgets.map((budget, index) => {
        return <Budget key={index} budget={budget} />;
      })}

      {isNewBudget && <NewBudget setIsActive={setIsNewBudget} />}
    </div>
  );
};

export default BalancesSection;
