import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@material-ui/core";

export default function Logout() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login-register");
    } catch {
      setError("로그아웃에 실패했습니다.");
    }
  }
  return (
    <div className="w-100 text-center mt-3 bg-white rounded">
      {currentUser ? (
        <>
          <Button variant="outline-danger" onClick={handleLogout}>
            로그아웃
          </Button>
        </>
      ) : null}
    </div>
  );
}
