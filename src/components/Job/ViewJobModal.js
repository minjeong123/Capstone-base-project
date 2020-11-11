import React from "react";
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

export default (props) => {
  const classes = useStyles();

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
        <Button
          onClick={props.openNewJobModal}
          variant="contained"
          className={classes.openMailButton}
          disableElevation
        >
          <IconButton onClick={props.closeModal}>
            <Typography>쪽지 보내기(미구현)</Typography>
            <MessageIcon />
          </IconButton>
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
  openMailButton: {
    backgroundColor: "#e1bee7",
  },
}));
