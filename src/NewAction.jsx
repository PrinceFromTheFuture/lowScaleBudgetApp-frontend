import { useEffect, useState } from "react";
import usePost from "./hooks/usePost";

const NewAction = ({ closeNewAction }) => {
  //format date
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset();
  now.setMinutes(now.getMinutes() - timezoneOffset);
  const formattedDate = now.toISOString().slice(0, 16);

  const [budgets, setBudgets] = useState([]);
  const [balances, setBalances] = useState([]);

  const fetchData = async () => {
    const budgetsData = await fetch(`${import.meta.env.VITE_BASE_URI}/budgets`);
    const budgetsJson = await budgetsData.json();
    setBudgets(budgetsJson);

    const balancesData = await fetch(
      `${import.meta.env.VITE_BASE_URI}/balances`
    );
    const balancesJson = await balancesData.json();
    setBalances(balancesJson);
  };
  useEffect(() => {
    fetchData();
    console.log(balances);
  }, []);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ date: formattedDate });

  const { submitData } = usePost("transactions", formData);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
    console.log(formData);
  };
  const handleButtonChoice = (id, value) => {
    setFormData({ ...formData, [id]: value });
    console.log(formData);
    handleNextStep();
  };

  const handleNextStep = async () => {
    if (step < 5) {
      setStep((prevStep) => prevStep + 1);
    }
  };
  const handlePreviousStep = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleNextStep();
    }
  };

  const handleSubmit = async () => {
    submitData();

    setFormData({ date: formattedDate });
    closeNewAction();
  };

  const renderInputsForStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col justify-normal items-center w-full">
            <label className="text-3xl mb-5 ml-5 font-extrabold">
              Tell us About your transaction type
            </label>
            <div
              onClick={() => handleButtonChoice("type", "income")}
              className="p-4 sm:w-96 w-full bg-[#343434] rounded-xl hover:border border-[#C2C2C2] flex justify-start items-center mb-4 transition-all  hover:scale-105"
            >
              <img
                src="income.svg"
                alt=""
                className="p-3 bg-[#65AD82]  rounded-xl w-12 "
              />
              <div className="text-start ml-3">
                <div className=" text-xl  font-bold">income</div>
                <div className=" text-md text-[#C2C2C2]">
                  choose if this is a revenu
                </div>
              </div>
            </div>
            <div
              onClick={() => setFormData({ ...formData, type: "outcome" })}
              className="p-4 sm:w-96 w-full bg-[#343434] rounded-xl hover:border border-[#C2C2C2] flex justify-start items-center transition-all  hover:scale-105"
            >
              <img
                src="outcome.svg"
                alt=""
                className="p-3 bg-[#D27979]  rounded-xl w-12 "
              />
              <div className="text-start ml-3">
                <div className="   text-xl  font-bold">outcome</div>
                <div className="text-md text-[#C2C2C2]">
                  choose if this is an expenss
                </div>
              </div>
            </div>
            {formData.type === "outcome" && (
              <div className="mt-4 flex justify-start flex-wrap gap-y-3">
                {budgets.map((budget) => {
                  return (
                    <div
                      className="p-2 bg-[#343434] rounded-xl flex justify-center items-center mr-3 gap-2 hover:border border-[#C2C2C2] "
                      onClick={() => handleButtonChoice("budget", budget.title)}
                    >
                      <div className="w-5 h-5 bg-[#65AD82] rounded-full"></div>
                      <div>{budget.title}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col justify-normal items-center  w-full">
            <label className="text-4xl mb-5 ml-5 font-extrabold">
              {formData.type === "outcome"
                ? "And How Much Did Your Transation Cost?"
                : "And How Much Did You Earn?"}
            </label>
            <input
              type="number"
              className=" rounded mb-4  bg-[#343434] p-2  outline-none text-center text-5xl font-bold  w-full "
              value={formData.amount || ""}
              placeholder="0.00₪"
              autoFocus
              id="amount"
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
            />
            <div className="rounded-full bg-[#343434] p-1 pl-4 pr-4 font-extrabold text-lg">
              ILS ₪
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col justify-normal items-center  w-full">
            <label className="text-4xl mb-8 ml-5 font-extrabold">
              And How Would You Call Your Transaction
            </label>
            <input
              type="text"
              className=" rounded mb-4  bg-[#343434] p-2  outline-none text-center text-2xl font-bold  w-full"
              value={formData.title || ""}
              placeholder="title"
              autoFocus
              id="title"
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
            />
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col justify-normal items-center  w-full">
            <label className="text-4xl mb-8 ml-5 font-extrabold">
              When Did Your Transaction Occurred
            </label>

            <input
              type="datetime-local"
              className=" rounded-xl mb-4  bg-[#343434] p-4 outline-none text-center text-2xl font-extrabold  w-full flex items-center justify-center"
              value={formData.date || formattedDate}
              autoFocus
              id="date"
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
            />
          </div>
        );
      case 5:
        return (
          <div className=" grid  grid-cols-2 w-full gap-4 ">
            {balances.map((balance) => {
              return (
                <div
                  style={
                    formData.target == balance.title
                      ? { borderWidth: "1px", borderColor: "#C2C2C2" }
                      : {}
                  }
                  onClick={() => handleButtonChoice("target", balance.title)}
                  className="flex items-center justify-center flex-col bg-[#343434] rounded-xl  hover:border border-[#C2C2C2]  p-4"
                >
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-3 h-3 bg-[#65AD82] rounded-full"></div>
                    <div className="   text-2xl  font-bold mb-2">
                      {balance.title}
                    </div>
                  </div>
                  <div className="text-lg text-[#C2C2C2] bg-[#242424] p-1 rounded px-8  font-bold ">
                    {balance.balance}₪
                  </div>
                </div>
              );
            })}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="  overflow-hidden select-none   fixed right-0 top-0 bottom-0 left-0 bg-[#242424] p-8 md:p-12  flex justify-between  flex-col">
      <button
        className="  bg-[#343434] rounded text-white p-3 text-2xl w-fit"
        onClick={() => closeNewAction()}
      >
        X
      </button>
      <div className="  text-5xl text-white  font-bold ">New Transaction</div>
      <form className="w-full text-white">
        <div className=" border rounded-xl border-[#C2C2C2]  p-8 py-10 h-fit flex justify-center items-center">
          {renderInputsForStep()}
        </div>
      </form>
      <div className="flex justify-between items-center flex-row-reverse">
        {step < 5 ? (
          <button
            onClick={handleNextStep}
            className="bg-[#343434] w-full p-3 rounded-xl m-2 text-white text-2xl"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-[#343434] w-full p-3 rounded-xl m-2 text-white text-2xl"
          >
            Submit
          </button>
        )}

        {step !== 1 && (
          <button
            onClick={handlePreviousStep}
            className="bg-[#343434] w-full p-3 rounded-xl m-2 text-white text-2xl"
          >
            Back
          </button>
        )}
      </div>
      <div className=" bg-[#343434] w-full h-2 rounded">
        <div
          style={{ width: `${(step * 100) / 5}%` }}
          className={`bg-[#6B71F9] h-2 rounded transition-all`}
        ></div>
      </div>
    </div>
  );
};

export default NewAction;
