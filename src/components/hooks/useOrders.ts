import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect, useState } from "react";
import { actGetOrders, resetOrderStatus } from "@store/oreders/orederSlice";
import { TProduct } from "@types";

const useOrders = () => {
  const { loading, error, ordersList } = useAppSelector(
    (state) => state.orders
  );
  const dispatch = useAppDispatch();

  const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([]);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setSelectedProduct([]);
  };

  const viewDetailsNumber = (id: number) => {
    const productDetails = ordersList.find((order) => order.id === id);
    const newItem = productDetails?.items ?? [];
    handleShow();
    setSelectedProduct((prev) => [...prev, ...newItem]);
  };

  useEffect(() => {
    const promise = dispatch(actGetOrders());
    return () => {
      promise.abort();
      dispatch(resetOrderStatus());
    };
  }, [dispatch]);

  return {
    loading,
    error,
    ordersList,
    selectedProduct,
    show,
    handleClose,
    viewDetailsNumber,
  };
};

export default useOrders;
