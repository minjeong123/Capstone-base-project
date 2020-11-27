import { firestore } from "../../firebase/config";
import React, { Suspense, lazy, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/logo.PNG";
import talent from "../../assets/talent.PNG";
import {
  AppBar,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Toolbar,
} from "@material-ui/core";
import SearchBar from "../SearchBar";

const UserIcon = lazy(() => import("../../auth/UserIcon"));
const Logout = lazy(() => import("../../auth/Logout"));


export default function Nav() {
  const { currentUser } = useAuth();





  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customSearch, setCustomSearch] = useState(false);
  const history = useHistory();

  const fetchJobs = async () => {
    setLoading(true);
    const req = await firestore
      .collection("jobs")
      .orderBy("postedOn", "desc")
      .get();
    const tempJobs = req.docs.map((job) => ({
      ...job.data(),
      id: job.id,
      postedOn: job.data().postedOn.toDate(),
    }));
    setJobs(tempJobs);
    setLoading(false);
  };

  const fetchJobsCustom = async (jobSearch) => {
    setLoading(true);
    setCustomSearch(true);
    const req = await firestore
      .collection("jobs")
      .orderBy("title", "asc")
      .orderBy("postedOn", "desc")
      .where("title", ">=", jobSearch.title)
      .where("title", "<=", jobSearch.title + "\uf8ff")
      .get();
    const tempJobs = req.docs.map((job) => ({
      ...job.data(),
      id: job.id,
      postedOn: job.data().postedOn.toDate(),
    }));
    setJobs(tempJobs);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <AppBar
        className="navbar navbar-expand-sm navbar-light bg-transparent"
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
                width="300"
                height="75"
                alt="testA"
                style={{}}
              ></img>
            </a>

      
          </IconButton>

          <Button>
            <a
            href="/talent"
            class Name= "talent"
            style={{
              color: "#7563A7",
              fontWeight: "500",
            }}
            >
              <img
              src={talent}
              width="80"
                height="20"
                alt="testA"
                style={{}}
              ></img>
              </a>
            
           {/* 이거 버튼이 안바뀌어서 이미지로 넣었어요 별로면 지워두 됩니다*/}
          </Button>
          {/* <Button variant="outline-light" style={{ marginRight: "5px", fontsize: "30px" }}>
            <Link
              to={"/talent"}
              style={{ textDecoration: "none", color: "#7563A7" 
            }} 
            >
              재능교환
            </Link>
          </Button> */}

<SearchBar
                fetchJobsCustom={fetchJobsCustom}
                filterSelect={false}
              />

              
          {currentUser ? null : (
            <Button variant="outline-light" style={{ marginRight: "5px" }}>
              <Link
                to={"/login-register"}
                style={{ textDecoration: "none", color: "#7563A7" }}
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
