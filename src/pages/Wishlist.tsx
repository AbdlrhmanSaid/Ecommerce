import { Heading } from "@components/common";
import { GridList } from "@components/common";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { TProduct } from "@types";
import { useWishlist } from "@components/hooks/useWishlist";

const Wishlist = () => {
  const { loading, error, records } = useWishlist();
  return (
    <>
      <Heading>Wishlist</Heading>
      <Loading status={loading} error={error} type="product">
        <GridList<TProduct>
          emptyMessage = "Wishlist is Empty"
          records={records}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Wishlist;
