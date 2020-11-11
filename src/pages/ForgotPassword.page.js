import React from "react";
import { Container } from "@material-ui/core";
import ForgotPassword from "../auth/ForgotPassword";

export default function ForgotPasswordPage() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ flexDirection: "row", marginTop: "200px" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <ForgotPassword />
      </div>
    </Container>
  );
}
