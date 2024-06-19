import { Heading } from "@components/common";
import { Loading, LottieHandler } from "@components/feedback";
import { CartItemList, CartSubtotalPrice } from "@components/eCommerce";
import { useCart } from "@components/hooks/useCart";
import { Col } from "react-bootstrap";
import { useEffect } from "react";
import { useAppDispatch } from "@store/hooks";
import { resetOrderStatus } from "@store/oreders/orederSlice";

const Cart = () => {
  const {
    loading,
    error,
    products,
    userAccessToken,
    placeOrederStatus,
    changeQuantityHandler,
    removeItemHandler,
  } = useCart();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetOrderStatus());
  }, [dispatch]);

  return (
    <>
      <Heading>Your Cart</Heading>
      <Loading status={loading} error={error} type="cart">
        {products.length ? (
          <>
            <CartItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />
            <CartSubtotalPrice
              products={products}
              userAccessToken={userAccessToken}
            />
          </>
        ) : placeOrederStatus === "succeeded" ? (
          <Col>
            <LottieHandler
              type="success"
              message="Your Order has been Placed successfully."
            />
          </Col>
        ) : (
          <Col>
            <LottieHandler type="emptyCart" message="Your Cart is empty" />
          </Col>
        )}
      </Loading>
    </>
  );
};

export default Cart;
