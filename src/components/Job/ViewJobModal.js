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
// import { format } from "data-fns";
import * as dateFns from "date-fns";
import { useAuth } from "../../contexts/AuthContext";
import UpdateJobModal from "./UpdateJobModal";

export default (props) => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [updateJobModal, setUpdateJobModal] = useState(false);

  console.log("props.job.userId", props.job.userId);

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
              variant="contained"
              color="secondary"
              onClick={() => setUpdateJobModal(true)}
            >
              수정하기
            </Button>
            <UpdateJobModal
              closeModal={() => setUpdateJobModal(false)}
              closeViewModal={props.closeModal}
              updateJobModal={updateJobModal}
              updateJob={props.updateJob}
              job={props.job}
            />
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
                <Grid>
                  {" "}
                  <Typography>쪽지 보내기</Typography>
                </Grid>
                <Grid>
                  {" "}
                  <MessageIcon />
                </Grid>
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
