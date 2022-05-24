// Base imports
import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import * as courseActions from "../../../../store/actions/Course";

// Material UI components
import { List, ListItem } from "@material-ui/core";

// Project imports
import QuestionSegment from "./QuestionSegment";
import AnswerBucket from "./AnswerBucket";


const QuestionWithAnswersBucket = (props) => {

  const [ quizzes, updateQuizzes ] = useState([...props.quizzes]);

  // update state in parent whenever state of this component is updated
  useEffect(() => {
    props.handleQuizUpdate(quizzes);
  }, [quizzes]);

  // is called whenever a child has an update in state
  const handleUpdateQuizzes = (value, index, type) => {
    // create new temporary array which is equal to the current state
    let quizArr = [...quizzes];
    
    // used to check if state update was from answer or question
    if (type === "QUESTION") {
      quizArr[index].question = value.question;
      quizArr[index].points = value.points;
    } else {
      quizArr[index].answers = value;
    }
    // update state with temporary array
    updateQuizzes(quizArr);    
  }

  return (
      <List type="dense">
        {props.course.componentQuizzes.map((qwas, index) => {
            let QwasToRender = (
              <div>
                <QuestionSegment 
                  thisQuestion={qwas} 
                  componentId={props.componentId}
                  sectionId={props.sectionId}
                  handleUpdateQuizzes={handleUpdateQuizzes}
                  index={index}
                />
                <AnswerBucket 
                  answersList={qwas.answers}
                  quiz_id={qwas._id}
                  answerIndex={index}
                  handleUpdateQuizzes={handleUpdateQuizzes}
                />
              </div>
          );
          let keyValue;
            if (!qwas._id) {
              keyValue = "temp";
            } else {
              keyValue = qwas._id;
            }

          return (
              <ListItem
                  button
                  disableRipple
                  key={keyValue}
              >
                {QwasToRender}
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

export default connect(mapStateToProps, courseActions)(QuestionWithAnswersBucket);