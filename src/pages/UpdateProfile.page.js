import React from "react";
import UpdateProfile from "../auth/UpdateProfile";
import { Container, Grid } from "@material-ui/core";

export default function UpdateProfilePage() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ flexDirection: "row", marginTop: "200px" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <UpdateProfile />
      </div>
    </Container>
  );
}
