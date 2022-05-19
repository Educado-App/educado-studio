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
        {props.qwasList.map((qwas) => {
          let QwAsToRender = (
              <div>
                <QuestionSegment 
                  id={qwas._id} 
                  componentId={props.component}
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
        })
        }
      </List>

  );
};

function mapStateToProps(state) {
  return { course: state.course };
}

export default connect(mapStateToProps, courseActions)(QuestionWithAnswersBucket);