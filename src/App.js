import React, { Suspense, lazy } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";
import {
  AppBar,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Toolbar,
} from "@material-ui/core";
import Nav from "./components/Header/Nav";

const UpdateProfilePage = lazy(() => import("./pages/UpdateProfile.page"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPassword.page"));
const JobListsPage = lazy(() => import("./JobLists"));
const SignupPage = lazy(() => import("./pages/Signup.page"));
const LoginPage = lazy(() => import("./pages/Login.page"));
const HomePage = lazy(() => import("./pages/Home.page"));

function App(props) {
  const { currentUser } = useAuth();

  return (
    <div style={{ flex: 1, flexDirection: "flex-start" }}>
      <Nav />

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
