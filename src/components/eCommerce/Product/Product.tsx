import { useEffect, useState, memo } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";
import { addToCart } from "@store/cart/cartSlice";
import { Button, Spinner, Modal } from "react-bootstrap";
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";
import { TProduct } from "@types";
import { useNavigate } from "react-router-dom";
import ProductInfo from "../productInfo/PoductInfo";

import styles from "./styles.module.css";
const { maximumNotice, wishlist } = styles;

const Product = memo(
  ({ id, title, price, img, max, quantity, isLiked }: TProduct) => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const currentRemainingQuantity = max - (quantity ?? 0);
    const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;

    const { accessToken } = useAppSelector((state) => state.auth);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
      if (!isBtnDisabled) {
        return;
      }

      const debounce = setTimeout(() => {
        setIsBtnDisabled(false);
      }, 300);

      return () => clearTimeout(debounce);
    }, [isBtnDisabled]);

    const addToCartHandler = () => {
      dispatch(addToCart(id));
      setIsBtnDisabled(true);
    };

    const LikeToggleHandler = () => {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      dispatch(actLikeToggle(id))
        .unwrap()
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    };

    return (
      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>Please Log in First</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          </Modal.Footer>
        </Modal>
        <ProductInfo title={title} price={price} img={img}>
          {accessToken ? (
            <>
              <div className={wishlist} onClick={LikeToggleHandler}>
                {isLoading ? (
                  <Spinner animation="border" size="sm" variant="primary" />
                ) : isLiked ? (
                  <LikeFill />
                ) : (
                  <Like />
                )}
              </div>
            </>
          ) : (
            <>
              <div className={wishlist} onClick={handleShow}>
                <Like />
              </div>
            </>
          )}

          <p className={maximumNotice}>
            {quantityReachedToMax
              ? "You reach to the limit"
              : `You can add ${currentRemainingQuantity} item(s)`}
          </p>
          <Button
            variant="info"
            style={{ color: "white", width: "100%" }}
            onClick={addToCartHandler}
            disabled={isBtnDisabled || quantityReachedToMax}
          >
            {isBtnDisabled ? (
              <>
                <Spinner animation="border" size="sm" /> Loading...
              </>
            ) : (
              "Add to cart"
            )}
          </Button>
        </ProductInfo>
      </>
    );
  }
);

export default Product;
