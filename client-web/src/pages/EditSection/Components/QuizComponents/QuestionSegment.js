// Base imports
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../../../store/actions/Course";

// Material UI base
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";

// Material UI components
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";


const useStyles = makeStyles((theme) => ({
    media: {
        width: "720px",
        background: "lightblue",
    },
}));


const QuestionSegment = (props) => {
  // props.id = activeComponentId
  // Find component i sectionComponents med tilsvarende id
  // Upon changes, update redux state

  const activeComponent = props.course.sectionComponents.find((component) => {
    return component._id === props.id;
  });

  const classes = useStyles();

  const [ questionText, setQuestionText ] = useState(props.text);
  //const [ questionAudio, setQuestionAudio ] = useState(props.audio)

  const questionTextChangeHandler = (event) => {
    setQuestionText(event.target.value);
  };
  /*
  const questionAudioChangeHandler = () => {
    setQuestionAudio();
  };
  */




  return (
        <Card>
           <div>
               <TextField
               className={classes.media}
               required
               id="filled-search"
               variant="filled"
               multiline
               rowsMax={4}
               rows={2}
               label={"Question"}
               onChange={questionTextChangeHandler}
           > </TextField>
           </div>
            <!--
            <div>
                <AnswersSegment onAnswerChange={answerChangeHandler}/>
            </div>
            -->
        </Card>
    );
};

function mapStateToProps(state) {
    return { course: state.course };
}

export default connect(mapStateToProps, courseActions)(QuestionSegment);