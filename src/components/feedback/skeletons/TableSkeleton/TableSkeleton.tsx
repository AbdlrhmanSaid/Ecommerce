import ContentLoader from "react-content-loader";

import { Row, Col } from "react-bootstrap";

const TableSkeleton = () => {
  const renderList = Array(1)
    .fill(0)
    .map((_, idx) => (
      <Col xs={3} key={idx} className="d-flex justify-content-center mb-5 mt-2">
        <ContentLoader
          speed={2}
          width={340}
          height={84}
          viewBox="0 0 340 84"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="105" y="10" rx="3" ry="3" width="112" height="16" />
          <rect x="230" y="8" rx="3" ry="3" width="91" height="18" />
          <rect x="106" y="36" rx="3" ry="3" width="112" height="16" />
          <rect x="229" y="36" rx="3" ry="3" width="91" height="18" />
          <rect x="106" y="65" rx="3" ry="3" width="112" height="16" />
          <rect x="231" y="62" rx="3" ry="3" width="91" height="18" />
          <rect x="3" y="8" rx="3" ry="3" width="91" height="18" />
          <rect x="5" y="35" rx="3" ry="3" width="91" height="18" />
          <rect x="4" y="62" rx="3" ry="3" width="91" height="18" />
        </ContentLoader>
      </Col>
    ));
  return <Row>{renderList}</Row>;
};

export default TableSkeleton;
