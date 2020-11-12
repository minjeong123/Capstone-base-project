import React from "react";
import JobLists from "../JobLists";
import { Container } from "@material-ui/core";

export default function JobListsPage() {
  return (
    <Container style={{ flexDirection: "row", marginTop: "200px" }}>
      <div>
        <JobLists />
      </div>
    </Container>
  );
}
