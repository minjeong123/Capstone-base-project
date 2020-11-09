import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FilledInput,
  Grid,
  IconButton,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  skillChip: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.75),
    fontSize: "14.5px",
    borderRadius: "5px",
    transition: ".3s",

    fontWeight: 600,
    border: `1px solid ${theme.palette.mainColor.main}`,
    color: theme.palette.mainColor.main,
    cursor: "pointer",

    "&:hover": {
      backgroundColor: theme.palette.mainColor.main,
      color: "#fff",
    },
  },
  included: {
    backgroundColor: theme.palette.mainColor.main,
    color: "#fff",
  },
  openJobButton: {
    backgroundColor: "#e1bee7",
  },
}));

export default (props) => {
  const [loading, setLoading] = useState(false);

  const menuItemLoc = [
    "서울",
    "부산",
    "충북",
    "충남",
    "대구",
    "대전",
    "강원",
    "광주",
    "경기",
    "경북",
    "경남",
    "인천",
    "제주",
    "전북",
    "전남",
    "세종",
    "울산",
  ];
  const menuItemSex = ["여성", "남성", "무관"];
  const menuItemRew = ["돈", "어시교환", "돈or어시교환"];
  const menuItemExp = ["있다", "없다", "무관"];
  const menuItemTyp = ["학교과제", "공모전", "개인과제"];
  const skills = [
    "판넬작업",
    "다이어그램",
    "도면작업",
    "심부름",
    "모형작업",
    "기타업무",
  ];

  const initState = {
    title: "",
    school: "",
    location: menuItemLoc[0],
    endDate: "",
    nOfPeople: 1,
    description: "",
    type: menuItemTyp[0],
    reward: menuItemRew[0],
    skills: [],
    sex: menuItemSex[0],
    experience: menuItemExp[0],
  };

  const classes = useStyles();
  const [jobDetails, setJobDetails] = useState(initState);

  const handleChange = (e) => {
    e.persist();
    setJobDetails((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  const addRemoveSkill = (skill) => {
    jobDetails.skills.includes(skill)
      ? setJobDetails((oldState) => ({
          ...oldState,
          skills: oldState.skills.filter((s) => s !== skill),
        }))
      : setJobDetails((oldState) => ({
          ...oldState,
          skills: oldState.skills.concat(skill),
        }));
  };
  // ** validation Check
  const handleSubmit = async () => {
    for (const field in jobDetails) {
      if (typeof jobDetails[field] === "string" && !jobDetails[field]) return;
    }
    if (!jobDetails.skills.length) return;
    setLoading(true);
    await props.postJob(jobDetails);
    closeModal();
  };

  const closeModal = () => {
    setJobDetails(initState);
    setLoading(false);
    props.closeModal();
  };

  return (
    <Dialog open={props.newJobModal} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Post Job
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Title*</Typography>
            <FilledInput
              onChange={handleChange}
              name="title"
              value={jobDetails.title}
              autoComplete="off"
              placeholder="Job title *"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>School*</Typography>
            <FilledInput
              onChange={handleChange}
              name="school"
              value={jobDetails.school}
              autoComplete="off"
              placeholder="Job school *"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>Location*</Typography>
            <Select
              onChange={handleChange}
              name="location"
              value={jobDetails.location}
              fullWidth
              disableUnderline
              variant="filled"
            >
              {menuItemLoc.map((item, i) => {
                return <MenuItem value={item}>{item}</MenuItem>;
              })}
            </Select>
          </Grid>

          <Grid item xs={6}>
            <Typography>endDate*</Typography>
            <FilledInput
              onChange={handleChange}
              name="endDate"
              value={jobDetails.endDate}
              autoComplete="off"
              placeholder="Job endDate *"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Typography># of people*</Typography>
            <TextField
              onChange={handleChange}
              type="number"
              InputProps={{
                inputProps: {
                  max: 100,
                  min: 1,
                },
              }}
              label="Number of People"
              name="nOfPeople"
              value={jobDetails.nOfPeople}
              autoComplete="off"
              placeholder="Job # of people *"
              disableUnderline
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Typography>Description*</Typography>
            <FilledInput
              onChange={handleChange}
              name="description"
              value={jobDetails.description}
              autoComplete="off"
              placeholder="Job description *"
              disableUnderline
              fullWidth
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={6}>
            <Typography>Type*</Typography>
            <Select
              onChange={handleChange}
              fullWidth
              name="type"
              value={jobDetails.type}
              disableUnderline
              variant="filled"
            >
              {menuItemTyp.map((item, i) => {
                return <MenuItem value={item}>{item}</MenuItem>;
              })}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <Typography>Reward*</Typography>
            <Select
              onChange={handleChange}
              name="reward"
              value={jobDetails.reward}
              fullWidth
              disableUnderline
              variant="filled"
            >
              {menuItemRew.map((item, i) => {
                return <MenuItem value={item}>{item}</MenuItem>;
              })}
            </Select>
          </Grid>

          <Box ml={1} mt={2} mb={2}>
            <Typography>Todos*</Typography>
            <Box display="flex">
              {skills.map((skill) => (
                <Box
                  onClick={() => addRemoveSkill(skill)}
                  className={`${classes.skillChip} ${
                    jobDetails.skills.includes(skill) && classes.included
                  }`}
                  key={skill}
                >
                  {skill}
                </Box>
              ))}
            </Box>
          </Box>

          <Grid item xs={6}>
            <Typography>Sex*</Typography>
            <Select
              onChange={handleChange}
              name="sex"
              value={jobDetails.sex}
              fullWidth
              disableUnderline
              variant="filled"
            >
              {menuItemSex.map((item, i) => {
                return <MenuItem value={item}>{item}</MenuItem>;
              })}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <Typography>Experience*</Typography>
            <Select
              onChange={handleChange}
              name="Experience"
              value={jobDetails.experience}
              fullWidth
              disableUnderline
              variant="filled"
            >
              {menuItemExp.map((item, i) => {
                return <MenuItem value={item}>{item}</MenuItem>;
              })}
            </Select>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box
          color="red"
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="caption">"Required fields</Typography>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disableElevation
            className={classes.openJobButton}
            // color="primary"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="secondary" size={22} />
            ) : (
              "Post job"
            )}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

{
  /* <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="companyName"
              value={jobDetails.companyName}
              autoComplete="off"
              placeholder="Company name *"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="companyUrl"
              value={jobDetails.companyUrl}
              autoComplete="off"
              placeholder="Company URL *"
              disableUnderline
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="link"
              value={jobDetails.link}
              autoComplete="off"
              placeholder="Job link *"
              disableUnderline
              fullWidth
            />
          </Grid> */
}
