import { useContext, useEffect, useState } from "react";
import useDelete from "../hooks/useDelete";
import useUpdate from "../hooks/useUpdate";
import actionModeContext from "../contexts/actionModeContext";

const Balance = ({ balance }) => {
  const [updatedBalance, setUpdatedBalance] = useState(balance);

  const { deleteData } = useDelete("balances", updatedBalance._id);
  const { updateData } = useUpdate("balances", updatedBalance);

  const allowActions = useContext(actionModeContext);
  const [editMode, setEditMode] = useState(false);

  //editMode
  const handleChange = (event) => {
    const { value, id } = event.target;
    setUpdatedBalance({ ...updatedBalance, [id]: value });
  };
  const handleUpdate = () => {
    updateData();
    setEditMode(false);
  };

  return (
    <div className=" bg-slate-200  rounded-md " style={{ minWidth: "17em" }}>
      <div className="bg-slate-500 p-3  flex justify-center items-center rounded-md text-white">
        {updatedBalance.type}
      </div>
      <div className=" flex justify-between items-center p-4">
        <div className="">
          <div>{updatedBalance.title}</div>
          <div className="font-bold text-xl p-1">{updatedBalance.balance}₪</div>
        </div>
        {allowActions == true ? (
          <div className="flex">
            <div
              className="p-2 bg-red-600 cursor-pointer rounded text-white m-1"
              onClick={deleteData}
            >
              delete
            </div>
            <div
              onClick={() => setEditMode(true)}
              className="p-2 bg-cyan-700 cursor-pointer rounded text-white m-1"
            >
              edit
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {editMode ? (
        <div className=" absolute bg-slate-50/95 right-0 top-0 bottom-0 left-0 flex justify-center items-center flex-col">
          <div
            onClick={() => setEditMode(false)}
            className=" bg-gray-800  w-fit p-3 text-white m-4 rounded text-2xl  cursor-pointer absolute left-0 top-0"
          >
            X
          </div>
          <form action="" className=" flex flex-col">
            <label htmlFor="">Title</label>
            <input
              type="text"
              id="title"
              value={updatedBalance.title}
              className="  border-slate-800 border-2"
              onChange={handleChange}
              required
              autoFocus
            />
            <label htmlFor="">Balance</label>
            <input
              type="number"
              id="balance"
              value={updatedBalance.balance}
              className="  border-slate-800 border-2"
              onChange={handleChange}
              required
            />
            <label htmlFor="">Type</label>
            <input
              type="text"
              id="type"
              value={updatedBalance.type}
              className="  border-slate-800 border-2"
              onChange={handleChange}
              required
            />
            <label htmlFor="">NET</label>
            <input
              id="net"
              type="checkbox"
              checked={updatedBalance.net}
              className="  border-slate-800 border-2"
              onChange={handleChange}
              required
            />
          </form>
          <div
            className=" bg-slate-900 text-white  w-52 rounded p-2 flex justify-center items-center cursor-pointer m-4"
            onClick={handleUpdate}
          >
            update
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Balance;
