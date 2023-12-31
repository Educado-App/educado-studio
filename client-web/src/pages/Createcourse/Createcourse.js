// Base imports
import React, { useState } from "react";

import { connect } from "react-redux";
import * as courseActions from "../../store/actions/Course";

// Material UI base
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Typography, Divider } from "@material-ui/core";

import { Redirect } from "react-router-dom";
// Material UI components

// Material UI icons
import palette from "../../consts/palette";

// Project imports

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  container: {
    width: "50%",
    minWidth: 740,
  },
  button: {
    backgroundColor: palette.primary,
    marginTop: "20px",
  },
}));

const Createcourse = (props) => {
  const classes = useStyles();

  const [created, setCreated] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleClick = async () => {
    await props.createCourse(title, description);
    setCreated(true);
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  if (created === true) {
    return <Redirect to="/edit/course" />;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h2" align="center">
        Create a new course
      </Typography>
      <Divider></Divider>
      <Typography variant="h5">Title</Typography>
      <TextField
        required
        id="outlined-required"
        label="Required"
        variant="outlined"
        onChange={handleTitle}
      />
      <Typography variant="h5">Description</Typography>
      <TextField
        required
        id="outlined-multiline-static"
        label="Required"
        variant="outlined"
        rowsMax={4}
        onChange={handleDescription}
      />
      <Button onClick={handleClick} className={classes.button}>
        Create Course
      </Button>
    </div>
  );
};

function mapStateToProps(state) {
  return { course: state.course };
}

export default connect(mapStateToProps, courseActions)(Createcourse);
