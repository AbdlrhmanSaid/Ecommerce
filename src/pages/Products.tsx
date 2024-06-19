import { GridList } from "@components/common";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { TProduct } from "@types";
import { useProducts } from "@components/hooks/useProducts";

const Products = () => {
  const { loading, error, productsFullInfo } = useProducts();
  return (
    <>
      <Loading status={loading} error={error} type="product">
        <GridList<TProduct>
          emptyMessage = "Not Found Products..."
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Products;
