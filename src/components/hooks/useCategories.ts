import { cleanUpCategories } from "@store/categories/categoriesSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetCategories } from "@store/categories/categoriesSlice";

export const useCategories = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector(
    (state) => state.categories
  );
  useEffect(() => {
    const promise = dispatch(actGetCategories());
    return () => {
      dispatch(cleanUpCategories());
      promise.abort();
    };
  }, [dispatch]);
  return { loading, error, records };
};
