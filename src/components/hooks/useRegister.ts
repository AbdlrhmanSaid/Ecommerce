import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, signUpType } from "@validations/signupSchema";
import useCheckEmailAvaliabilty from "@components/hooks/useCheckEmailAvaliabilty";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthRegister, resetUi } from "@store/auth/authSlice";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<signUpType>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const {
    enteredEmail,
    emailAvaliabiltyStatus,
    checkEmailAvaliabilty,
    resetCheckEmailAvaliabilty,
  } = useCheckEmailAvaliabilty();

  const submitForm: SubmitHandler<signUpType> = async (data) => {
    const { firstName, lastName, email, password } = data;
    dispatch(actAuthRegister({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => {
        navigate("/login?message=account_confirmed");
      });
  };

  const emailOnblurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState("email");
    if (isDirty && !invalid && enteredEmail !== value) {
      // check
      checkEmailAvaliabilty(value);
    }

    if (isDirty && !invalid && enteredEmail) {
      resetCheckEmailAvaliabilty();
    }
  };

  useEffect(() => {
    dispatch(resetUi());
  }, [dispatch]);
  return {
    loading,
    error,
    accessToken,
    register,
    handleSubmit,
    emailOnblurHandler,
    emailAvaliabiltyStatus,
    errors,
    submitForm,
  };
};

export default useRegister;
