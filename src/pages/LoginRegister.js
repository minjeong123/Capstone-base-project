import React, { useRef, useState } from "react";
// import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Button, Card, CardContent, FormControl } from "@material-ui/core";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
// import Alert from "@material-ui/lab/Alert";
// import AlertTitle from "@material-ui/lab/AlertTitle";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const passwordConfirmRef = useRef();
  const nameRef = useRef();
  const { signup, updateDisplayName, addUserToDB } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("로그인에 실패했습니다.");
    }

    setLoading(false);
  }

  async function handleSubmit2(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("비밀번호가 일치하지 않습니다.");
    }
    try {
      setError("");
      setLoading(true);
      console.log("em", emailRef.current.value);
      console.log("pw", passwordRef.current.value);
      console.log("nm", nameRef.current.value);
      await signup(emailRef.current.value, passwordRef.current.value);
      await updateDisplayName(nameRef.current.value);
      await addUserToDB();

      history.push("/login");
    } catch {
      setError("회원가입에 실패했습니다.");
    }

    setLoading(false);
  }

  return (
    // <div className="w-100" style={{ maxWidth: "400px" }}>
    <div className="login-register-area pt-100 pb-100" style={{ marginTop: "220px"}}>
      {error && (
        <section>
          <p>Error</p>
          This is an error alert — <strong>{error}</strong>
        </section>
      )}
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-12 ml-auto mr-auto">
            <div className="login-register-wrapper">
              <Tab.Container defaultActiveKey="login">
                <Nav variant="pills" className="login-register-tab-list">
                  <Nav.Item>
                    <Nav.Link eventKey="login">
                      <h4>로그인</h4>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="register">
                      <h4>Register</h4>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content>
                  <Tab.Pane eventKey="login">
                    <div className="login-form-container">
                      <div className="login-register-form">
                        <form onSubmit={handleSubmit}>
                          <input
                            id="standard-adornment-email"
                            type="email"
                            placeholder="Email"
                            ref={emailRef}
                            required
                          />
                          <input
                            id="standard-adornment-password"
                            type="password"
                            placeholder="Password"
                            ref={passwordRef}
                            required
                          />

                          <div className="button-box">
                            <div className="login-toggle-btn">
                              <input type="checkbox" />
                              <label className="ml-10">Remember me</label>
                              <Link to="/forgot-password">
                                Forgot Password?
                              </Link>
                            </div>
                            {/* <button type="submit">
                                  <span>Login</span>
                                </button> */}
                            <button
                              disabled={loading}
                              variant="contained"
                              color="secondary"
                              className="w-100"
                              type="submit"
                            >
                              로그인
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="register">
                    <div className="login-form-container">
                      <div className="login-register-form">
                        <form onSubmit={handleSubmit2}>
                          <input
                            id="standard-adornment-name-confirm"
                            type="text"
                            placeholder="user-name"
                            ref={nameRef}
                            required
                          />
                          <input
                            id="standard-adornment-password"
                            type="password"
                            placeholder="Password"
                            ref={passwordRef}
                            required
                          />
                          <input
                            id="standard-adornment-password-confirm"
                            type="password"
                            placeholder="Password-confirm"
                            ref={passwordConfirmRef}
                            required
                          />
                          <input
                            id="standard-adornment-email"
                            type="email"
                            placeholder="Email"
                            ref={emailRef}
                            required
                          />
                          <div className="button-box">
                            <button
                              disabled={loading}
                              variant="contained"
                              color="secondary"
                              className="w-50"
                              type="submit"
                            >
                              <span>Register</span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
