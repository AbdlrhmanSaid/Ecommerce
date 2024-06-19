import { useState } from "react";
import { useAppDispatch } from "@store/hooks";
import { actPlaceOreder } from "@store/oreders/orederSlice";
import { cleanCart } from "@store/cart/cartSlice";
import { Button, Modal, Spinner } from "react-bootstrap";
import { TProduct } from "@types";
import styles from "./styles.module.css";

type CartSubtotalPriceProps = {
  products: TProduct[];
  userAccessToken: string | null;
};

const CartSubtotalPrice = ({
  products,
  userAccessToken,
}: CartSubtotalPriceProps) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const subtotal = products.reduce((accumulator, el) => {
    const price = el.price;
    const quantity = el.quantity;
    if (quantity && typeof quantity === "number") {
      return accumulator + price * quantity;
    } else {
      return accumulator;
    }
  }, 0);

  const closeModal = () => {
    handleClose();
    setError(null);
  };

  const placrOrederHandler = () => {
    setLoading(true);
    dispatch(actPlaceOreder(subtotal))
      .unwrap()
      .then(() => {
        dispatch(cleanCart());
        closeModal();
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
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
        <Modal.Body>
          <Modal.Title>
            Are You Sure To Confirm Order with SubTotal {subtotal.toFixed(2)}?
            {!loading && error && (
              <p style={{ color: "#DG3545", marginTop: "10px" }}>{error}</p>
            )}
          </Modal.Title>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            variant="info"
            onClick={placrOrederHandler}
            style={{ color: "white" }}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" variant="primary" />
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={styles.container}>
        <span>Subtotal:</span>
        <span>{subtotal.toFixed(2)} EGP</span>
      </div>
      {userAccessToken && (
        <div className={styles.container}>
          <span></span>
          <span>
            <Button
              variant="info"
              style={{ color: "white" }}
              onClick={handleShow}
            >
              Place Order
            </Button>
          </span>
        </div>
      )}
    </>
  );
};

export default CartSubtotalPrice;
