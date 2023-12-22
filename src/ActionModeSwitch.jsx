import { useContext } from "react";
import actionModeContext from "./contexts/actionModeContext";

const ActionModeSwtich = ({ switchMode }) => {
  const currentMode = useContext(actionModeContext);
  return (
    <button
      className={
        currentMode
          ? '" absolute p-3 bg-slate-600 top-12 right-12 rounded "'
          : '" absolute p-3 bg-red-900 top-12 right-12 rounded "'
      }
      onClick={switchMode}
    >
      <div className="text-white">{currentMode ? "active" : "activate"}</div>
    </button>
  );
};

export default ActionModeSwtich;
