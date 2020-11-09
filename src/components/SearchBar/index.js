import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  makeStyles,
  NativeSelect,
} from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
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
    "& > Button": {
      flex: 1,
      height: "45px",
      margin: "8px",
      backgroundColor: "#e1bee7",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default (props) => {
  const [loading, setLoading] = useState(false);
  const [jobSearch, setJobSearch] = useState({
    location: "서울",
    reward: "돈",
    skills: "판넬작업",
    sex: "여성",
  });
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
  const menuItemRew = ["돈", "어시교환", "돈or어시교환"];
  const skills = [
    "판넬작업",
    "다이어그램",
    "도면작업",
    "심부름",
    "모형작업",
    "기타업무",
  ];
  const menuItemSex = ["여성", "남성", "무관"];

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
      <FormControl
        className={classes.formControl}
        style={{ borderBottom: "2px solid #8C76CC" }}
      >
        <InputLabel shrink htmlFor="location-native-label-placeholder">
          지역
        </InputLabel>
        <NativeSelect
          onChange={handleChange}
          value={jobSearch.location}
          name="location"
          disableUnderline
          variant="filled"
          className={classes.selectEmpty}
          defaultValue={menuItemLoc[0]}
        >
          {menuItemLoc.map((item, i) => {
            return <option value={item}>{item}</option>;
          })}
        </NativeSelect>
      </FormControl>
      <FormControl
        className={classes.formControl}
        style={{ borderBottom: "2px solid #8C76CC" }}
      >
        <InputLabel shrink htmlFor="reward-native-label-placeholder">
          대가 설정
        </InputLabel>
        <NativeSelect
          onChange={handleChange}
          value={jobSearch.reward}
          name="reward"
          disableUnderline
          variant="filled"
          className={classes.selectEmpty}
          defaultValue={menuItemRew[0]}
        >
          {menuItemRew.map((item, i) => {
            return <option value={item}>{item}</option>;
          })}
        </NativeSelect>
      </FormControl>
      <FormControl
        className={classes.formControl}
        style={{ borderBottom: "2px solid #8C76CC" }}
      >
        <InputLabel shrink htmlFor="reward-native-label-placeholder">
          할 일
        </InputLabel>
        <NativeSelect
          onChange={handleChange}
          value={jobSearch.skills}
          name="skills"
          disableUnderline
          variant="filled"
          className={classes.selectEmpty}
          defaultValue={skills[0]}
        >
          {skills.map((item, i) => {
            return <option value={item}>{item}</option>;
          })}
        </NativeSelect>
      </FormControl>
      <FormControl
        className={classes.formControl}
        style={{ borderBottom: "2px solid #8C76CC" }}
      >
        <InputLabel shrink htmlFor="reward-native-label-placeholder">
          성별
        </InputLabel>
        <NativeSelect
          onChange={handleChange}
          value={jobSearch.sex}
          name="sex"
          disableUnderline
          variant="filled"
          className={classes.underline}
          defaultValue={menuItemSex[0]}
        >
          {menuItemSex.map((item, i) => {
            return <option value={item}>{item}</option>;
          })}
        </NativeSelect>
      </FormControl>
      <Button
        disabled={loading}
        variant="contained"
        // color="primary-light"
        disableElevation
        onClick={search}
      >
        {loading ? <CircularProgress color="secondary" size={22} /> : "Search"}
      </Button>
    </Box>
  );
};
