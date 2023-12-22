import { useEffect, useState } from "react";

const useDelete = (model, id) => {
  const baseURI = import.meta.env.VITE_BASE_URI;
  const [isFinished, setIsFinished] = useState(false);

  const deleteData = async () => {

    
    await fetch(`${baseURI}/${model}/delete/${id}`, {
      method: "DELETE",
    });

    setIsFinished((p)=> p+1)
  };

  return {isFinished, deleteData};
};
export default useDelete;
