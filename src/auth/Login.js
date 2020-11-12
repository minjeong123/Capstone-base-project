import React, { useRef, useState } from "react";
// import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { styled } from "@material-ui/core/styles";
import logo from "../components/images/logo.PNG";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
  makeStyles,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import clsx from "clsx";
import { AccountCircle, Visibility, VisibilityOff } from "@material-ui/icons";

const MyButton = styled(Button)({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 30px",
});

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/talent");
    } catch {
      setError("로그인에 실패했습니다.");
    }

    setLoading(false);
  }
  return (
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <>
        <Card>
          <CardContent style={{ flexDirection: "flex-start" }}>
            <h2 className="text-center mb-4">
              <img src={logo} width="185" height="185" alt="testA" style={{}} />
            </h2>
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

              <MyButton
                disabled={loading}
                variant="contained"
                color="secondary"
                className="w-100"
                type="submit"
              >
                로그인
              </MyButton>
            </form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">비밀번호 재설정</Link>
            </div>
          </CardContent>
        </Card>
        <div className="w-100 text-center mt-2">
          계정이 없으신가요? <Link to="/signup">가입하기</Link>
        </div>
      </>
    </div>
  );
}
