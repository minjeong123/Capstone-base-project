import { Container } from "@material-ui/core";
import React from "react";

export default function NoMatchPage() {
  return (
    <Container style={{ flexDirection: "row", marginTop: "200px" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h1>404</h1>
      </div>
    </Container>
  );
}
