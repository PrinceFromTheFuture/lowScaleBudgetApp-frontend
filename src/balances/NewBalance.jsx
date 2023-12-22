import { useState } from "react";
import usePost from "../hooks/usePost";

const NewBalance = ({ setIsActive }) => {
  const [newBalance, setNewBalance] = useState({
    title: "",
    balance: "",
    type: "",
    net: false,
  });

  const { submitData } = usePost("balances", newBalance);

  const handleChange = (event) => {
    const { value, id } = event.target;
    setNewBalance({ ...newBalance, [id]: value });
  };
  const handleSubmit = () => {
    setIsActive(false);
    submitData();
  };

  return (
    <div className=" absolute bg-slate-50/95 right-0 top-0 bottom-0 left-0 flex justify-center items-center flex-col">
      <div
        onClick={() => setIsActive(false)}
        className=" bg-gray-800  w-fit p-3 text-white m-4 rounded text-2xl  cursor-pointer absolute left-0 top-0"
      >
        X
      </div>
      <form action="" className=" flex flex-col">
        <label htmlFor="">Title</label>
        <input
          type="text"
          id="title"
          value={newBalance.title}
          className="  border-slate-800 border-2"
          onChange={handleChange}
          required
          autoFocus
        />
        <label htmlFor="">Balance</label>
        <input
          type="number"
          id="balance"
          value={newBalance.balance}
          className="  border-slate-800 border-2"
          onChange={handleChange}
          required
        />
        <label htmlFor="">Type</label>
        <input
          type="text"
          id="type"
          value={newBalance.type}
          className="  border-slate-800 border-2"
          onChange={handleChange}
          required
        />
        <label htmlFor="">NET</label>
        <input
          id="net"
          type="checkbox"
          checked={newBalance.net}
          className="  border-slate-800 border-2"
          onChange={handleChange}
          required
        />
      </form>
      <div
        className=" bg-slate-900 text-white  w-52 rounded p-2 flex justify-center items-center cursor-pointer m-4"
        onClick={handleSubmit}
      >
        update
      </div>
    </div>
  );
};

export default NewBalance;
