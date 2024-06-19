import { Heading } from "@components/common";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap/";
import { Input } from "@components/Form";
import { Navigate } from "react-router-dom";
import useRegister from "@components/hooks/useRegister";

const Register = () => {
  const {
    loading,
    error,
    accessToken,
    register,
    handleSubmit,
    emailOnblurHandler,
    emailAvaliabiltyStatus,
    errors,
    submitForm,
  } = useRegister();

  if (accessToken) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Heading>User Registration</Heading>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label="First Name"
              name="firstName"
              register={register}
              error={errors.firstName?.message}
            />

            <Input
              label="Last Name"
              name="lastName"
              register={register}
              error={errors.lastName?.message}
            />

            <Input
              label="Email address"
              name="email"
              register={register}
              onBlur={emailOnblurHandler}
              error={
                errors.email?.message
                  ? errors.email.message
                  : emailAvaliabiltyStatus === "notAvailable"
                  ? "This email is not available"
                  : emailAvaliabiltyStatus === "failed"
                  ? "Error From Server"
                  : ""
              }
              formText={
                emailAvaliabiltyStatus === "checking"
                  ? "Checking,Please Wait..."
                  : ""
              }
              success={
                emailAvaliabiltyStatus === "available"
                  ? "Available For Use"
                  : ""
              }
            />

            <Input
              label="Password"
              name="password"
              type="password"
              register={register}
              error={errors.password?.message}
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              register={register}
              error={errors.confirmPassword?.message}
            />

            <Button
              variant="info"
              type="submit"
              style={{ color: "white", marginBottom: "10px" }}
              disabled={
                emailAvaliabiltyStatus === "checking"
                  ? true
                  : false || loading === "pending"
              }
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

export default Register;
