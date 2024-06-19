import { Link } from "react-router-dom";
import { LottieHandler } from "@components/feedback";
import { Container } from "react-bootstrap";

const Error = () => {
  
  return (
    <Container >
      <div className="text-center">
      <LottieHandler type="error404"/>      <Link to="/" replace={true}>
        How about going back to safety?
      </Link>
      </div>
    </Container>
  );
};

export default Error;
