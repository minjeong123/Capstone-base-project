import React, { Suspense, lazy } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import logo from "./components/images/logo.PNG";
import PrivateRoute from "./auth/PrivateRoute";
import {
  AppBar,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Toolbar,
} from "@material-ui/core";

const UpdateProfilePage = lazy(() => import("./pages/UpdateProfile.page"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPassword.page"));
const JobListsPage = lazy(() => import("./JobLists"));
const SignupPage = lazy(() => import("./pages/Signup.page"));
const LoginPage = lazy(() => import("./pages/Login.page"));
const HomePage = lazy(() => import("./pages/Home.page"));

const UserIcon = lazy(() => import("./auth/UserIcon"));
const Logout = lazy(() => import("./auth/Logout"));

function App(props) {
  const { currentUser } = useAuth();

  return (
    <div style={{ flex: 1, flexDirection: "flex-start" }}>
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
                to={"/signup"}
                style={{ textDecoration: "none", color: "black" }}
              >
                Signup
              </Link>
            </Button>
          )}
          {currentUser ? null : (
            <Button variant="contained" style={{ marginRight: "5px" }}>
              <Link
                to={"/login"}
                style={{ textDecoration: "none", color: "black" }}
              >
                login
              </Link>
            </Button>
          )}
        </Toolbar>
        <Toolbar style={{ flexDirection: "row" }}>
          <form>
            <input type="search" placeholder="Search" />
            <Button variant="contained" color="secondary" type="submit">
              Search
            </Button>
          </form>
        </Toolbar>
        {currentUser ? (
          <Toolbar style={{ flexDirection: "row" }}>
            <Suspense
              fallback={
                <div>
                  <CircularProgress />
                </div>
              }
            >
              <Paper style={{ width: "120px", marginRight: "10px" }}>
                <UserIcon />
              </Paper>
              <Paper>
                <Logout />
              </Paper>
            </Suspense>
          </Toolbar>
        ) : null}
      </AppBar>

      <div>
        <AuthProvider>
          <Suspense
            fallback={
              <div>
                <CircularProgress />
              </div>
            }
          >
            <Switch>
              <PrivateRoute exact path="/" component={JobListsPage} />
              <PrivateRoute
                path="/update-profile"
                component={UpdateProfilePage}
              />
              <Route path="/signup" component={SignupPage} />
              <Route
                path="/login"
                component={LoginPage}
                style={{ flexDirection: "row" }}
              />
              <Route
                path="/forgot-password"
                component={ForgotPasswordPage}
                style={{ flexDirection: "row" }}
              />
              <Route
                path="/home"
                component={HomePage}
                style={{ flexDirection: "row" }}
              />
              <PrivateRoute
                path="/talent"
                component={JobListsPage}
                style={{ flexDirection: "row" }}
              />
            </Switch>
          </Suspense>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
