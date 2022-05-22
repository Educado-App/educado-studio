// Base imports
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../../../store/actions/Course";
import AudioQA from "./AudioQA";
import clsx from 'clsx';

// Material UI base
import { makeStyles } from "@material-ui/core/styles";
import {Card, colors} from "@material-ui/core";

// Material UI components
import Checkbox from '@material-ui/core/Checkbox';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';

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

  const [ answerValues, setAnswerValues ] = React.useState(props.answer);

  // called when the value of answer text is changed
  const handleAnswerTextUpdate = (event) => {
    let answer = {...answerValues};
    answer.textAnswer = event.target.value;
    setAnswerValues(answer);
  };

  // called when checkbox is pressed
  const handleCheckbox = (event) => {
    let answer = {...answerValues};
    answer.correctAnswer = !answer.correctAnswer;
    setAnswerValues(answer);
  };
  
  // called whenever state changes
  useEffect(() => {
    props.setAnswers(answerValues, props.index);
  }, [answerValues]);


    const handleDeleteAnswer = async (event) => {
      // props.course.componentquizzes is used to 
      await props.deleteAnswer(props.quiz_id, props.answer._id, props.course.componentQuizzes);
    }

  return (
      <Card>
        <FormControl fullWidth className={classes.margin} variant="filled" >
          <InputLabel htmlFor="filled-adornment-amount">Answer</InputLabel>
          <FilledInput
              onChange={(event) => {
                handleAnswerTextUpdate(event);
              }}
              value={answerValues.textAnswer}
              id="filled-adornment-amount"
              multiline
              endAdornment={<InputAdornment position="end">
                  <Checkbox
                  checked={answerValues.correctAnswer}
                  color="primary"
                  edge="end"
                  onClick={handleCheckbox}
                  />
                  <InputLabel>
                      <IconButton
                          color="primary"
                          component="span"
                          onClick={handleDeleteAnswer}
                      >
                          <CancelIcon/>
                      </IconButton>
                  </InputLabel>


          </InputAdornment>}
          />
        </FormControl>
      </Card>
  );
};

function mapStateToProps(state) {
    return { course: state.course };
}

export default connect(mapStateToProps, courseActions)(AnswersSegment);


