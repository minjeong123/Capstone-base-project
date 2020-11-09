import { Box, Button, Grid, Typography, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  openJobButton: {
    // backgroundColor: theme.palette.subColor.main,
    backgroundColor: "#e1bee7",
  },
}));

export default (props) => {
  const classes = useStyles();
  return (
    <Box py={10} bgcolor="gray" color="white">
      {/* bgcolor="secondary.main" color="white"> */}
      <Grid container justify="center">
        <Grid item xs={10}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4">부엉이 어시 구하기</Typography>
            <Button
              onClick={props.openNewJobModal}
              variant="contained"
              className={classes.openJobButton}
              disableElevation
            >
              Post a Job
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
