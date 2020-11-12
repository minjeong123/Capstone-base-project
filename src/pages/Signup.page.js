import React from "react";
import Signup from "../auth/Signup";
import { Container, Grid } from "@material-ui/core";

export default function SignupPage() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ flexDirection: "row", marginTop: "200px" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Signup />
      </div>
    </Container>
  );
}
