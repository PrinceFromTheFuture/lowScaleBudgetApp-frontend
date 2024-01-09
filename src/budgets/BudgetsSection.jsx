import { useEffect, useState } from "react";

import Budget from "./Budget";
import NewBudgetDialog from "./NewBudgetDialog";

const BalancesSection = () => {
  const [allBudgets, setAllBudgets] = useState([]);

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
    <div>
      <div className="mb-4">
        <NewBudgetDialog />
      </div>

      <div className="flex gap-10 overflow-auto">
        {allBudgets.map((budget, index) => {
          return (
            <Budget
              key={index}
              budget={budget}
              setAllBudgets={setAllBudgets}
              allBudgets={allBudgets}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BalancesSection;
