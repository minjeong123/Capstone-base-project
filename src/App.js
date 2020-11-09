import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  ThemeProvider,
} from "@material-ui/core";
import theme from "./theme/theme";
import Header from "./components/Header/index";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/Job/JobCard";
import NewJobModal from "./components/Job/NewJobModal";
// import jobData from "./dummyData";
import { firestore, app } from "./firebase/config";
import { Close as CloseIcon } from "@material-ui/icons";
import ViewJobModal from "./components/Job/ViewJobModal";
import { v4 as uuid } from "uuid";

export default () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customSearch, setCustomSearch] = useState(false);
  const [newJobModal, setNewJobModal] = useState(false);
  const [viewJob, setViewJob] = useState({});

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

  const fetchJobsCustom = async (jobSearch) => {
    setLoading(true);
    setCustomSearch(true);
    const req = await firestore
      .collection("jobs")
      .orderBy("postedOn", "desc")
      .where("location", "==", jobSearch.location)
      .where("reward", "==", jobSearch.reward)
      .where("skills", "array-contains", jobSearch.skills)
      .where("sex", "==", jobSearch.sex)
      .get();
    const tempJobs = req.docs.map((job) => ({
      ...job.data(),
      id: job.id,
      postedOn: job.data().postedOn.toDate(),
    }));
    setJobs(tempJobs);
    setLoading(false);
  };

  const postJob = async (jobDetails, imageUrl) => {
    const id = uuid();
    await firestore
      .collection("jobs")
      .doc(id)
      .set(
        {
          ...jobDetails,
          postedOn: app.firestore.FieldValue.serverTimestamp(),
          imageUrl: imageUrl,
        },
        { merge: true }
      );
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <ThemeProvider theme={theme} style={{ transition: ".3s" }}>
      <Header openNewJobModal={() => setNewJobModal(true)} />
      <NewJobModal
        closeModal={() => setNewJobModal(false)}
        newJobModal={newJobModal}
        postJob={postJob}
      />
      <ViewJobModal job={viewJob} closeModal={() => setViewJob({})} />
      <Box mb={3}>
        <Grid container spacing={2} justify="center">
          <Grid item xs={10}>
            <SearchBar fetchJobsCustom={fetchJobsCustom} />
            {loading ? (
              <Box display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            ) : (
              <Grid style={{ marginBottom: "5px" }}>
                {customSearch && (
                  <Box display="flex" justifyContent="flex-end">
                    <Button onClick={fetchJobs}>
                      <CloseIcon size={20} />
                      Custom Search
                    </Button>
                  </Box>
                )}
                <Grid container>
                  {jobs.map((job) => (
                    <Grid item xs={4}>
                      <Box display="flex" justifyContent="row-revers">
                        <JobCard
                          open={() => setViewJob(job)}
                          key={job.id}
                          {...job}
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
