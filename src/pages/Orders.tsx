import { Loading } from "@components/feedback";
import { Heading } from "@components/common";
import { Table, Modal, Button } from "react-bootstrap";
import { ProductInfo } from "@components/eCommerce";
import useOrders from "@components/hooks/useOrders";

const Orders = () => {
  const {
    loading,
    error,
    ordersList,
    selectedProduct,
    show,
    handleClose,
    viewDetailsNumber,
  } = useOrders();
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        {selectedProduct.map((el) => (
          <Modal.Body key={el.id}>
            <ProductInfo
              key={el.id}
              title={el.title}
              img={el.img}
              price={el.price}
              quantity={el.quantity}
              direction="column"
            />
          </Modal.Body>
        ))}
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      <Heading>My Orders</Heading>
      <Loading status={loading} error={error} type="table">
        <Table>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Items</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {ordersList.map((el) => (
              <tr key={el.id}>
                <td>#{el.id}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => viewDetailsNumber(el.id)}
                  >
                    <span> {el.items.length} </span>
                    {" / "}
                    Product Details
                  </Button>
                </td>
                <td>{el.subtotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Loading>
    </>
  );
};

export default Orders;
