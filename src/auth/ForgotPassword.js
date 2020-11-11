import React, { useRef, useState } from "react";
// import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("입력하신 이메일의 받은 편지함에서 이메일을 확인하십시오.");
    } catch {
      setError("비밀번호 재설정에 실패했습니다.");
    }

    setLoading(false);
  }

  return (
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <>
        <Card>
          <CardContent>
            <h2 className="text-center mb-4">비밀번호 재설정</h2>
            {error && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                This is an error alert — <strong>{error}</strong>
              </Alert>
            )}
            {message && (
              <Alert severity="error">
                <AlertTitle>message</AlertTitle>
                This is an message alert — <strong>{message}</strong>
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              {/* <Form.Group id="email">
                <Form.Label>이메일</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group> */}
              <FormControl id="email">
                <label htmlFor="imail-input">이메일</label>
                <input
                  type="email"
                  id="imail-input"
                  aria-describedby="my-helper-text"
                  ref={emailRef}
                  required
                />
              </FormControl>

              <Button
                disabled={loading}
                variant="contained"
                color="secondary"
                className="w-100"
                type="submit"
              >
                비밀번호 재설정
              </Button>
            </form>
            <div className="w-100 text-center mt-3">
              <Link to="/login">로그인</Link>
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
