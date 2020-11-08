import { Box, Button, CircularProgress, makeStyles, MenuItem, Select } from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: "#fff",
    display: "flex",
    boxShadow: "0px 1px 5px rgba(0,0,0,0.1)",
    borderRadius: "5px",
    "& > *": {
      flex: 1,
      height: "45px",
      margin: "8px",
    },
  },
});

export default (props) => {
  const [loading, setLoading] = useState(false);
  const [jobSearch, setJobSearch] = useState({
    type: "Full time",
    location: "Remote",
  });
  const menuItem1 = ["Full time", "Part time", "Contract"];
  const menuItem2 = ["Remote", "In-Office"];
  const classes = useStyles();

  const handleChange = (e) => {
    e.persist();
    setJobSearch((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  const search = async () => {
    setLoading(true);
    await props.fetchJobsCustom(jobSearch);
    setLoading(false);
  };

  return (
    <Box p={2} mt={-5} mb={2} className={classes.wrapper}>
      <Select
        onChange={handleChange}
        value={jobSearch.type}
        name="type"
        disableUnderline
        variant="filled"
        defaultValue={menuItem1[0]}
      >
        {menuItem1.map((item, i) => {
          return <MenuItem value={item}>{item}</MenuItem>;
        })}
      </Select>
      <Select
        onChange={handleChange}
        value={jobSearch.location}
        name="location"
        disableUnderline
        variant="filled"
        defaultValue={menuItem2[0]}
      >
        {menuItem2.map((item, i) => {
          return <MenuItem value={item}>{item}</MenuItem>;
        })}
      </Select>
      <Button
        disabled={loading}
        variant="contained"
        color="primary"
        disableElevation
        onClick={search}
      >
        {loading ? <CircularProgress color="secondary" size={22} /> : "Search"}
      </Button>
    </Box>
  );
};
