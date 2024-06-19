import LottieHandler from "../LottieHandler/LottieHandler";
import React, { Suspense } from "react";

const PageSuspense = ({
  children,
  type,
}: {
  children: React.ReactNode;
  type?: any;
}) => {
  return (
    <Suspense
      fallback={<LottieHandler type={type} message="Loading Please Wait" />}
    >
      {children}
    </Suspense>
  );
};

export default PageSuspense;
