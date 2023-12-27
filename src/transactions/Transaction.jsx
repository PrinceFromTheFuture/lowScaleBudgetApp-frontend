const Transaction = ({ transaction }) => {
  return (
    <>
      <td>{transaction.title}</td>
      <td>{transaction.amount.toFixed(2)}₪</td>
      <td
        className={
          transaction.type == "outcome"
            ? "bg-red-300 p-1"
            : "bg-green-300 p-1  "
        }
      >
        {transaction.type}
      </td>
      <td>{transaction.date}</td>
      <td>{transaction.budget ? transaction.budget : "-"}</td>
      <td>{transaction.target}</td>
    </>
  );
};

export default Transaction;
