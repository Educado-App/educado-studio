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

  const [ answers, setAnswers ] = useState();
  const [ x, setX ] = useState();
  /*
  useEffect(() => {
    const data = {
      question: question,
      answers: answers
    };
    props.onQuizChange(data);
  }, [question, answers]);
  */

  return (
      <List type="dense">
        {props.course.componentQuizzes.map((qwas) => {
          if (props.course.componentQuizzes[0]._id != null) {
            let QwAsToRender = (
              <div>
                <QuestionSegment 
                  thisQuestion={qwas} 
                  componentId={props.componentId}
                  sectionId={props.sectionId}
                  trigger={props.trigger}
                />
                <AnswerBucket 
                  answersList={qwas.answers}
                  quiz_id={qwas._id}
                  trigger={props.trigger}
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
                {QwAsToRender}
              </ListItem>
          );
          }
        })
        }
      </List>

  );
};

function mapStateToProps(state) {
  return { course: state.course };
}

export default connect(mapStateToProps, courseActions)(QuestionWithAnswersBucket);