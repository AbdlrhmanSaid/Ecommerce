import { useState } from "react";
import axios from "axios";

type TStatus = "idle" | "checking" | "available" | "notAvailable" | "failed";

const useCheckEmailAvaliabilty = () => {
  const [emailAvaliabiltyStatus, setEmailAvaliabiltyStatus] =
    useState<TStatus>("idle");

  const [enteredEmail, setEnteredEmail] = useState<null | string>(null);

  const checkEmailAvaliabilty = async (email: string) => {
    setEnteredEmail(email);
    setEmailAvaliabiltyStatus("checking");
    try {
      const response = await axios.get(`/users?email=${email}`);
      if (response.data.length > 0) {
        setEmailAvaliabiltyStatus("notAvailable");
      } else {
        setEmailAvaliabiltyStatus("available");
      }
    } catch (error) {
      setEmailAvaliabiltyStatus("failed");
    }
  };

  const resetCheckEmailAvaliabilty = () => {
    setEmailAvaliabiltyStatus("idle");
    setEnteredEmail(null);
  };

  return {
    enteredEmail,
    emailAvaliabiltyStatus,
    checkEmailAvaliabilty,
    resetCheckEmailAvaliabilty,
  };
};

export default useCheckEmailAvaliabilty;
