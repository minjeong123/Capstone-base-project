import React, { useEffect, useState } from "react";
import { firestore } from "../firebase/config";
import JobCard from "../components/Job/JobCard";
import {
  Box,
  Grid,
  IconButton,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import theme from "../theme/theme";
import LaunchIcon from "@material-ui/icons/Launch";
import { useHistory } from "react-router-dom";

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customSearch, setCustomSearch] = useState(false);
  const history = useHistory();

  const fetchJobs = async () => {
    setCustomSearch(false);
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

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <ThemeProvider theme={theme} style={{ transition: ".3s" }}>
      <Box mb={3} mt={20}>
        <Grid container spacing={2} justify="center">
          <IconButton
            style={{ backgroundColor: "primary" }}
            onClick={() => history.push("/login")}
          >
            <Typography>더보기</Typography>
            <LaunchIcon />
          </IconButton>
        </Grid>
      </Box>
      <Box mb={3}>
        <Grid container spacing={2} justify="center">
          <Grid item xs={10}>
            <Grid container>
              {jobs.map((job) => (
                <Grid item xs={4}>
                  <Box display="flex" justifyContent="row-revers">
                    <JobCard key={job.id} {...job} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
