import React, { useRef, useState } from "react";
// import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Button,
  Card,
  FormControl,
  CardContent,
  makeStyles,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { AlertTitle } from "@material-ui/lab";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("비밀번호가 일치하지 않습니다.");
    }
    try {
      setError("");
      setLoading(true);
      console.log("em", emailRef.current.value);
      console.log("pw", passwordRef.current.value);
      await signup(emailRef.current.value, passwordRef.current.value);

      history.push("/login");
    } catch {
      setError("회원가입에 실패했습니다.");
    }

    setLoading(false);
  }

  return (
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <>
        <Card>
          <CardContent>
            <h2 className="text-center mb-4">회원가입</h2>
            {error && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                This is an error alert — <strong>{error}</strong>
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <FormControl>
                <label htmlFor="standard-adornment-email">이메일</label>
                <input
                  id="standard-adornment-email"
                  type="email"
                  ref={emailRef}
                  required
                />
              </FormControl>
              <FormControl>
                <label htmlFor="standard-adornment-password">Password</label>
                <input
                  id="standard-adornment-password"
                  type="password"
                  ref={passwordRef}
                  required
                />
              </FormControl>
              <FormControl>
                <label htmlFor="standard-adornment-password-confirm">
                  Password Confirm
                </label>
                <input
                  id="standard-adornment-password-confirm"
                  type="password"
                  ref={passwordConfirmRef}
                  required
                />
              </FormControl>
              <Button
                disabled={loading}
                variant="contained"
                color="secondary"
                className="w-50"
                type="submit"
                style={{ margin: "10px" }}
              >
                가입하기
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="w-100 text-center mt-2">
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </div>
      </>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
}));
