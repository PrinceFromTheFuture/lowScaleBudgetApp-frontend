import { useEffect, useState } from "react";

const useUpdate = (model, object) => {
  const baseURI = import.meta.env.VITE_BASE_URI;
  const [isFinished, setIsFinished] = useState(false);

  const updateData = async () => {
    await fetch(`${baseURI}/${model}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(object)
    });


    setIsFinished((p)=> p+1)
  };

  return {isFinished, updateData};
};
export default useUpdate;
