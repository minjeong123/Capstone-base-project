import React from "react";
import { Box, Grid, Typography, Button, makeStyles } from "@material-ui/core";
// import { differenceInMinutes } from "date-fns";
// import * as dateFns from "date-fns";
// import formatDistance from "date-fns/formatDistance";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    border: "1px solid #e8e8e8",
    cursor: "pointer",
    transition: ".3s",

    "&:hover": {
      boxShadow: "0px 5px 25px rgba(0,0,0,0.1)",
      borderLeft: "6px solid #4D64E4",
    },
  },
  companyName: {
    fontSize: "13.5px",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(0.75),
    borderRadius: "5px",
    display: "inline-block",
    fontWeight: 600,
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
}));

export default (props) => {
  const classes = useStyles();

  function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return "방금 전";
    if (betweenTime < 60) {
      return `${betweenTime}분 전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간 전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일 전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년 전`;
  }

  return (
    <Box p={2} className={classes.wrapper}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography variant="subtitle1">{props.title}</Typography>
          <Typography className={classes.companyName} variant="subtitle2">
            {props.companyName}
          </Typography>
        </Grid>
        <Grid item container xs>
          {props.skills.map((skill) => (
            <Grid key={skill} className={classes.skillChip} item>
              {skill}
            </Grid>
          ))}
        </Grid>
        <Grid item container direction="column" alignItems="flex-end" xs>
          <Grid item>
            <Typography variant="captain">
              {/* {differenceInMinutes(Date.now(), props.postedOn)} min ago |{" "} */}
              {timeForToday(props.postedOn)} | {props.type} | {props.location}
            </Typography>
          </Grid>
          <Grid item>
            <Box mt={2}>
              <Button onClick={props.open} variant="outlined">
                Check
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
