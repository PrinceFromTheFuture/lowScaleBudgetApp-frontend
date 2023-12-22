import { useEffect, useState } from "react";
import Transaction from "./Transaction";

const TransactionsSection = () => {
  const [transactions, setTransactions] = useState([]);
  const baseURI = import.meta.env.VITE_BASE_URI;

  const fetchData = async () => {
    const data = await fetch(`${baseURI}/transactions`);
    const json = await data.json();
    setTransactions(json);
    console.log(json);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <table className="w-1/2 text-start overflow-hidden ">
      <tr className="font-bold">
        <td>index</td>
        <td>amount</td>
        <td>type</td>
        <td>date</td>
        <td>budget</td>
        <td>target</td>
      </tr>
      {transactions.map((transaction, index) => {
        if (index < 900) {
          return (
            <tr
              key={index}
              className={
                index % 2 == 1
                  ? "cursor-pointer hover:bg-slate-100 	"
                  : "bg-slate-100 cursor-pointer hover:bg-slate-200"
              }
            >
              <Transaction
                transaction={transaction}
                index={index}
              ></Transaction>
            </tr>
          );
        }
      })}
    </table>
  );
};

export default TransactionsSection;
