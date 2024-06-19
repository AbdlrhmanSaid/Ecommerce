import { useCategories } from "@components/hooks/useCategories";
import { Category } from "@components/eCommerce";
import { GridList, Heading } from "@components/common";
import { Loading } from "@components/feedback";
import { TCategory } from "@types";

const Categories = () => {
  const { loading, error, records } = useCategories();
  return (
    <>
      <Heading>Categories</Heading>
      <Loading status={loading} error={error} type="category">
        <GridList<TCategory>
          emptyMessage = "Not Found categories..."
          records={records}
          renderItem={(record) => <Category {...record} />}
        />
      </Loading>
    </>
  );
};

export default Categories;
