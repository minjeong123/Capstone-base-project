import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  Close as CloseIcon,
  MailOutline as MessageIcon,
} from "@material-ui/icons";
import * as dateFns from "date-fns";
import { useAuth } from "../../contexts/AuthContext";
import UpdateJobModal from "./UpdateJobModal";
import { Link } from "react-router-dom";

export default (props) => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [updateJobModal, setUpdateJobModal] = useState(false);

  console.log("props.job.userId", props.job.userId);

  const closeModal = () => {
    setLoading(false);

    // props.closeViewModal();
    props.closeModal();
  };

  return (
    <Dialog open={!!Object.keys(props.job).length} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          [{props.job.location}]{props.job.title}
          <IconButton onClick={props.closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box>
          <Box className={classes.info} display="flex">
            <Typography variant="caption">Written by : </Typography>
            <Typography variant="body2">{props.job.userId}</Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography variant="caption">Posted on : </Typography>
            <Typography variant="body2">
              {props.job.postedOn &&
                dateFns.format(props.job.postedOn, "yyyy-MM-dd HH:MM")}
            </Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography variant="caption">Job title : </Typography>
            <Typography variant="body2">{props.job.title}</Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography variant="caption">Job school : </Typography>
            <Typography variant="body2">{props.job.school}</Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography variant="caption">Job location : </Typography>
            <Typography variant="body2">{props.job.location}</Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography variant="caption">Job endDate : </Typography>
            <Typography variant="body2">{props.job.endDate}</Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography variant="caption">Job number of people : </Typography>
            <Typography variant="body2">{props.job.nOfPeople}</Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography variant="caption">Job type : </Typography>
            <Typography variant="body2">{props.job.type}</Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography variant="caption">Job reward : </Typography>
            <Typography variant="body2">{props.job.reward}</Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography variant="caption">Job description : </Typography>
            <Typography variant="body2">{props.job.description}</Typography>
          </Box>
          <Box ml={0.5}>
            <Typography variant="caption">Todos : </Typography>
            <Grid container alignItems="center">
              {props.job.skills &&
                props.job.skills.map((skill) => (
                  <Grid item key={skill} className={classes.openJobButton}>
                    {skill}
                  </Grid>
                ))}
            </Grid>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography variant="caption">Job Sex : </Typography>
            <Typography variant="body2">{props.job.sex}</Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography variant="caption">Job Experience : </Typography>
            <Typography variant="body2">{props.job.experience}</Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        {props.job.userId === currentUser.email ? (
          <Grid>
            <Button
              style={{ marginRight: "10px" }}
              variant="contained"
              onClick={() => setUpdateJobModal(true)}
            >
              수정
            </Button>
            <UpdateJobModal
              closeModal={() => setUpdateJobModal(false)}
              closeViewModal={props.closeModal}
              updateJobModal={updateJobModal}
              updateJob={props.updateJob}
              job={props.job}
            />

            {/* <Button
              style={{ backgroundColor: "red" }}
              variant="contained"
              onClick={() => setUpdateJobModal(true)}
            >
              삭제
            </Button> */}
            <Button
              style={{ backgroundColor: "red" }}
              variant="contained"
              onClick={() => {
                if (
                  window.confirm("Are you sure you wish to delete this post?")
                ) {
                  props.deleteJob(props.job);
                  closeModal();
                }
              }}
            >
              삭제
            </Button>
          </Grid>
        ) : null}

        <Button
          // onClick={props.new}
          variant="contained"
          className={classes.openMessageButton}
          disableElevation
          disabled={loading}
        >
          <Box display="flex" flexDirection="row" paddingTop="6px">
            {loading ? (
              <CircularProgress color="secondary" size={22} />
            ) : (
              <>
                {/* <Link to="/chat" className="btn btn-primary btn-lg m-2"> */}
                <Link
                  to={{
                    pathname: "/chat",
                    query: {
                      userId: props.job.userId ? props.job.userId : null,
                    },
                  }}
                >
                  <Grid>
                    {" "}
                    <Typography>쪽지 보내기</Typography>
                  </Grid>
                  <Grid>
                    {" "}
                    <MessageIcon />
                  </Grid>
                </Link>
              </>
            )}
          </Box>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  info: {
    "& > *": {
      margin: "4px",
    },
  },
  skillChip: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.75),
    fontSize: "14.5px",
    borderRadius: "5px",
    transition: ".3s",
    fontWeight: 600,
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
  },
  openJobButton: {
    // backgroundColor: theme.palette.subColor.main,
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.75),
    fontSize: "14.5px",
    borderRadius: "5px",
    transition: ".3s",
    fontWeight: 600,
    color: "#fff",
    backgroundColor: theme.palette.mainColor.main,
  },
  openMessageButton: {
    backgroundColor: "#e1bee7",
  },
}));
