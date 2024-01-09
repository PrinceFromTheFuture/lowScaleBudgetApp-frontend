import { useEffect, useState } from "react";

const usePost = (model, object) => {
  const baseURI = import.meta.env.VITE_BASE_URI;
  const [isFinished, setIsFinished] = useState(false);

  const submitData = async () => {
     

    const response = await fetch(`${baseURI}/${model}/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(object)
    });
    const json = await response.json()
    console.log(json)


    setIsFinished((p)=> p+1)
  };

  return {isFinished, submitData};
};
export default usePost;
