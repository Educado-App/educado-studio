// Base imports
import React, {useState, useEffect } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../../../store/actions/Course";

// Material UI components
import { List, ListItem } from "@material-ui/core";

// Project imports
import AnswersSegment from "./AnswersSegment";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  listStyles: {
    width: "720px",
  },
}));


const AnswerBucket = (props) => {
  const classes = useStyles();

  const [answers, setAnswers] = useState([...props.answersList]);

  // called when the text of an answer is changed
  const handleSetAnswers = (value, index) => {
    let answerArr = [...answers];
    answerArr[index] = value;
    setAnswers(answerArr);
  };

  // whenever state changes, give state to parent
  useEffect(() => {
    props.handleUpdateQuizzes(answers, props.answerIndex, "ANSWERS");
  }, [answers]);

  return (
      <List type="dense">
        {props.answersList.map((answer, index) => {
          let answerToRender = (
              <div className={classes.listStyles}>
                <AnswersSegment
                  answer={answer}
                  quiz_id={props.quiz_id}
                  setAnswers={handleSetAnswers}
                  index={index}
                />
              </div>
          );
          let keyValue;
            if (!answer._id) {
              keyValue = "temp";
            } else {
              keyValue = answer._id;
            }

          return (
              <ListItem
                  className={classes.listStyles}
                  button
                  disableRipple
                  key={keyValue}
              >
                {answerToRender}
              </ListItem>
          );
        })
        }
      </List>
  );
};


function mapStateToProps(state) {
  return { course: state.course };
}

export default connect(mapStateToProps, courseActions)(AnswerBucket);