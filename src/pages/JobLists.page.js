import React from "react";
import { Container } from "@material-ui/core";
import JobLists from "../JobLists";

export default function JobListsPage() {
  return (
    <Container style={{ flexDirection: "row", marginTop: "200px" }}>
      <div>
        <JobLists />
      </div>
    </Container>
  );
}
