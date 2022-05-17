// Base imports
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../../../store/actions/Course";
import clsx from 'clsx';

// Material UI base
import { makeStyles } from "@material-ui/core/styles";
import {Card, colors} from "@material-ui/core";

// Material UI components
import TextField from "@material-ui/core/TextField";
import Checkbox from '@material-ui/core/Checkbox';

import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
    media: {
        backgroundColor: "#a892ee",
        display: "inline-flex",
    },
}));

const AnswersSegment = (props) => {

  const activeComponent = props.course.sectionComponents.find((component) => {
    return component._id === props.id;
  });

  const classes = useStyles();

  const [checked, setChecked] = useState(props.check);
  const [answerText, setAnswerText] = useState(props.text);
  //const [answerAudio, setAnswerAudio] = useState(props.audio)

  const answerTextHandler = (event) => {
    if (event.target.value !== null) {
      setAnswerText(event.target.value);
    }
  };

  /*
  const answerAudioHandler = (event) => {
    setAnswerAudio();
  };
  */

  const checkboxHandler = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    const answerData = {
      textAnswer: answerText,
      //audioAnswer: answerAudio,
      checkbox: checked
    };
    props.onAnswerChange(answerData);
  },[checked, answerText]);


  return (
      <Card>
        <FormControl fullWidth className={classes.margin} variant="filled" >
          <InputLabel htmlFor="filled-adornment-amount">Answer</InputLabel>
          <FilledInput
              value={answerText}
              id="filled-adornment-amount"
              endAdornment={<InputAdornment position="end">
                <Checkbox
                  checked={checked}
                  color="primary"
                  edge="end"
                  onClick={checkboxHandler}
                /></InputAdornment>
              }
              onChange={answerTextHandler}
          />
        </FormControl>
      </Card>
  );
};

function mapStateToProps(state) {
    return { course: state.course };
}

export default connect(mapStateToProps, courseActions)(AnswersSegment);


