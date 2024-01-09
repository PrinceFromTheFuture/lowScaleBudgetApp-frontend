import "./App.css";
import { useEffect, useState } from "react";
import Transaction from "./transactions/Transaction";
import TransactionsSection from "./transactions/TransactionsSection";
import NewAction from "./NewAction";
import BalancesSection from "./balances/BalancesSection";

import BudgetsSection from "./budgets/BudgetsSection";
import actionModeContext from "./contexts/actionModeContext";
import ActionModeSwtich from "./ActionModeSwitch";
import TestComp from "./TestComp";

function Home() {
  const [openNewAction, setOpenNewAction] = useState(false);
  const [actionMode, setActionMode] = useState(true);

  function switchMode() {
    setActionMode(!actionMode);
  }

  useEffect(() => {
    if (window.innerWidth < 800) {
      setOpenNewAction(true);
    }
  }, []);
  return (
    <div className=" ">
      <actionModeContext.Provider value={actionMode}>
        <ActionModeSwtich switchMode={switchMode} />

        <div className="m-12">
          <h1 className="text-4xl font-bold m-4">Balances</h1>
          <BalancesSection></BalancesSection>
        </div>
        <div className="m-12">
          <h1 className="text-4xl font-bold m-4">Budgets</h1>
          <BudgetsSection />
        </div>
        {window.innerWidth > 800 && (
          <div className="m-12">
            <h1 className="text-4xl font-bold m-4">Transactions</h1>
            <button
              onClick={() => setOpenNewAction(true)}
              className="p-2 bg-green-600 cursor-pointer rounded text-white m-3"
            >
              new Action
            </button>
            <TransactionsSection />
          </div>
        )}
        {openNewAction && (
          <NewAction closeNewAction={() => setOpenNewAction(false)} />
        )}
      </actionModeContext.Provider>

      <TestComp />
    </div>
  );
}
export default Home;
