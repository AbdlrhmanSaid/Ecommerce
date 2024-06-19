import { Heading } from "@components/common";
import { Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import { Input } from "@components/Form";
import { Navigate } from "react-router-dom";
import useLogin from "@components/hooks/useLogin";

const Login = () => {
  const {
    error,
    loading,
    accessToken,
    register,
    handleSubmit,
    formErrors,
    submitForm,
    searchParam,
  } = useLogin();
  if (accessToken) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Heading>User Login</Heading>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {searchParam.get("message") === "login_required" && (
            <Alert variant="danger">
              You Need to Login To View This Content
            </Alert>
          )}
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label="Email address"
              name="email"
              register={register}
              error={formErrors.email?.message}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              register={register}
              error={formErrors.password?.message}
            />

            <Button
              variant="info"
              type="submit"
              style={{ color: "white" }}
              disabled={loading === "pending" ? true : false}
            >
              {loading === "pending" ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Submit"
              )}
            </Button>
            {error && (
              <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
