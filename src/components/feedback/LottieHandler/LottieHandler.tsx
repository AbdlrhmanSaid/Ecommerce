import Lottie from "lottie-react";
import error404 from "@assets/lottieFiles/error404.json";
import error from "@assets/lottieFiles/error.json";
import success from "@assets/lottieFiles/success.json";
import emptyCart from "@assets/lottieFiles/emptyCart.json";
import loading from "@assets/lottieFiles/loadingCart.json";
import mainloading from "@assets/lottieFiles/mainloading.json";

const lottieFilesMap = {
  error404,
  error,
  emptyCart,
  loading,
  mainloading,
  success,
};

type LottieHandlerProps = {
  type: keyof typeof lottieFilesMap;
  message?: string;
};

const LottieHandler = ({ type, message }: LottieHandlerProps) => {
  const lottie = lottieFilesMap[type];
  return (
    <div className="d-flex flex-column align-items-center justify-content-center mb-5">
      <Lottie
        animationData={lottie}
        style={{ width: "300px", margin: "60px 0 0 0" }}
      />
      {message && <h3 style={{ fontSize: "19px" }}>{message}</h3>}
    </div>
  );
};

export default LottieHandler;
