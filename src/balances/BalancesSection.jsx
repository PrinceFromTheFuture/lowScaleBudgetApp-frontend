import { useEffect, useState } from "react";

import Balance from "./Balance";
import NewBalance from "./NewBalance";

const BalancesSection = () => {
  const [allBalances, setAllBalances] = useState([]);
  const [isNewBalance, setIsNewBalance] = useState(false);

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
      <div
        className="p-2 bg-green-600 cursor-pointer rounded text-white m-1 flex justify-center items-center"
        onClick={() => setIsNewBalance(true)}
      >
        new
      </div>
      {allBalances.map((balance, index) => {
        return <Balance key={index} balance={balance} />;
      })}

      {isNewBalance && <NewBalance setIsActive={setIsNewBalance} />}
    </div>
  );
};

export default BalancesSection;
