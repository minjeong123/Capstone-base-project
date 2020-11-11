import React from "react";
import { Container } from "@material-ui/core";
import Login from "../auth/Login";

export default function LoginPage() {
  return (
    <Container style={{ flexDirection: "row", marginTop: "200px" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Login />
      </div>
    </Container>
  );
}
