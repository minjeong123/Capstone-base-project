import React, { useRef, useState } from "react";
// import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button, Card, FormControl, InputLabel } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CardContent from "@material-ui/core/CardContent";
import { AlertTitle } from "@material-ui/lab";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("비밀번호가 일치하지 않습니다.");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("프로필 편집을 실패했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <>
        <Card>
          <CardContent>
            <h2 className="text-center mb-4">프로필 편집</h2>
            {error && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                This is an error alert — <strong>{error}</strong>
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <FormControl id="email">
                <InputLabel htmlFor="imail-input">이메일</InputLabel>
                <input
                  type="email"
                  ref={emailRef}
                  required
                  defaultValue={currentUser.email}
                />
              </FormControl>
              <FormControl id="password">
                <InputLabel htmlFor="password-input">비밀번호</InputLabel>
                <input
                  type="password"
                  ref={passwordRef}
                  placeholder="Leave blank to keep the same"
                />
              </FormControl>
              <FormControl id="password-confirm">
                <InputLabel htmlFor="passwordConfirm-input">
                  비밀번호 확인
                </InputLabel>
                <input
                  type="password"
                  ref={passwordConfirmRef}
                  placeholder="Leave blank to keep the same"
                />
              </FormControl>

              {/* <Form.Group id="email">
                <Form.Label>이메일</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                  defaultValue={currentUser.email}
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  placeholder="Leave blank to keep the same"
                />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>비밀번호 확인</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  placeholder="Leave blank to keep the same"
                />
              </Form.Group> */}
              <Button
                disabled={loading}
                variant="contained"
                color="secondary"
                className="w-100"
                type="submit"
              >
                변경하기
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="w-100 text-center mt-2">
          <Link to="/">취소</Link>
        </div>
      </>
    </div>
  );
}
