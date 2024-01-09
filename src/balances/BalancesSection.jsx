import { useEffect, useState } from "react";

import Balance from "./Balance";
import NewBalanceDialog from "@/balances/NewBalanceDialog";
const BalancesSection = () => {
  const [allBalances, setAllBalances] = useState([]);

  const fetchData = async () => {
    const baseURI = import.meta.env.VITE_BASE_URI;
    const response = await fetch(`${baseURI}/balances`, { method: "GET" });
    const json = await response.json();

    setAllBalances(json);
  };

  useEffect(() => {
    fetchData();
    console.log(allBalances);
  }, []);

  return (
    <div>
      <div className="mb-4">
        <NewBalanceDialog />
      </div>
      <div className="flex gap-10 overflow-auto">
        {allBalances.map((balance, index) => {
          return (
            <Balance
              key={index}
              balance={balance}
              allBalances={allBalances}
              setAllBalances={setAllBalances}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BalancesSection;
