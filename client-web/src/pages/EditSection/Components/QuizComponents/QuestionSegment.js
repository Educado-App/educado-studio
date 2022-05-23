// Base imports
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../../../store/actions/Course";
import AnswersSegment from "./AnswersSegment";
import PointsSegment from "./PointsSegment";

// Material UI base
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";


// Material UI components
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";
import AudioQA from "./AudioQA";




const useStyles = makeStyles((theme) => ({
    media: {
        width: "720px",
        background: "lightblue",
        textEmphasisColor: "lightblue",
    },
    check: {
      width: "720px",
      height: "60px",
      background: "lightblue",
    },
}));


const QuestionSegment = (props) => {
  // props.id = activeComponentId
  // Find component i sectionComponents med tilsvarende id
  // Upon changes, update redux state

  const activeComponent = props.course.sectionComponents.find((component) => {
    return component._id === props._id;
  });

  const classes = useStyles();

  const [ thisQuestion, setQuestionValues ] = useState({...props.thisQuestion});

  const handleDeleteQuestion = (event) => {
    props.deleteQuestion(props.thisQuestion._id, props.componentId, props.sectionId);
  };

  // type is used to checker whether update is text or points
  const handleUpdate = (type, newValue, event) => {
    // create new object from state
    let quizObj = {...thisQuestion};

    // update values based on whether function is called from points or questions
    if (type === "POINTS") {
      quizObj.points = newValue;
    } else {
      quizObj.question.textQuestion = event.target.value;
    }

    // update state with new array
    setQuestionValues(quizObj);
  }

  // whenever state changes, give state to parent
  useEffect(() => {
    props.handleUpdateQuizzes(thisQuestion, props.index, "QUESTION");
  }, [thisQuestion]);


  return (
        <Card>
            <PointsSegment 
              thisQuestion={thisQuestion}
              setPoints={handleUpdate}
            />
           <div>
               <FormControl
                  onChange={(event, newValue) => {
                    handleUpdate("QUESTION", newValue, event);
                  }}
                   fullWidth
                   variant="filled"
                   className={classes.media}>
                   <InputLabel htmlFor="filled-adornment-amount">Question</InputLabel>
                   <FilledInput
                        id="filled-adornment-amount"
                        multiline
                        value={thisQuestion.question.textQuestion}
                        endAdornment={
                          <InputAdornment position="end">
                            <InputLabel>
                                 <IconButton
                                  color="primary"
                                  component="span"
                                  onClick={handleDeleteQuestion}
                                 >
                                     <CancelIcon/>
                                 </IconButton>
                            </InputLabel>
                        </InputAdornment>}
                   />
               </FormControl>
           </div>
            <div>
        </div>
        </Card>
    );
};

function mapStateToProps(state) {
    return { course: state.course };
}

export default connect(mapStateToProps, courseActions)(QuestionSegment);