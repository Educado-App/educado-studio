// Base imports
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../../../store/actions/Course";
<<<<<<< HEAD
<<<<<<< HEAD
import AnswersSegment from "./AnswersSegment";
import PointsSegment from "./PointsSegment";


=======
>>>>>>> d6e3c0e (bucket mm.)
=======
>>>>>>> ad1b31ba76df5d3d2975b91f94e54c0cd35ae6ba

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
    return component._id === props.id;
  });

  const classes = useStyles();
<<<<<<< HEAD

  const [ questionText, setQuestionText ] = useState(props.text);
  //const [ questionAudio, setQuestionAudio ] = useState(props.audio)

<<<<<<< HEAD
    const handleDeleteQuestion = (event) => {
      //missing routing
    }

    const classes = useStyles();
    
    return (
=======
  const questionTextChangeHandler = (event) => {
    setQuestionText(event.target.value);
  };
  /*
  const questionAudioChangeHandler = () => {
    setQuestionAudio();
  };
  */




  return (
>>>>>>> d6e3c0e (bucket mm.)
=======

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
>>>>>>> ad1b31ba76df5d3d2975b91f94e54c0cd35ae6ba
        <Card>
            <PointsSegment/>
           <div>
<<<<<<< HEAD
               <FormControl
                   fullWidth
                   variant="filled"
                   className={classes.media}>
                   <InputLabel htmlFor="filled-adornment-amount">Question</InputLabel>
                   <FilledInput
                        id="filled-adornment-amount"
                        multiline
                        endAdornment={<InputAdornment position="end">
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
=======
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
>>>>>>> ad1b31ba76df5d3d2975b91f94e54c0cd35ae6ba
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