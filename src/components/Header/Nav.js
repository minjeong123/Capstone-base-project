import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/logo.PNG";
import {
  AppBar,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Toolbar,
} from "@material-ui/core";

const UserIcon = lazy(() => import("../../auth/UserIcon"));
const Logout = lazy(() => import("../../auth/Logout"));

export default function Nav() {
  const { currentUser } = useAuth();

  return (
    <div>
      <AppBar
        className="navbar navbar-expand-sm navbar-light bg-light"
        style={{ flexDirection: "row" }}
      >
        <Toolbar>
          <IconButton>
            <a
              href="/"
              className="navbar-brand"
              style={{
                color: "#7563A7",
                fontWeight: "500",
              }}
            >
              <img
                src={logo}
                width="75"
                height="75"
                alt="testA"
                style={{}}
              ></img>
            </a>
          </IconButton>
          <Button variant="contained" style={{ marginRight: "5px" }}>
            <Link
              to={"/talent"}
              style={{ textDecoration: "none", color: "black" }}
            >
              재능교환
            </Link>
          </Button>

          {currentUser ? null : (
            <Button variant="contained" style={{ marginRight: "5px" }}>
              <Link
                to={"/login-register"}
                style={{ textDecoration: "none", color: "black" }}
              >
                로그인/회원가입
              </Link>
            </Button>
          )}
        </Toolbar>
        {currentUser ? (
          <Toolbar
            style={{
              marginRight: "auto",
              flexDirection: "row",
              marginLeft: "950px",
            }}
          >
            <Paper style={{ width: "120px", marginRight: "10px" }}>
              <UserIcon />
            </Paper>
            <Paper>
              <Logout />
            </Paper>
          </Toolbar>
        ) : null}
      </AppBar>
    </div>
  );
}
