import { useEffect, useState } from "react";

import Balance from "./Balance";
import NewBalanceDialog from "@/balances/newBalanceDialog";
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
  }, []);

  return (
    <div className="flex gap-10 overflow-auto">
      <NewBalanceDialog></NewBalanceDialog>

      {allBalances.map((balance, index) => {
        return <Balance key={index} balance={balance} />;
      })}
    </div>
  );
};

export default BalancesSection;
