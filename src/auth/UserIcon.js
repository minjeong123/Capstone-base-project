import React from "react";
import { useAuth } from "../contexts/AuthContext";
import userIcon from "../components/images/userIcon.png";
import { AccountCircle } from "@material-ui/icons";
import { Grid } from "@material-ui/core";

export default function UserIcon() {
  const { currentUser } = useAuth();
  return (
    <a href="/" className="navbar-brand text-center mt-1">
      {currentUser ? (
        <Grid style={{ width: "150px" }}>
          <AccountCircle style={{ marginRight: "10px" }} />
          <strong style={{ fontSize: "14px" }}>{currentUser.email}</strong>
        </Grid>
      ) : null}
    </a>
  );
}
