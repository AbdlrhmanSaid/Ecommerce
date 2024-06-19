import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthLogin, resetUi } from "@store/auth/authSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, signInType } from "@validations/signInSchema";
import { useSearchParams, useNavigate } from "react-router-dom";

const useLogin = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { error, loading, accessToken } = useAppSelector((state) => state.auth);

  const [searchParam, setSearchParam] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<signInType>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
  });

  const submitForm: SubmitHandler<signInType> = (data) => {
    if (searchParam.get("message")) {
      setSearchParam("");
    }
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => navigate("/"));
  };

  useEffect(() => {
    dispatch(resetUi());
  }, [dispatch]);
  return {
    error,
    loading,
    accessToken,
    register,
    handleSubmit,
    formErrors,
    submitForm,
    searchParam,
  };
};

export default useLogin;
