import { Row, Col } from "react-bootstrap";
import { LottieHandler } from "@components/feedback";

type GridListProps<T> = {
  records: T[];
  renderItem: (record: T) => JSX.Element;
  emptyMessage: string;
};

const GridList = <T extends { id?: number }>({
  records,
  renderItem,
  emptyMessage,
}: GridListProps<T>) => {
  const renderList =
    records.length > 0 ? (
      records.map((record) => (
        <Col
          xs={6}
          md={4}
          lg={4}
          xl={3}
          key={record.id}
          className="d-flex justify-content-center mb-5 mt-2"
        >
          {renderItem(record)}
        </Col>
      ))
    ) : (
      <Col>
        <LottieHandler type="emptyCart" message={emptyMessage} />
      </Col>
    );
  return <Row className="d-flex mb-5 mt-2">{renderList}</Row>;
};

export default GridList;
